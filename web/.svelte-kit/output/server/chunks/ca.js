const app = { "name": "Luna", "tagline": "El teu cicle, entès" };
const phases = { "menstrual": "Menstrual", "follicular": "Fol·licular", "ovulation": "Ovulació", "luteal": "Luteal" };
const privacy = { "badge": "Privada i xifrada", "disclaimer": "Aquesta informació no substitueix l'assessorament mèdic professional. Consulta sempre un proveïdor de serveis sanitaris qualificat per a qüestions mèdiques." };
const settings = { "title": "Configuració", "cycleLength": "Durada del cicle", "periodLength": "Durada del període", "lastPeriod": "Data de l'últim període", "save": "Desa", "saved": "Configuració desada" };
const contact = { "title": "Contacta'ns", "close": "Tanca", "back": "Tornar", "send": "Enviar", "messageAriaLabel": "El vostre missatge", "sentTitle": "Missatge enviat!", "sentBody": "Gràcies, llegim cada missatge.", "typeImprovement": "Millora", "typeFeedback": "Comentaris", "typeBug": "Error", "placeholderImprovement": "Seria fantàstic si…", "placeholderFeedback": "La vostra opinió és important…", "placeholderBug": "Quan faig… passa…" };
const ca = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  ca as default,
  phases,
  privacy,
  settings
};
