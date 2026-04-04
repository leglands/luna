const app = { "name": "Luna", "tagline": "আপনার চক্র, বোঝা" };
const phases = { "menstrual": "মাসিক", "follicular": "ফলিকুলার", "ovulation": "ডিম্বস্থলন", "luteal": "লুটিয়াল" };
const privacy = { "badge": "ব্যক্তিগত এবং এনক্রিপ্টেড", "disclaimer": "এই তথ্য পেশাদার মেডিকেল পরামর্শের প্রতিস্থাপন নয়। মেডিকেল সমস্যার জন্য সর্বদা একজন যোগ্য স্বাস্থ্যসেবা প্রদানকারীর সাথে পরামর্শ করুন।" };
const settings = { "title": "সেটিংস", "cycleLength": "চক্রের দৈর্ঘ্য", "periodLength": "মাসিকের দৈর্ঘ্য", "lastPeriod": "শেষ মাসিকের তারিখ", "save": "সংরক্ষণ", "saved": "সেটিংস সংরক্ষিত" };
const contact = { "title": "যোগাযোগ করুন", "close": "বন্ধ করুন", "back": "ফিরে যান", "send": "পাঠান", "messageAriaLabel": "আপনার বার্তা", "sentTitle": "বার্তা পাঠানো হয়েছে!", "sentBody": "ধন্যবাদ, আমরা প্রতিটি বার্তা পড়ি।", "typeImprovement": "উন্নতি", "typeFeedback": "মতামত", "typeBug": "বাগ", "placeholderImprovement": "যদি… হত তাহলে ভালো হত", "placeholderFeedback": "আপনার মতামত গুরুত্বপূর্ণ…", "placeholderBug": "যখন আমি… করি তখন… হয়" };
const bn = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  bn as default,
  phases,
  privacy,
  settings
};
