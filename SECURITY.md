# Security Policy

## Supported Versions

Only the latest state of `main` and the latest tagged mobile release are supported for security fixes.

## Reporting a Vulnerability

Please do **not** open a public GitHub issue for suspected security vulnerabilities.

Report privately by email:
- `security@macaron-software.com`

Include:
- affected platform: `ios`, `android`, `rust-core`, `build/ci`, or `privacy site`
- clear reproduction steps
- impact assessment
- logs, screenshots, or PoC if relevant
- whether the issue involves health data exposure, auth/PIN bypass, backup/restore, or cryptography

## Response Targets

- acknowledgement: within 3 business days
- triage / severity assignment: within 5 business days
- remediation plan: as soon as validated

## Scope

In scope:
- PIN / vault bypass
- SQLCipher / crypto misuse
- plaintext storage of sensitive data
- backup / restore confidentiality or integrity flaws
- insecure CI/CD or release pipeline behavior
- iCloud / local backup privacy regressions

Out of scope:
- generic best-practice suggestions without a concrete exploit path
- issues requiring physical access to an already unlocked device unless they bypass documented protections
- platform OS vulnerabilities outside the app itself

## Disclosure

Please allow time for validation and remediation before public disclosure.

Once fixed, we may publish:
- affected versions
- severity
- mitigation / upgrade guidance
- CVE reference if assigned

## Safe Harbor

We support good-faith security research intended to protect users, provided you:
- avoid privacy violations
- do not exfiltrate real user data
- do not disrupt availability
- do not perform destructive testing on production accounts or devices you do not own
