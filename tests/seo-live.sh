#!/usr/bin/env bash
set -euo pipefail

origin="https://luna.macaron-software.com"
status() { curl -sS -L -o /dev/null -w "%{http_code}" "${origin}${1}"; }

sitemap="$(curl -fsS "${origin}/sitemap.xml")"
test "$(grep -o '<loc>' <<< "${sitemap}" | wc -l | tr -d ' ')" = 1
grep -Fq "<loc>${origin}/</loc>" <<< "${sitemap}"
! grep -Fq 'guide.aida.macaron-software.com' <<< "${sitemap}"

for path in / /cycle /cycle/ /export /export/ /fertility /fertility/ /history /history/ /insights /insights/ /log /log/ /onboarding /onboarding/ /settings /settings/; do
  test "$(status "${path}")" = 200
done
for path in /privacy /privacy/ /terms /terms/ /llms.txt /.well-known/security.txt /.well-known/apple-app-site-association /.well-known/assetlinks.json /qa-page-inexistante-404 /qa-page-inexistante-404/; do
  test "$(status "${path}")" = 404
done
