const app = { "name": "Luna", "tagline": "Ο κύκλος σας, κατανοητός" };
const phases = { "menstrual": "Εμμηνορροϊκή", "follicular": "Ωοθυλακική", "ovulation": "Ωορρηξία", "luteal": "Ωχρινή" };
const privacy = { "badge": "Ιδιωτική και κρυπτογραφημένη", "disclaimer": "Αυτές οι πληροφορίες δεν υποκαθιστούν την επαγγελματική ιατρική συμβουλή. Πάντα συμβουλευτείτε έναν ειδικευμένο πάροχο υγειονομικής περίθαλψης για ιατρικά ζητήματα." };
const settings = { "title": "Ρυθμίσεις", "cycleLength": "Διάρκεια κύκλου", "periodLength": "Διάρκεια περιόδου", "lastPeriod": "Ημερομηνία τελευταίας περιόδου", "save": "Αποθήκευση", "saved": "Οι ρυθμίσεις αποθηκεύτηκαν" };
const contact = { "title": "Επικοινωνήστε μαζί μας", "close": "Κλείσιμο", "back": "Πίσω", "send": "Αποστολή", "messageAriaLabel": "Το μήνυμά σας", "sentTitle": "Το μήνυμα στάλθηκε!", "sentBody": "Ευχαριστούμε, διαβάζουμε κάθε μήνυμα.", "typeImprovement": "Βελτίωση", "typeFeedback": "Σχόλια", "typeBug": "Σφάλμα", "placeholderImprovement": "Θα ήταν υπέροχο αν…", "placeholderFeedback": "Η γνώμη σας μετράει…", "placeholderBug": "Όταν κάνω… συμβαίνει…" };
const el = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  el as default,
  phases,
  privacy,
  settings
};
