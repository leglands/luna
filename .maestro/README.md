# LUNA — Maestro E2E Test Flows

Flows de tests end-to-end pour Android (package `com.macaron.luna`).

## Prérequis

```bash
# Installer Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Lancer les tests (device/émulateur connecté)
~/.maestro/bin/maestro test .maestro/

# Lancer un flow spécifique
~/.maestro/bin/maestro test .maestro/01-onboarding.yaml
```

## Flows

| # | Flow | Parcours couvert |
|---|------|-----------------|
| 01 | Onboarding | Welcome → PIN → Dernières règles → Profil → Home |
| 02 | Lock/Unlock | PIN pad → déverrouillage → Home |
| 03 | Log quotidien | Ouvrir log → mood/energy/flow → sauvegarder |
| 04 | Calendrier | Navigation mois → sélection jour → voir log |
| 05 | Insights | Voir statistiques cycle → fréquence symptômes |
| 06 | Settings | Changer mode tracking → export CSV → Calm Mode |
| 07 | Panic Wipe | Settings → Panic Wipe → confirmation → retour onboarding |
