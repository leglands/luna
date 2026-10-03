#!/bin/bash
# Déploiement Luna web → VPS macaron (/opt/life/static/luna).
# Archive déjà reçue en /tmp/luna-web.tgz. Ordre : staging → swap (jamais de
# suppression sèche) → preuves. Pas de reload nginx : le vhost statique existe
# déjà et ne change pas (les pages /<lang>/ sont de simples dossiers).
set -u
TS=$(date +%Y%m%d-%H%M%S)
SITE=/opt/life/static/luna
STAGE=/tmp/luna-stage-$TS

echo "── 0. Archive reçue"
ls -la /tmp/luna-web.tgz; tar tzf /tmp/luna-web.tgz | wc -l

echo "── 1. Staging + swap"
rm -rf "$STAGE"; mkdir -p "$STAGE"
tar xzf /tmp/luna-web.tgz -C "$STAGE"
[ -f "$STAGE/index.html" ] || { echo "ABANDON : pas d'index.html"; exit 1; }
echo "  fichiers : $(find "$STAGE" -type f | wc -l)"
if [ -d "$SITE" ]; then sudo mv "$SITE" "${SITE}.avant-$TS" && echo "  ancien site → ${SITE}.avant-$TS"; fi
sudo mv "$STAGE" "$SITE"
sudo chown -R --reference="${SITE}.avant-$TS" "$SITE" 2>/dev/null || sudo chown -R debian:debian "$SITE"
echo "  installé : $(find "$SITE" -type f | wc -l) fichiers"

echo "── 2. Preuves (serveur puis externe)"
for u in "https://luna.macaron-software.com/" \
         "https://luna.macaron-software.com/en/privacy/" \
         "https://luna.macaron-software.com/fr/privacy/" \
         "https://luna.macaron-software.com/es/support/" \
         "https://luna.macaron-software.com/ar/terms/" \
         "https://luna.macaron-software.com/llms.txt" \
         "https://luna.macaron-software.com/sitemap.xml"; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" -m 15 "$u" || echo ERR)
  echo "  $code  $u"
done
echo "── titres servis :"
curl -sk -m 15 "https://luna.macaron-software.com/fr/privacy/" | grep -oE "<title>[^<]*" | head -1
curl -sk -m 15 "https://luna.macaron-software.com/ja/privacy/" | grep -oE "<title>[^<]*" | head -1
echo "── FIN"
