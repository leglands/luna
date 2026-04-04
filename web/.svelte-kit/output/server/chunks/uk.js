const app = { "name": "Luna", "tagline": "Зрозумійте свій менструальний цикл" };
const phases = { "menstrual": "Менструальна", "follicular": "Фолікулярна", "ovulation": "Овуляція", "luteal": "Лютеїнова" };
const privacy = { "badge": "Конфіденційно та зашифровано", "disclaimer": "Ця інформація не замінює професійну медичну консультацію. Завжди звертайтесь до кваліфікованого фахівця." };
const settings = { "title": "Налаштування", "cycleLength": "Довжина циклу", "periodLength": "Тривалість менструації", "lastPeriod": "Дата останньої менструації", "save": "Зберегти", "saved": "Налаштування збережено" };
const contact = { "title": "Зв'язатися", "close": "Закрити", "back": "Назад", "send": "Надіслати", "messageAriaLabel": "Ваше повідомлення", "sentTitle": "Повідомлення надіслано!", "sentBody": "Дякуємо, ми читаємо кожне повідомлення.", "typeImprovement": "Покращення", "typeFeedback": "Відгук", "typeBug": "Помилка", "placeholderImprovement": "Було б чудово, якби…", "placeholderFeedback": "Ваша думка важлива…", "placeholderBug": "Коли я роблю… відбувається…" };
const uk = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  uk as default,
  phases,
  privacy,
  settings
};
