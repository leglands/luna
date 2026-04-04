const app = { "name": "Luna", "tagline": "چرخه شما، فهمیده شد" };
const phases = { "menstrual": "قاعدگی", "follicular": "فولیکولی", "ovulation": "تخمک‌گذاری", "luteal": "لوتئال" };
const privacy = { "badge": "خصوصی و رمزگذاری شده", "disclaimer": "این اطلاعات جایگزین توصیه پزشکی حرفه‌ای نیست. همیشه برای نگرانی‌های پزشکی با یک ارائه‌دهنده مراقبت‌های بهداشتی واجد شرایط مشورت کنید." };
const settings = { "title": "تنظیمات", "cycleLength": "طول چرخه", "periodLength": "طول قاعدگی", "lastPeriod": "تاریخ آخرین قاعدگی", "save": "ذخیره", "saved": "تنظیمات ذخیره شد" };
const contact = { "title": "تماس با ما", "close": "بستن", "back": "بازگشت", "send": "ارسال", "messageAriaLabel": "پیام شما", "sentTitle": "پیام ارسال شد!", "sentBody": "ممنون، هر پیامی را می‌خوانیم.", "typeImprovement": "بهبود", "typeFeedback": "بازخورد", "typeBug": "باگ", "placeholderImprovement": "عالی می‌شد اگر…", "placeholderFeedback": "نظر شما مهم است…", "placeholderBug": "وقتی… می‌کنم، … اتفاق می‌افتد" };
const fa = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  fa as default,
  phases,
  privacy,
  settings
};
