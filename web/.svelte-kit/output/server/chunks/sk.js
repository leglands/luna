const app = { "name": "Luna", "tagline": "Tvoj cyklus, pochopený" };
const phases = { "menstrual": "Menštruácia", "follicular": "Folikulárna", "ovulation": "Ovulácia", "luteal": "Luteálna" };
const privacy = { "badge": "Súkromné a šifrované", "disclaimer": "Táto informácia nenahrádza odbornú lekársku pomoc. Vždy sa konzultujte s kvalifikovaným poskytovateľom zdravotnej starostlivosti pre akékoľvek zdravotné otázky." };
const settings = { "title": "Nastavenia", "cycleLength": "Dĺžka cyklu", "periodLength": "Dĺžka menštruácie", "lastPeriod": "Dátum poslednej menštruácie", "save": "Uložiť", "saved": "Nastavenia uložené" };
const contact = { "title": "Kontaktujte nás", "close": "Zavrieť", "back": "Späť", "send": "Odoslať", "messageAriaLabel": "Vaša správa", "sentTitle": "Správa odoslaná!", "sentBody": "Ďakujeme, čítame každú správu.", "typeImprovement": "Vylepšenie", "typeFeedback": "Spätná väzba", "typeBug": "Chyba", "placeholderImprovement": "Bolo by skvelé, keby…", "placeholderFeedback": "Váš názor je dôležitý…", "placeholderBug": "Keď robím… stane sa…" };
const sk = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  sk as default,
  phases,
  privacy,
  settings
};
