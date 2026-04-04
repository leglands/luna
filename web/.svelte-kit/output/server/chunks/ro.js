const app = { "name": "Luna", "tagline": "Ciclul tău, înțeles" };
const phases = { "menstrual": "Menstrual", "follicular": "Folicular", "ovulation": "Ovulație", "luteal": "Luteală" };
const privacy = { "badge": "Confidențial și Criptat", "disclaimer": "Această informație nu înlocuiește sfatul medical profesional. Consultați întotdeauna un furnizor de servicii medicale calificat pentru preocupări medicale." };
const settings = { "title": "Setări", "cycleLength": "Durata ciclului", "periodLength": "Durata menstruației", "lastPeriod": "Data ultimei menstruații", "save": "Salvează", "saved": "Setări salvate" };
const contact = { "title": "Contactați-ne", "close": "Închide", "back": "Înapoi", "send": "Trimite", "messageAriaLabel": "Mesajul dvs.", "sentTitle": "Mesaj trimis!", "sentBody": "Mulțumim, citim fiecare mesaj.", "typeImprovement": "Îmbunătățire", "typeFeedback": "Feedback", "typeBug": "Eroare", "placeholderImprovement": "Ar fi minunat dacă…", "placeholderFeedback": "Opinia dvs. contează…", "placeholderBug": "Când fac… se întâmplă…" };
const ro = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  ro as default,
  phases,
  privacy,
  settings
};
