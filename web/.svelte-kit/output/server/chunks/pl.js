const app = { "name": "Luna", "tagline": "Twój cykl, zrozumiany" };
const phases = { "menstrual": "Miesiączkowa", "follicular": "Folikularna", "ovulation": "Owulacja", "luteal": "Lutealna" };
const privacy = { "badge": "Prywatne i szyfrowane", "disclaimer": "Te informacje nie zastępują profesjonalnej porady medycznej. Zawsze konsultuj się z wykwalifikowanym pracownikiem służby zdrowia." };
const settings = { "title": "Ustawienia", "cycleLength": "Długość cyklu", "periodLength": "Długość miesiączki", "lastPeriod": "Data ostatniej miesiączki", "save": "Zapisz", "saved": "Ustawienia zapisane" };
const contact = { "title": "Kontakt", "close": "Zamknij", "back": "Wstecz", "send": "Wyślij", "messageAriaLabel": "Twoja wiadomość", "sentTitle": "Wiadomość wysłana!", "sentBody": "Dziękujemy, czytamy każdą wiadomość.", "typeImprovement": "Ulepszenie", "typeFeedback": "Opinia", "typeBug": "Błąd", "placeholderImprovement": "Byłoby świetnie, gdyby…", "placeholderFeedback": "Twoja opinia jest ważna…", "placeholderBug": "Kiedy robię… dzieje się…" };
const pl = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  pl as default,
  phases,
  privacy,
  settings
};
