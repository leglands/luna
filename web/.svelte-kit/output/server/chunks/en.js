const app = { "name": "Luna", "tagline": "Your cycle, understood" };
const phases = { "menstrual": "Menstrual", "follicular": "Follicular", "ovulation": "Ovulation", "luteal": "Luteal" };
const messages = { "menstrual": "Your body is resting. Take it easy today.", "follicular": "Energy is rising. A great time for new beginnings.", "ovulation": "Peak fertility. You may feel more confident and social.", "luteal": "Time for introspection. Be gentle with yourself." };
const cycle = { "day": "Day {day}", "ofCycle": "of your cycle", "nextPeriod": "Next period in {days} days", "periodExpected": "Period expected in {days} days", "fertileWindow": "Fertile window", "predictedOvulation": "Predicted ovulation" };
const logging = { "period": "Period", "symptoms": "Symptoms", "temperature": "Temperature", "mood": "Mood", "logPeriod": "Log Period", "logSymptoms": "Log Symptoms", "logTemperature": "Log Temperature", "logMood": "Log Mood" };
const calendar = { "title": "Calendar", "insights": "Insights", "today": "Today", "logged": "Logged", "predicted": "Predicted" };
const insights = { "title": "Insights", "avgCycle": "Average cycle length", "avgPeriod": "Average period length", "symptomCorrelations": "Symptom correlations", "noData": "Log more days to see insights" };
const promo = { "ttcTitle": "Trying to conceive?", "ttcBody": "Aura helps you track fertility and connect with community.", "auraCTA": "Try Aura", "follicularTitle": "Boost your energy", "follicularBody": "Nova helps you optimize your fitness and nutrition.", "novaCTA": "Try Nova", "almaTitle": "Need someone to talk to?", "almaBody": "Alma connects you with licensed therapists.", "almaCTA": "Talk to Alma" };
const privacy = { "badge": "Private & Encrypted", "disclaimer": "This information does not replace professional medical advice. Always consult a qualified healthcare provider for medical concerns." };
const settings = { "title": "Settings", "cycleLength": "Cycle Length", "periodLength": "Period Length", "lastPeriod": "Last Period Date", "save": "Save", "saved": "Settings saved" };
const contact = { "title": "Contact us", "close": "Close", "back": "Back", "send": "Send", "messageAriaLabel": "Your message", "sentTitle": "Message sent!", "sentBody": "Thank you, we read every message.", "typeImprovement": "Improvement", "typeFeedback": "Feedback", "typeBug": "Bug", "placeholderImprovement": "It would be great if…", "placeholderFeedback": "Your feedback matters…", "placeholderBug": "When I do… this happens…" };
const en = {
  app,
  phases,
  messages,
  cycle,
  logging,
  calendar,
  insights,
  promo,
  privacy,
  settings,
  contact
};
export {
  app,
  calendar,
  contact,
  cycle,
  en as default,
  insights,
  logging,
  messages,
  phases,
  privacy,
  promo,
  settings
};
