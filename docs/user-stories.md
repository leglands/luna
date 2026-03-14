# LUNA — User Stories & Acceptance Criteria

## Légende statut

- ✅ Implémenté + testé
- ⚠️ Implémenté, tests partiels
- ❌ Non implémenté (backlog)

---

## F01 — Onboarding (création vault + PIN)

### US-01 : Créer son vault avec un PIN
**En tant que** nouvelle utilisatrice (P1),
**je veux** créer mon espace sécurisé avec un code PIN,
**afin de** protéger mes données dès la première utilisation.

**Critères d'acceptation** :
- [ ] PIN entre 4 et 8 chiffres numériques uniquement
- [ ] Confirmation du PIN (doit correspondre)
- [ ] Vault SQLCipher créé avec clé Argon2id dérivée du PIN
- [ ] Fichier salt `.salt` créé à côté de la DB
- [ ] Profil utilisateur par défaut (mode Regular) créé
- [ ] Redirection vers le dashboard Home après succès

**Tests** : ✅ Rust J1 (4 tests) + iOS XCUITest + Android Espresso

### US-02 : Renseigner sa dernière date de règles
**En tant que** nouvelle utilisatrice (P1),
**je veux** indiquer la date de mes dernières règles lors de l'onboarding,
**afin que** l'app puisse calculer mon cycle dès le début.

**Critères d'acceptation** :
- [ ] DatePicker avec date par défaut = aujourd'hui
- [ ] Date sauvegardée comme `start_date` du premier cycle
- [ ] Date future refusée
- [ ] Étape optionnelle (skip possible)

**Tests** : ⚠️ Pas de test vérifiant la création du cycle initial

---

## F02 — Verrouillage PIN

### US-03 : Déverrouiller l'app avec mon PIN
**En tant qu'** utilisatrice (P5),
**je veux** déverrouiller l'app avec mon code PIN,
**afin que** personne d'autre ne puisse voir mes données.

**Critères d'acceptation** :
- [ ] Clavier numérique 0-9 + touche supprimer
- [ ] Feedback visuel (dots se remplissent)
- [ ] Maximum 5 tentatives avant blocage
- [ ] Message d'erreur clair si PIN incorrect
- [ ] Déverrouillage biométrique en option (si disponible)
- [ ] Après déverrouillage, arrivée sur Home

**Tests** : ✅ Rust J6 (2 tests) + Android Espresso lock tests

---

## F03 — Dashboard cycle (Home)

### US-04 : Voir mon dashboard cycle
**En tant qu'** utilisatrice (P1),
**je veux** voir un résumé de mon cycle actuel sur la page d'accueil,
**afin de** savoir où j'en suis en un coup d'œil.

**Critères d'acceptation** :
- [ ] Donut/jauge montrant le jour du cycle
- [ ] Phase actuelle affichée (menstruelle, folliculaire, ovulatoire, lutéale)
- [ ] Nombre de jours avant les prochaines règles
- [ ] Strip 7 jours en bas
- [ ] Bouton "Log today" visible et accessible
- [ ] Banner adapté si mode TTC/Enceinte/Péri-ménopause

**Tests** : ⚠️ Rust J3 (cycles) mais pas de test UI Home complet

---

## F04 — Log quotidien

### US-05 : Logger mon humeur, énergie, flux et symptômes
**En tant qu'** utilisatrice (P1),
**je veux** saisir mes données du jour (humeur, énergie, flux, symptômes),
**afin de** suivre mon cycle et détecter des tendances.

