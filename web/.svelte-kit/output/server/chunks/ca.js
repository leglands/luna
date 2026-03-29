const app = { "name": "Luna", "tagline": "El teu cicle, entès" };
const phases = { "menstrual": "Menstrual", "follicular": "Fol·licular", "ovulation": "Ovulació", "luteal": "Luteal" };
const privacy = { "badge": "Privada i xifrada", "disclaimer": "Aquesta informació no substitueix l'assessorament mèdic professional. Consulta sempre un proveïdor de serveis sanitaris qualificat per a qüestions mèdiques." };
const settings = { "title": "Configuració", "cycleLength": "Durada del cicle", "periodLength": "Durada del període", "lastPeriod": "Data de l'últim període", "save": "Desa", "saved": "Configuració desada" };
const ca = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  ca as default,
  phases,
  privacy,
  settings
};
