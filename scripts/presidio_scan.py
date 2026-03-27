#!/usr/bin/env python3
"""Local git hook guard powered by Microsoft Presidio pattern recognizers."""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Sequence


DEFAULT_ALLOWLIST_PATTERNS = (
    r"(?i)security@macaron-software\.com",
    r"(?i)privacy@macaron-software\.com",
    r"(?i)[\w.+-]+@users\.noreply\.github\.com",
)

MAX_SNIPPET_LENGTH = 96
HUNK_RE = re.compile(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@")


@dataclass(frozen=True)
class TextChunk:
    source: str
    line_number: int
    text: str


@dataclass(frozen=True)
class Finding:
    source: str
    line_number: int
    entity_type: str
    score: float
    snippet: str


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Scan staged additions or a commit message for potential sensitive data "
            "using Microsoft Presidio pattern recognizers."
        )
    )
    parser.add_argument(
        "--mode",
        required=True,
        choices=("staged-diff", "commit-msg"),
        help="Input type to scan.",
    )
    parser.add_argument(
        "--message-file",
        help="Commit message file to scan when --mode commit-msg is used.",
    )
    parser.add_argument(
        "--diff-file",
        help="Optional patch file for testing staged-diff mode without git.",
    )
    return parser


def repo_root() -> Path:
    return Path(
        subprocess.check_output(
            ["git", "rev-parse", "--show-toplevel"], text=True
        ).strip()
    )


def git_dir() -> Path:
    return Path(
        subprocess.check_output(["git", "rev-parse", "--git-dir"], text=True).strip()
    )


def load_presidio():
    try:
        from presidio_analyzer import Pattern, PatternRecognizer
    except ImportError as exc:
        raise SystemExit(
            "[luna-presidio] Missing dependency: presidio_analyzer.\n"
            "[luna-presidio] Run ./scripts/install_presidio_hooks.sh to bootstrap the local hook."
        ) from exc
    return Pattern, PatternRecognizer


def load_allowlist_patterns(repo: Path, git_directory: Path) -> List[re.Pattern[str]]:
    compiled = [re.compile(pattern) for pattern in DEFAULT_ALLOWLIST_PATTERNS]
    extra_paths = []
    env_path = os.environ.get("PRESIDIO_HOOK_ALLOWLIST_FILE")
    if env_path:
        extra_paths.append(Path(env_path))
    extra_paths.append(git_directory / "info" / "presidio-allowlist.regex")
    extra_paths.append(repo / ".presidio-allowlist.regex")

    for path in extra_paths:
        if not path.is_file():
            continue
        for raw_line in path.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#"):
                continue
            compiled.append(re.compile(line))

    return compiled


def build_recognizers():
    Pattern, PatternRecognizer = load_presidio()
    return (
        PatternRecognizer(
            supported_entity="EMAIL_ADDRESS",
            patterns=[
                Pattern(
                    "email",
                    r"(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b",
                    0.65,
                )
            ],
        ),
        PatternRecognizer(
            supported_entity="PHONE_NUMBER",
            patterns=[
                Pattern(
                    "phone",
                    r"(?<!\w)(?:\+?\d[\d(). -]{8,}\d)",
                    0.55,
                )
            ],
        ),
        PatternRecognizer(
            supported_entity="PRIVATE_KEY_HEADER",
            deny_list=[
                "-----BEGIN PRIVATE KEY-----",
                "-----BEGIN RSA PRIVATE KEY-----",
                "-----BEGIN OPENSSH PRIVATE KEY-----",
                "-----BEGIN EC PRIVATE KEY-----",
                "-----BEGIN DSA PRIVATE KEY-----",
            ],
        ),
        PatternRecognizer(
            supported_entity="AWS_ACCESS_KEY",
            patterns=[Pattern("aws-access-key", r"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b", 0.95)],
        ),
        PatternRecognizer(
            supported_entity="GITHUB_TOKEN",
            patterns=[
                Pattern("gh-token", r"\bgh[pousr]_[A-Za-z0-9_]{30,}\b", 0.95),
                Pattern(
                    "github-pat",
                    r"\bgithub_pat_[A-Za-z0-9_]{20,}\b",
                    0.95,
                ),
            ],
        ),
        PatternRecognizer(
            supported_entity="JWT_TOKEN",
            patterns=[
                Pattern(
                    "jwt",
                    r"\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b",
                    0.85,
                )
            ],
        ),
        PatternRecognizer(
            supported_entity="GENERIC_SECRET_ASSIGNMENT",
            patterns=[
                Pattern(
                    "quoted-secret-assignment",
                    r"(?i)\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|secret|client[_-]?secret|password|passwd|pwd)\b"
                    r"[^\n=:]{0,24}[:=][^\S\r\n]*['\"][^'\"]{8,}['\"]",
                    0.8,
                ),
                Pattern(
                    "uri-with-credentials",
                    r"\b[a-z][a-z0-9+.-]*://[^/\s:@]{1,64}:[^@\s]{4,}@",
                    0.8,
                ),
            ],
        ),
        PatternRecognizer(
            supported_entity="OPENAI_KEY",
            patterns=[
                Pattern("openai-key", r"\bsk-[A-Za-z0-9]{20,}\b", 0.9),
                Pattern("openai-project-key", r"\bsk-proj-[A-Za-z0-9_-]{20,}\b", 0.9),
            ],
        ),
    )


