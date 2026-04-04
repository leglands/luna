const app = { "name": "Luna", "tagline": "Din syklus, forstått" };
const phases = { "menstrual": "Menstruasjon", "follicular": "Follikulær", "ovulation": "Ovulasjon", "luteal": "Luteal" };
const privacy = { "badge": "Privat og Kryptert", "disclaimer": "Denne informasjonen erstatter ikke profesjonell medisinsk rådgivning. Rådfør deg alltid med en kvalifisert helsepersonell for medisinske bekymringer." };
const settings = { "title": "Innstillinger", "cycleLength": "Sykluslengde", "periodLength": "Periodelengde", "lastPeriod": "Siste periodedato", "save": "Lagre", "saved": "Innstillinger lagret" };
const contact = { "title": "Kontakt oss", "close": "Lukk", "back": "Tilbake", "send": "Send", "messageAriaLabel": "Din melding", "sentTitle": "Melding sendt!", "sentBody": "Takk, vi leser hver melding.", "typeImprovement": "Forbedring", "typeFeedback": "Tilbakemelding", "typeBug": "Feil", "placeholderImprovement": "Det hadde vært flott om…", "placeholderFeedback": "Din mening er viktig…", "placeholderBug": "Når jeg gjør… skjer…" };
const nb = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  nb as default,
  phases,
  privacy,
  settings
};
