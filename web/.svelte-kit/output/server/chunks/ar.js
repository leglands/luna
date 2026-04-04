const app = { "name": "Luna", "tagline": "افهمي دورتك الشهرية" };
const phases = { "menstrual": "طور الحيض", "follicular": "الطور الجريبي", "ovulation": "الإباضة", "luteal": "الطور الأصفر" };
const privacy = { "badge": "خاص ومشفر", "disclaimer": "هذه المعلومات لا تحل محل المشورة الطبية المتخصصة. استشيري دائماً مقدم رعاية صحية مؤهلاً." };
const settings = { "title": "الإعدادات", "cycleLength": "طول الدورة", "periodLength": "مدة الحيض", "lastPeriod": "تاريخ آخر دورة", "save": "حفظ", "saved": "تم حفظ الإعدادات" };
const contact = { "title": "اتصل بنا", "close": "إغلاق", "back": "رجوع", "send": "إرسال", "messageAriaLabel": "رسالتك", "sentTitle": "تم إرسال الرسالة!", "sentBody": "شكراً، نقرأ كل رسالة.", "typeImprovement": "تحسين", "typeFeedback": "ملاحظات", "typeBug": "خطأ", "placeholderImprovement": "سيكون رائعاً لو…", "placeholderFeedback": "رأيك يهمنا…", "placeholderBug": "عندما أفعل… يحدث…" };
const ar = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  ar as default,
  phases,
  privacy,
  settings
};
