const app = { "name": "Luna", "tagline": "Vaš ciklus, shvaćen" };
const phases = { "menstrual": "Menstrualna", "follicular": "Folikularna", "ovulation": "Ovulacija", "luteal": "Lutealna" };
const privacy = { "badge": "Privatno i šifrovano", "disclaimer": "Ove informacije ne zamjenjuju profesionalni medicinski savjet. Uvijek se konzultirajte s kvalifikovanim zdravstvenim radnikom za medicinska pitanja." };
const settings = { "title": "Postavke", "cycleLength": "Dužina ciklusa", "periodLength": "Dužina menstruacije", "lastPeriod": "Datum poslednje menstruacije", "save": "Sačuvaj", "saved": "Postavke sačuvane" };
const sr = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  sr as default,
  phases,
  privacy,
  settings
};
