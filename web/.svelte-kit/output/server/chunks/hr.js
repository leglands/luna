const app = { "name": "Luna", "tagline": "Vaš ciklus, razumljiv" };
const phases = { "menstrual": "Menstrualna", "follicular": "Folikularna", "ovulation": "Ovulacija", "luteal": "Lutealna" };
const privacy = { "badge": "Privatno i šifrirano", "disclaimer": "Ove informacije ne zamjenjuju profesionalni medicinski savjet. Uvijek se konzultirajte s kvalificiranim pružateljem zdravstvenih usluga za medicinska pitanja." };
const settings = { "title": "Postavke", "cycleLength": "Dužina ciklusa", "periodLength": "Dužina menstruacije", "lastPeriod": "Datum zadnje menstruacije", "save": "Spremi", "saved": "Postavke spremljene" };
const contact = { "title": "Kontaktirajte nas", "close": "Zatvori", "back": "Natrag", "send": "Pošalji", "messageAriaLabel": "Vaša poruka", "sentTitle": "Poruka poslana!", "sentBody": "Hvala, čitamo svaku poruku.", "typeImprovement": "Poboljšanje", "typeFeedback": "Povratna informacija", "typeBug": "Greška", "placeholderImprovement": "Bilo bi sjajno kad bi…", "placeholderFeedback": "Vaše mišljenje je važno…", "placeholderBug": "Kad radim… dogodi se…" };
const hr = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  hr as default,
  phases,
  privacy,
  settings
};
