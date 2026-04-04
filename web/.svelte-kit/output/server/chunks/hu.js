const app = { "name": "Luna", "tagline": "A ciklusod, megértve" };
const phases = { "menstrual": "Menstruációs", "follicular": "Follikuláris", "ovulation": "Ovuláció", "luteal": "Luteális" };
const privacy = { "badge": "Privát és titkosított", "disclaimer": "Ez az információ nem helyettesíti a szakmai orvosi tanácsadást. Orvosi kérdésekkel mindig forduljon képzett egészségügyi szolgáltatóhoz." };
const settings = { "title": "Beállítások", "cycleLength": "Ciklus hossza", "periodLength": "Menstruáció hossza", "lastPeriod": "Utolsó menstruáció dátuma", "save": "Mentés", "saved": "Beállítások mentve" };
const contact = { "title": "Kapcsolat", "close": "Bezárás", "back": "Vissza", "send": "Küldés", "messageAriaLabel": "Az üzenete", "sentTitle": "Üzenet elküldve!", "sentBody": "Köszönjük, minden üzenetet elolvasunk.", "typeImprovement": "Fejlesztési javaslat", "typeFeedback": "Visszajelzés", "typeBug": "Hiba", "placeholderImprovement": "Klassz lenne, ha…", "placeholderFeedback": "A véleménye fontos…", "placeholderBug": "Amikor… csinálom,… történik" };
const hu = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  hu as default,
  phases,
  privacy,
  settings
};
