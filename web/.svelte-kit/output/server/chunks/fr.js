const app = { "name": "Luna", "tagline": "Votre cycle, compris" };
const phases = { "menstrual": "Menstruelle", "follicular": "Folliculaire", "ovulation": "Ovulation", "luteal": "Lutéale" };
const messages = { "menstrual": "Votre corps se repose. Prenez-le doucement aujourd'hui.", "follicular": "Votre énergie monte. Un bon moment pour les nouveaux départs.", "ovulation": "Pic de fertilité. Vous pouvez vous sentir plus confiante et sociale.", "luteal": "Temps d'introspection. Soyez douce avec vous-même." };
const cycle = { "day": "Jour {day}", "ofCycle": "de votre cycle", "nextPeriod": "Prochaines règles dans {days} jours", "periodExpected": "Règles prévues dans {days} jours", "fertileWindow": "Fenêtre fertile", "predictedOvulation": "Ovulation prévue" };
const logging = { "period": "Règles", "symptoms": "Symptômes", "temperature": "Température", "mood": "Humeur", "logPeriod": "Noter les règles", "logSymptoms": "Noter les symptômes", "logTemperature": "Noter la température", "logMood": "Noter l'humeur" };
const calendar = { "title": "Calendrier", "insights": "Aperçus", "today": "Aujourd'hui", "logged": "Noté", "predicted": "Prédit" };
const insights = { "title": "Aperçus", "avgCycle": "Durée moyenne du cycle", "avgPeriod": "Durée moyenne des règles", "symptomCorrelations": "Corrélations des symptômes", "noData": "Notez plus de jours pour voir les aperçus" };
const promo = { "ttcTitle": "Vous essayez de concevoir?", "ttcBody": "Aura vous aide à suivre votre fertilité et à vous connecter avec la communauté.", "auraCTA": "Essayer Aura", "follicularTitle": "Boostez votre énergie", "follicularBody": "Nova vous aide à optimiser votre fitness et nutrition.", "novaCTA": "Essayer Nova", "almaTitle": "Besoin de parler à quelqu'un?", "almaBody": "Alma vous connecte avec des thérapeutes licenciés.", "almaCTA": "Parler à Alma" };
const privacy = { "badge": "Privé et Chiffré", "disclaimer": "Ces informations ne remplacent pas l'avis médical professionnel. Consultez toujours un professionnel de santé qualifié pour vos préoccupations médicales." };
const settings = { "title": "Paramètres", "cycleLength": "Durée du cycle", "periodLength": "Durée des règles", "lastPeriod": "Date des dernières règles", "save": "Enregistrer", "saved": "Paramètres enregistrés" };
const contact = { "title": "Nous contacter", "close": "Fermer", "back": "Retour", "send": "Envoyer", "messageAriaLabel": "Votre message", "sentTitle": "Message envoyé !", "sentBody": "Merci, nous lisons chaque message.", "typeImprovement": "Amélioration", "typeFeedback": "Feedback", "typeBug": "Bug", "placeholderImprovement": "Ce serait super si…", "placeholderFeedback": "Votre avis compte…", "placeholderBug": "Quand je fais… il se passe…" };
const fr = {
  app,
  phases,
  messages,
  cycle,
  logging,
  calendar,
  insights,
  promo,
  privacy,
  settings,
  contact
};
export {
  app,
  calendar,
  contact,
  cycle,
  fr as default,
  insights,
  logging,
  messages,
  phases,
  privacy,
  promo,
  settings
};
