const app = { "name": "Luna", "tagline": "あなたのサイクルを理解する" };
const phases = { "menstrual": "月経期", "follicular": "卵胞期", "ovulation": "排卵期", "luteal": "黄体期" };
const privacy = { "badge": "プライベートで暗号化済み", "disclaimer": "この情報は専門的な医療アドバイスの代わりにはなりません。資格のある医療従事者に相談してください。" };
const settings = { "title": "設定", "cycleLength": "周期の長さ", "periodLength": "月経の長さ", "lastPeriod": "最後の月経日", "save": "保存", "saved": "設定を保存しました" };
const ja = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  ja as default,
  phases,
  privacy,
  settings
};
