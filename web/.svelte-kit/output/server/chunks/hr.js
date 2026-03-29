const app = { "name": "Luna", "tagline": "Vaš ciklus, razumljiv" };
const phases = { "menstrual": "Menstrualna", "follicular": "Folikularna", "ovulation": "Ovulacija", "luteal": "Lutealna" };
const privacy = { "badge": "Privatno i šifrirano", "disclaimer": "Ove informacije ne zamjenjuju profesionalni medicinski savjet. Uvijek se konzultirajte s kvalificiranim pružateljem zdravstvenih usluga za medicinska pitanja." };
const settings = { "title": "Postavke", "cycleLength": "Dužina ciklusa", "periodLength": "Dužina menstruacije", "lastPeriod": "Datum zadnje menstruacije", "save": "Spremi", "saved": "Postavke spremljene" };
const hr = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  hr as default,
  phases,
  privacy,
  settings
};