def is_allowed(
    snippet: str, full_text: str, allowlist: Sequence[re.Pattern[str]]
) -> bool:
    return any(
        pattern.search(snippet) or pattern.search(full_text) for pattern in allowlist
    )


def normalize_snippet(snippet: str) -> str:
    compact = " ".join(snippet.strip().split())
    if len(compact) <= MAX_SNIPPET_LENGTH:
        return compact
    return compact[: MAX_SNIPPET_LENGTH - 1] + "…"


def scan_chunks(
    chunks: Iterable[TextChunk],
    recognizers,
    allowlist: Sequence[re.Pattern[str]],
) -> List[Finding]:
    findings: list[Finding] = []
    for chunk in chunks:
        if not chunk.text.strip():
            continue
        for recognizer in recognizers:
            results = recognizer.analyze(chunk.text, entities=[recognizer.supported_entities[0]])
            for result in results:
                snippet = chunk.text[result.start : result.end]
                if is_allowed(snippet, chunk.text, allowlist):
                    continue
                findings.append(
                    Finding(
                        source=chunk.source,
                        line_number=chunk.line_number,
                        entity_type=result.entity_type,
                        score=float(result.score),
                        snippet=normalize_snippet(snippet),
                    )
                )
    return findings


def read_staged_diff(diff_file: str | None) -> str:
    if diff_file:
        return Path(diff_file).read_text(encoding="utf-8")
    return subprocess.check_output(
        [
            "git",
            "diff",
            "--cached",
            "--no-color",
            "--no-ext-diff",
            "--unified=0",
            "--diff-filter=ACMR",
        ],
        text=True,
    )


def iter_added_lines(diff_text: str) -> Iterable[TextChunk]:
    current_file = "<staged>"
    current_line = 0

    for raw_line in diff_text.splitlines():
        if raw_line.startswith("+++ b/"):
            current_file = raw_line[6:]
            continue
        if raw_line.startswith("@@"):
            match = HUNK_RE.match(raw_line)
            if match:
                current_line = int(match.group(1))
            continue
        if raw_line.startswith("+") and not raw_line.startswith("+++"):
            yield TextChunk(current_file, current_line, raw_line[1:])
            current_line += 1
            continue
        if raw_line.startswith(" "):
            current_line += 1


def iter_commit_message_lines(message_file: str) -> Iterable[TextChunk]:
    path = Path(message_file)
    for line_number, raw_line in enumerate(
        path.read_text(encoding="utf-8").splitlines(), start=1
    ):
        stripped = raw_line.strip()
        if not stripped or raw_line.startswith("#"):
            continue
        yield TextChunk(path.name, line_number, raw_line)


def report(findings: Sequence[Finding], mode: str) -> int:
    if not findings:
        return 0

    heading = (
        "staged changes" if mode == "staged-diff" else "the commit message"
    )
    print(
        f"[luna-presidio] Potential sensitive data detected in {heading}:",
        file=sys.stderr,
    )
    for finding in findings:
        print(
            f"  - {finding.source}:{finding.line_number} "
            f"{finding.entity_type} score={finding.score:.2f} "
            f"→ {finding.snippet}",
            file=sys.stderr,
        )
    print(
        "[luna-presidio] Review or remove the data, or allow a safe pattern via "
        ".git/info/presidio-allowlist.regex.",
        file=sys.stderr,
    )
    print(
        "[luna-presidio] To bypass once, use: git commit --no-verify",
        file=sys.stderr,
    )
    return 1


def main() -> int:
    parser = build_arg_parser()
    args = parser.parse_args()
    repo = repo_root()
    git_directory = git_dir()
    allowlist = load_allowlist_patterns(repo, git_directory)
    recognizers = build_recognizers()

    if args.mode == "staged-diff":
        diff_text = read_staged_diff(args.diff_file)
        return report(
            scan_chunks(iter_added_lines(diff_text), recognizers, allowlist),
            args.mode,
        )

    if not args.message_file:
        parser.error("--message-file is required when --mode commit-msg is used")

    return report(
        scan_chunks(
            iter_commit_message_lines(args.message_file), recognizers, allowlist
        ),
        args.mode,
    )


if __name__ == "__main__":
    raise SystemExit(main())
