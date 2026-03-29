const app = { "name": "Luna", "tagline": "A ciklusod, megértve" };
const phases = { "menstrual": "Menstruációs", "follicular": "Follikuláris", "ovulation": "Ovuláció", "luteal": "Luteális" };
const privacy = { "badge": "Privát és titkosított", "disclaimer": "Ez az információ nem helyettesíti a szakmai orvosi tanácsadást. Orvosi kérdésekkel mindig forduljon képzett egészségügyi szolgáltatóhoz." };
const settings = { "title": "Beállítások", "cycleLength": "Ciklus hossza", "periodLength": "Menstruáció hossza", "lastPeriod": "Utolsó menstruáció dátuma", "save": "Mentés", "saved": "Beállítások mentve" };
const hu = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  hu as default,
  phases,
  privacy,
  settings
};
