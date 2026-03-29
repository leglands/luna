const app = { "name": "Luna", "tagline": "Поймите свой менструальный цикл" };
const phases = { "menstrual": "Менструальная", "follicular": "Фолликулярная", "ovulation": "Овуляция", "luteal": "Лютеиновая" };
const privacy = { "badge": "Конфиденциально и зашифровано", "disclaimer": "Эта информация не заменяет профессиональную медицинскую консультацию. Всегда обращайтесь к квалифицированному специалисту." };
const settings = { "title": "Настройки", "cycleLength": "Длина цикла", "periodLength": "Длина менструации", "lastPeriod": "Дата последней менструации", "save": "Сохранить", "saved": "Настройки сохранены" };
const ru = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  ru as default,
  phases,
  privacy,
  settings
};
