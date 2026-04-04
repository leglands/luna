const app = { "name": "Luna", "tagline": "Поймите свой менструальный цикл" };
const phases = { "menstrual": "Менструальная", "follicular": "Фолликулярная", "ovulation": "Овуляция", "luteal": "Лютеиновая" };
const privacy = { "badge": "Конфиденциально и зашифровано", "disclaimer": "Эта информация не заменяет профессиональную медицинскую консультацию. Всегда обращайтесь к квалифицированному специалисту." };
const settings = { "title": "Настройки", "cycleLength": "Длина цикла", "periodLength": "Длина менструации", "lastPeriod": "Дата последней менструации", "save": "Сохранить", "saved": "Настройки сохранены" };
const contact = { "title": "Связаться", "close": "Закрыть", "back": "Назад", "send": "Отправить", "messageAriaLabel": "Ваше сообщение", "sentTitle": "Сообщение отправлено!", "sentBody": "Спасибо, мы читаем каждое сообщение.", "typeImprovement": "Улучшение", "typeFeedback": "Отзыв", "typeBug": "Ошибка", "placeholderImprovement": "Было бы здорово, если…", "placeholderFeedback": "Ваше мнение важно…", "placeholderBug": "Когда я делаю… происходит…" };
const ru = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  ru as default,
  phases,
  privacy,
  settings
};
