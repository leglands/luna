const app = { "name": "Luna", "tagline": "Твојот циклус, разбран" };
const phases = { "menstrual": "Менструална", "follicular": "Фоликуларна", "ovulation": "Овулација", "luteal": "Лутеална" };
const privacy = { "badge": "Приватно и шифрирано", "disclaimer": "Оваа информација не ја заменува професионалната медицинска совет. Секогаш консултирајте се со квалификуван давател на здравствени услуги за медицински прашања." };
const settings = { "title": "Поставки", "cycleLength": "Должина на циклус", "periodLength": "Должина на период", "lastPeriod": "Датум на последен период", "save": "Зачувај", "saved": "Поставки зачувани" };
const contact = { "title": "Контактирајте нè", "close": "Затвори", "back": "Назад", "send": "Испрати", "messageAriaLabel": "Вашата порака", "sentTitle": "Пораката е испратена!", "sentBody": "Благодариме, ги читаме сите пораки.", "typeImprovement": "Подобрување", "typeFeedback": "Повратна информација", "typeBug": "Грешка", "placeholderImprovement": "Би било одлично ако…", "placeholderFeedback": "Вашето мислење е важно…", "placeholderBug": "Кога правам… се случува…" };
const mk = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  mk as default,
  phases,
  privacy,
  settings
};
