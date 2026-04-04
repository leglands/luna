const app = { "name": "Luna", "tagline": "Твоят цикъл, разбран" };
const phases = { "menstrual": "Менструална", "follicular": "Фоликуларна", "ovulation": "Овулация", "luteal": "Лутеална" };
const privacy = { "badge": "Частна и криптирана", "disclaimer": "Тази информация не замества професионалния медицински съвет. Винаги се консултирайте с квалифициран доставчик на здравни услуги за медицински проблеми." };
const settings = { "title": "Настройки", "cycleLength": "Продължителност на цикъла", "periodLength": "Продължителност на менструацията", "lastPeriod": "Дата на последната менструация", "save": "Запазване", "saved": "Настройките са запазени" };
const contact = { "title": "Свържете се с нас", "close": "Затвори", "back": "Назад", "send": "Изпрати", "messageAriaLabel": "Вашето съобщение", "sentTitle": "Съобщението е изпратено!", "sentBody": "Благодарим, четем всяко съобщение.", "typeImprovement": "Подобрение", "typeFeedback": "Обратна връзка", "typeBug": "Грешка", "placeholderImprovement": "Би било чудесно, ако…", "placeholderFeedback": "Вашето мнение е важно…", "placeholderBug": "Когато правя… се случва…" };
const bg = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  bg as default,
  phases,
  privacy,
  settings
};
