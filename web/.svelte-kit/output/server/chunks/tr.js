const app = { "name": "Luna", "tagline": "Adet döngünüzü anlayın" };
const phases = { "menstrual": "Menstrüasyon", "follicular": "Foliküler", "ovulation": "Ovülasyon", "luteal": "Luteal" };
const privacy = { "badge": "Gizli ve şifreli", "disclaimer": "Bu bilgiler profesyonel tıbbi tavsiyenin yerini tutmaz. Her zaman nitelikli bir sağlık uzmanına danışın." };
const settings = { "title": "Ayarlar", "cycleLength": "Döngü uzunluğu", "periodLength": "Regl süresi", "lastPeriod": "Son regl tarihi", "save": "Kaydet", "saved": "Ayarlar kaydedildi" };
const contact = { "title": "İletişim", "close": "Kapat", "back": "Geri", "send": "Gönder", "messageAriaLabel": "Mesajınız", "sentTitle": "Mesaj gönderildi!", "sentBody": "Teşekkürler, her mesajı okuyoruz.", "typeImprovement": "Geliştirme", "typeFeedback": "Geri bildirim", "typeBug": "Hata", "placeholderImprovement": "Şöyle olsaydı harika olurdu…", "placeholderFeedback": "Görüşünüz önemli…", "placeholderBug": "Şunu yapınca… oluyor" };
const tr = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  tr as default,
  phases,
  privacy,
  settings
};
