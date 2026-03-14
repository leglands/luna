# LUNA — Personas

## P1 : Utilisatrice régulière

**Profil** : Femme 18-45 ans, cycle menstruel régulier ou semi-régulier.

**Objectifs** :
- Suivre ses règles et anticiper les prochaines
- Logger humeur, énergie, flux et symptômes au quotidien
- Comprendre les tendances de son cycle

**Frustrations** :
- Apps concurrentes partagent ses données intimes avec des tiers
- Trop d'emojis / interface infantilisante
- Prédictions imprécises sans données suffisantes

**Scénarios clés** :
1. Premier lancement → onboarding → saisir dernières règles → voir dashboard
2. Chaque jour → ouvrir app → logger mood/flow/symptômes → fermer
3. Chaque mois → consulter calendrier → voir prédiction prochaines règles
4. Ponctuellement → consulter insights → voir durée moyenne cycle

---

## P2 : Utilisatrice TTC (Trying to Conceive)

**Profil** : Femme 25-40 ans essayant de concevoir un enfant.

**Objectifs** :
- Identifier sa fenêtre fertile avec précision
- Suivre BBT, test LH, mucus cervical
- Maximiser les chances de conception

**Frustrations** :
- Fenêtre fertile pas assez visible dans les apps standard
- Pas de suivi LH/BBT intégré
- Données partagées avec des assureurs/employeurs

**Scénarios clés** :
1. Activer mode TTC → voir fenêtre fertile mise en avant
2. Chaque matin → logger BBT → voir courbe température
3. Jour d'ovulation → logger test LH positif → alerte fertile
4. Consulter calendrier → jours fertiles colorés en vert

---

## P3 : Utilisatrice enceinte

**Profil** : Femme enceinte, transitionne du suivi cycle au suivi grossesse.

**Objectifs** :
- Suivre symptômes de grossesse (nausées, coups de pied, poids)
- Logger résultat test hCG
- Voir progression par rapport à la DPA (date prévue accouchement)

**Frustrations** :
- Apps séparées cycle/grossesse → perte d'historique
- Pas de transition fluide entre modes

**Scénarios clés** :
1. Test positif → changer mode → Enceinte → saisir DPA
2. Quotidien → logger nausées, coups de pied, poids
3. Consulter progression semaine de grossesse

---

## P4 : Utilisatrice péri-ménopause

**Profil** : Femme 40-55 ans, cycles devenant irréguliers.

**Objectifs** :
- Tracker la variabilité croissante de ses cycles
- Logger bouffées de chaleur, sueurs nocturnes, sécheresse vaginale
- Comprendre la transition vers la ménopause

**Frustrations** :
- Apps conçues pour cycles réguliers → prédictions absurdes
- Pas de symptômes spécifiques péri-ménopause
- Manque d'information scientifique sur la transition

**Scénarios clés** :
1. Activer mode Péri-ménopause → dashboard adapté
2. Quotidien → quick-log bouffées de chaleur / sueurs nocturnes
3. Consulter variabilité cycle → graphique longueurs de cycle
4. Lire info scientifique sur la péri-ménopause

---

## P5 : Utilisatrice sensible confidentialité

**Profil** : Toute utilisatrice soucieuse de la vie privée de ses données de santé reproductive.
Contexte potentiellement répressif (pays restrictifs sur l'avortement, violence domestique).

**Objectifs** :
- Aucune donnée ne quitte le device (zéro réseau)
- Protéger l'accès par PIN/biométrie
- Pouvoir tout effacer instantanément en cas d'urgence (panic wipe)
- Exporter un backup chiffré qu'elle seule peut lire

**Frustrations** :
- Flo a vendu les données de ses utilisatrices à Facebook
- Apps avec analytics/trackers intégrés
- Pas de moyen d'effacement rapide en situation d'urgence

**Scénarios clés** :
1. Installation → vérifier zéro permission réseau → rassurée
2. Chaque ouverture → PIN requis → données protégées
3. Situation d'urgence → panic wipe → tout effacé en 1 seconde
4. Backup → export chiffré AES-256 → sauvegarder sur clé USB

---

## P6 : Utilisatrice accessibilité

**Profil** : Utilisatrice avec handicap visuel, moteur ou cognitif.

**Objectifs** :
- Utiliser l'app avec VoiceOver (iOS) ou TalkBack (Android)
- Touch targets suffisamment grands (≥48dp)
- Mode calme pour réduire la surcharge cognitive

**Frustrations** :
- Apps avec petits boutons impossibles à toucher
- Animations qui déclenchent le mal des transports
- Contraste insuffisant pour lire le texte
- Emojis non annoncés correctement par les lecteurs d'écran

**Scénarios clés** :
1. Activer VoiceOver → naviguer dans tous les écrans → labels corrects
2. Activer Reduce Motion → animations spring désactivées
3. Activer Calm Mode → prédictions masquées → interface apaisée
4. Mode sombre → vérifier contraste AA sur tous les textes
