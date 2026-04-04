const app = { "name": "Luna", "tagline": "你的週期，被理解了" };
const phases = { "menstrual": "月經期", "follicular": "濾泡期", "ovulation": "排卵期", "luteal": "黃體期" };
const privacy = { "badge": "隱私和加密", "disclaimer": "此資訊不能取代專業的醫療建議。如有醫療疑慮，請始終諮詢合格的醫療提供者。" };
const settings = { "title": "設定", "cycleLength": "週期長度", "periodLength": "經期長度", "lastPeriod": "上次經期日期", "save": "儲存", "saved": "設定已儲存" };
const contact = { "title": "聯絡我們", "close": "關閉", "back": "返回", "send": "傳送", "messageAriaLabel": "您的訊息", "sentTitle": "訊息已傳送！", "sentBody": "感謝您，我們閱讀每一則訊息。", "typeImprovement": "改善建議", "typeFeedback": "意見回饋", "typeBug": "問題", "placeholderImprovement": "如果能…就太好了", "placeholderFeedback": "您的意見很重要…", "placeholderBug": "當我…時，發生了…" };
const zhTW = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  zhTW as default,
  phases,
  privacy,
  settings
};