**Critères d'acceptation** :
- [ ] Mood : échelle 1-5 (cercles numériques, pas d'emoji)
- [ ] Energy : échelle 1-5
- [ ] Flow : none / spotting / light / medium / heavy
- [ ] Symptômes : grille de 43 symptômes catégorisés
- [ ] Champs avancés : BBT (°C), test LH, mucus cervical, activité sexuelle
- [ ] Qualité sommeil : 1-5
- [ ] Poids (kg) : optionnel
- [ ] Notes : champ libre
- [ ] Bouton Save + Cancel
- [ ] Touch targets ≥ 48dp

**Tests** : ✅ Rust J2 (3 tests) + iOS XCUITest + Maestro E2E

### US-06 : Modifier un log existant (upsert)
**En tant qu'** utilisatrice (P1),
**je veux** modifier un log existant,
**afin de** corriger ou compléter mes données.

**Critères d'acceptation** :
- [ ] Données précédentes pré-remplies à l'ouverture
- [ ] Sauvegarde écrase l'ancien log (upsert par date)
- [ ] Pas de doublon de log pour la même date

**Tests** : ✅ Rust J2 `j2_upsert_updates_existing_log`

---

## F05 — Calendrier mensuel

### US-07 : Naviguer dans le calendrier
**En tant qu'** utilisatrice (P1),
**je veux** voir un calendrier mensuel avec mes phases colorées,
**afin de** visualiser mon historique de cycle.

**Critères d'acceptation** :
- [ ] Grille 7 colonnes (L-D)
- [ ] Couleurs distinctes par phase (menstruelle, fertile, ovulation)
- [ ] Navigation mois précédent / suivant
- [ ] Tap sur un jour → ouvre le log sheet pour ce jour
- [ ] Légende des couleurs visible

**Tests** : ⚠️ Maestro E2E navigation, mais pas de test coloration phases

---

## F06 — Prédictions cycle/ovulation

### US-08 : Voir mes prédictions
**En tant qu'** utilisatrice (P1),
**je veux** voir la prédiction de mes prochaines règles et ma fenêtre fertile,
**afin d'** anticiper mon cycle.

**Critères d'acceptation** :
- [ ] Date prochaines règles affichée
- [ ] Fenêtre fertile (début-fin) affichée
- [ ] Jour d'ovulation estimé
- [ ] Score de confiance (augmente avec plus de cycles)
- [ ] Algorithme : moyenne pondérée exponentielle
- [ ] Minimum 1 cycle pour première prédiction
- [ ] Masquées si Calm Mode activé

**Tests** : ✅ Rust J4 (3 tests) + unit prediction (12 tests)

---

## F07 — Insights / Statistiques

### US-09 : Consulter mes statistiques
**En tant qu'** utilisatrice (P1),
**je veux** voir des statistiques sur mes cycles,
**afin de** mieux comprendre mon corps.

**Critères d'acceptation** :
- [ ] Durée moyenne de cycle
- [ ] Durée moyenne des règles
- [ ] Min/max longueur cycle
- [ ] Écart-type (régularité)
- [ ] Classification : régulier / irrégulier / très irrégulier
- [ ] Fréquence des symptômes
- [ ] Graphiques tendance (BBT, poids)

**Tests** : ✅ Rust J5 (2 tests) + iOS XCUITest insights

---

## F08 — Paramètres

### US-10 : Configurer mes préférences
**En tant qu'** utilisatrice (P1),
**je veux** configurer notifications, mode de tracking et export,
**afin de** personnaliser l'app selon mes besoins.

**Critères d'acceptation** :
- [ ] Toggles : notification quotidienne, rappel règles, fenêtre fertile, rappel pilule
- [ ] Sélection mode tracking (Regular, TTC, Enceinte, Postpartum, Péri-ménopause)
- [ ] Bouton export CSV
- [ ] Bouton export backup chiffré
- [ ] Bouton panic wipe avec confirmation

**Tests** : ✅ Rust J10 (3 tests) + Android Espresso settings

---

## F09 — Panic Wipe

### US-11 : Effacer toutes mes données immédiatement
**En tant qu'** utilisatrice en danger (P5),
**je veux** effacer toutes mes données en une action,
**afin de** me protéger dans une situation d'urgence.

**Critères d'acceptation** :
- [ ] Dialog de confirmation requise ("Delete all data?")
- [ ] Suppression fichiers vault (.db + .salt + .db-wal + .db-shm)
- [ ] Zeroize des clés en mémoire
- [ ] Retour à l'écran d'onboarding
- [ ] Opération irréversible (pas de restauration possible)
- [ ] Durée < 1 seconde

**Tests** : ✅ Rust J7 (2 tests) + iOS XCUITest + Maestro E2E

---

## F10 — Export backup chiffré

### US-12 : Exporter un backup chiffré
**En tant qu'** utilisatrice (P5),
**je veux** exporter un backup chiffré AES-256 de mes données,
**afin de** pouvoir les sauvegarder en toute sécurité.

**Critères d'acceptation** :
- [ ] PIN requis pour l'export
- [ ] Blob chiffré AES-256-GCM
- [ ] Contenu non-plaintext (pas lisible sans PIN)
- [ ] Mauvais PIN → erreur

**Tests** : ✅ Rust J8 (3 tests)

---

## F11 — Changement PIN

### US-13 : Changer mon PIN
**En tant qu'** utilisatrice (P5),
**je veux** changer mon code PIN,
**afin de** maintenir la sécurité de mes données.

**Critères d'acceptation** :
- [ ] Ancien PIN requis pour validation
- [ ] Nouveau PIN 4-8 chiffres
- [ ] DB re-chiffrée via PRAGMA rekey
- [ ] Salt régénéré
- [ ] Ancien PIN ne fonctionne plus après changement
- [ ] Nouveau PIN fonctionne immédiatement

**Tests** : ✅ Rust J13 (3 tests) — corrigé : change_pin implémente désormais PRAGMA rekey

---

## F12 — Mode TTC

### US-14 : Voir ma fenêtre fertile en mode TTC
**En tant qu'** utilisatrice TTC (P2),
**je veux** que la fenêtre fertile soit mise en avant dans l'interface,
**afin de** maximiser mes chances de conception.

**Critères d'acceptation** :
- [ ] Mode TTC sélectionnable dans Settings → Tracking Mode
- [ ] Banner TTC sur le Home
- [ ] Fenêtre fertile mise en avant (couleur, icône)
- [ ] Jour d'ovulation affiché

**Tests** : ⚠️ iOS XCUITest TTC + Rust J10 profile

---

## F13 — Mode Grossesse

### US-15 : Logger mes données de grossesse
**En tant qu'** utilisatrice enceinte (P3),
**je veux** logger hCG, coups de pied, nausées et poids,
**afin de** suivre ma grossesse au quotidien.

**Critères d'acceptation** :
- [ ] Formulaire dédié grossesse (hCG picker, kicks stepper, nausée 1-5, poids kg)
- [ ] DPA (date prévue accouchement) configurable
- [ ] Symptômes grossesse loggables
- [ ] Notes libres

**Tests** : ✅ Rust J11 (2 tests) + iOS PregnancyLogSheet

---

## F14 — Mode Péri-ménopause

### US-16 : Logger mes symptômes péri-ménopause
**En tant qu'** utilisatrice péri-ménopause (P4),
**je veux** logger bouffées de chaleur, sueurs nocturnes et sécheresse vaginale,
**afin de** suivre ma transition vers la ménopause.

**Critères d'acceptation** :
- [ ] Quick-log buttons pour symptômes spécifiques
- [ ] Graphique variabilité du cycle
- [ ] Info scientifique péri-ménopause
- [ ] Symptômes péri-ménopause coexistent avec symptômes menstruels

**Tests** : ✅ Rust J14 (3 tests)

---

## F15 — Export CSV

### US-17 : Exporter mes logs en CSV
**En tant qu'** utilisatrice (P1),
**je veux** exporter mes données en fichier CSV,
**afin de** les analyser ou les partager avec mon médecin.

**Critères d'acceptation** :
- [ ] Format RFC 4180
- [ ] Sélection de plage de dates
- [ ] Échappement virgules et guillemets
- [ ] En-tête avec noms de colonnes
- [ ] Fichier partageable via share sheet

**Tests** : ✅ Rust J12 (3 tests) + unit export (3 tests) + iOS XCUITest CSV

---

## F16 — Calm Mode

### US-18 : Activer le Calm Mode
**En tant qu'** utilisatrice anxieuse (P6),
**je veux** masquer les prédictions et réduire l'information affichée,
**afin de** réduire mon anxiété liée au cycle.

**Critères d'acceptation** :
- [ ] Toggle Calm Mode dans Settings
- [ ] Prédictions masquées sur Home et Calendar
- [ ] Banner "Calm Mode" visible
- [ ] Données toujours collectées (masquage UI uniquement)
- [ ] Désactivable à tout moment

**Tests** : ✅ Rust J15 (3 tests)

---

## F17 — i18n 40 langues + RTL

### US-19 : Utiliser l'app dans ma langue
**En tant qu'** utilisatrice non-anglophone (P1),
**je veux** utiliser l'app dans ma langue maternelle,
**afin de** comprendre toutes les fonctionnalités.

**Critères d'acceptation** :
- [ ] 40 langues supportées
- [ ] RTL complet (arabe, hébreu, persan, ourdou)
- [ ] Traduction de tous les textes UI
- [ ] Traduction des fiches store (Play Store + App Store)
- [ ] Pas de texte en dur dans le code

**Tests** : ⚠️ CI vérifie 39 README traductions, pas les clés UI

---

## F19 — Accessibilité WCAG 2.2 AA

### US-20 : Utiliser l'app avec un lecteur d'écran
**En tant qu'** utilisatrice malvoyante (P6),
**je veux** naviguer dans l'app avec VoiceOver ou TalkBack,
**afin d'** accéder à toutes les fonctionnalités.

**Critères d'acceptation** :
- [ ] Labels a11y sur tous les éléments interactifs
- [ ] Touch targets ≥ 48dp (Android) / 44pt (iOS)
- [ ] Reduce Motion respecté (pas d'animations spring)
- [ ] Contraste AA (ratio ≥ 4.5:1 texte, ≥ 3:1 grands textes)
- [ ] Zéro emoji dans l'interface (lecteurs d'écran lisent mal)
- [ ] Focus order logique

**Tests** : ⚠️ Pas de tests a11y automatisés

---

## Features backlog (non implémentées)

### F20 — Notifications locales ❌
- Rappel période imminente
- Rappel fenêtre fertile
- Rappel pilule à heure fixe
- Rappel log quotidien

### F21 — Authentification biométrique ❌
- FaceID / TouchID (iOS)
- Empreinte / Face (Android BiometricPrompt)
- Fallback PIN obligatoire

### F22 — HealthKit / HealthConnect bridge ❌
- Opt-in uniquement
- Sync menstruation data
- iOS HealthKit + Android HealthConnect

### F23 — Graphiques tendance ❌
- Courbe BBT
- Courbe poids
- Évolution durée de cycle

### F24 — Rappel pilule ❌
- Notification à heure configurable
- Type contraception (Pill, Patch, Ring, etc.)

### F25 — Apple Watch / Wear OS ❌
- Companion app
- Quick log depuis le poignet
