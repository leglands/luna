const app = { "name": "Luna", "tagline": "המחזור שלך, מובן" };
const phases = { "menstrual": "וסתית", "follicular": "פוליקולרית", "ovulation": "ביוץ", "luteal": "לוטיאלית" };
const privacy = { "badge": "פרטית ומוצפנת", "disclaimer": "מידע זה אינו מחליף ייעוץ רפואי מקצועי. התייעצ תמיד עם ספק שירותי בריאות מוסמך לגבי בעיות רפואיות." };
const settings = { "title": "הגדרות", "cycleLength": "אורך המחזור", "periodLength": "אורך הווסת", "lastPeriod": "תאריך הווסת האחרון", "save": "שמור", "saved": "ההגדרות נשמרו" };
const contact = { "title": "צור קשר", "close": "סגור", "back": "חזור", "send": "שלח", "messageAriaLabel": "ההודעה שלך", "sentTitle": "ההודעה נשלחה!", "sentBody": "תודה, אנחנו קוראים כל הודעה.", "typeImprovement": "שיפור", "typeFeedback": "משוב", "typeBug": "באג", "placeholderImprovement": "היה נהדר אם…", "placeholderFeedback": "דעתך חשובה…", "placeholderBug": "כשאני… קורה…" };
const he = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  he as default,
  phases,
  privacy,
  settings
};
