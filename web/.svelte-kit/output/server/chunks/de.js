const app = { "name": "Luna", "tagline": "Dein Zyklus, verstanden" };
const phases = { "menstrual": "Menstruation", "follicular": "Follikelphase", "ovulation": "Eisprung", "luteal": "Lutealphase" };
const privacy = { "badge": "Privat und verschlüsselt", "disclaimer": "Diese Information ersetzt keine professionelle medizinische Beratung. Wende dich immer an eine qualifizierte Gesundheitsfachkraft." };
const settings = { "title": "Einstellungen", "cycleLength": "Zykluslänge", "periodLength": "Periodenlänge", "lastPeriod": "Datum der letzten Periode", "save": "Speichern", "saved": "Einstellungen gespeichert" };
const contact = { "title": "Kontakt", "close": "Schließen", "back": "Zurück", "send": "Senden", "messageAriaLabel": "Ihre Nachricht", "sentTitle": "Nachricht gesendet!", "sentBody": "Danke, wir lesen jede Nachricht.", "typeImprovement": "Verbesserung", "typeFeedback": "Feedback", "typeBug": "Fehler", "placeholderImprovement": "Es wäre toll, wenn…", "placeholderFeedback": "Ihr Feedback ist wichtig…", "placeholderBug": "Wenn ich… passiert…" };
const de = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  de as default,
  phases,
  privacy,
  settings
};
