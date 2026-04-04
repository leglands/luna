const app = { "name": "Luna", "tagline": "Vaš ciklus, shvaćen" };
const phases = { "menstrual": "Menstrualna", "follicular": "Folikularna", "ovulation": "Ovulacija", "luteal": "Lutealna" };
const privacy = { "badge": "Privatno i šifrovano", "disclaimer": "Ove informacije ne zamjenjuju profesionalni medicinski savjet. Uvijek se konzultirajte s kvalifikovanim zdravstvenim radnikom za medicinska pitanja." };
const settings = { "title": "Postavke", "cycleLength": "Dužina ciklusa", "periodLength": "Dužina menstruacije", "lastPeriod": "Datum poslednje menstruacije", "save": "Sačuvaj", "saved": "Postavke sačuvane" };
const contact = { "title": "Kontaktirajte nas", "close": "Zatvori", "back": "Nazad", "send": "Pošalji", "messageAriaLabel": "Vaša poruka", "sentTitle": "Poruka poslata!", "sentBody": "Hvala, čitamo svaku poruku.", "typeImprovement": "Poboljšanje", "typeFeedback": "Povratna informacija", "typeBug": "Greška", "placeholderImprovement": "Bilo bi sjajno kad bi…", "placeholderFeedback": "Vaše mišljenje je važno…", "placeholderBug": "Kada radim… dešava se…" };
const sr = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  sr as default,
  phases,
  privacy,
  settings
};
