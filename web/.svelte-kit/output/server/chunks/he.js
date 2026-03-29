const app = { "name": "Luna", "tagline": "המחזור שלך, מובן" };
const phases = { "menstrual": "וסתית", "follicular": "פוליקולרית", "ovulation": "ביוץ", "luteal": "לוטיאלית" };
const privacy = { "badge": "פרטית ומוצפנת", "disclaimer": "מידע זה אינו מחליף ייעוץ רפואי מקצועי. התייעצ תמיד עם ספק שירותי בריאות מוסמך לגבי בעיות רפואיות." };
const settings = { "title": "הגדרות", "cycleLength": "אורך המחזור", "periodLength": "אורך הווסת", "lastPeriod": "תאריך הווסת האחרון", "save": "שמור", "saved": "ההגדרות נשמרו" };
const he = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  he as default,
  phases,
  privacy,
  settings
};
