const STORAGE_KEY = 'life-luna-data';

const DEFAULT_SETTINGS = {
  cycleLength: 28,
  periodLength: 5,
  lastPeriodDate: null
};

const DEFAULT_LOG = {
  period: [],
  symptoms: [],
  temperature: [],
  mood: []
};

export function loadData() {
  if (typeof localStorage === 'undefined') return { settings: DEFAULT_SETTINGS, log: DEFAULT_LOG };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { settings: DEFAULT_SETTINGS, log: DEFAULT_LOG };
    return JSON.parse(raw);
  } catch {
    return { settings: DEFAULT_SETTINGS, log: DEFAULT_LOG };
  }
}

export function saveData(data) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updateSettings(updates) {
  const data = loadData();
  data.settings = { ...data.settings, ...updates };
  saveData(data);
  return data.settings;
}

export function logEntry(type, entry) {
  const data = loadData();
  if (!data.log[type]) data.log[type] = [];
  data.log[type].push({
    date: new Date().toISOString().split('T')[0],
    ...entry
  });
  saveData(data);
  return data.log;
}

export function predictNextPeriod(lastPeriodDate, cycleLength = 28) {
  if (!lastPeriodDate) return null;
  const last = new Date(lastPeriodDate);
  const next = new Date(last);
  next.setDate(next.getDate() + cycleLength);
  return next.toISOString().split('T')[0];
}

export function getCurrentPhase(lastPeriodDate, cycleLength = 28, today = new Date()) {
  if (!lastPeriodDate) return { phase: 'unknown', dayOfPhase: 0, fertileStart: null, fertileEnd: null };

  const last = new Date(lastPeriodDate);
  const now = new Date(today);
  
  const diffTime = now - last;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const cyclePosition = diffDays % cycleLength;
  const dayOfCycle = diffDays + 1;

  const fertileWindowStart = Math.floor(cycleLength / 2) - 5;
  const fertileWindowEnd = Math.floor(cycleLength / 2);

  let phase;
  let dayOfPhase;

  if (cyclePosition < 0) {
    phase = 'menstrual';
    dayOfPhase = cyclePosition + cycleLength;
  } else if (cyclePosition < 5) {
    phase = 'menstrual';
    dayOfPhase = cyclePosition + 1;
  } else if (cyclePosition < fertileWindowStart) {
    phase = 'follicular';
    dayOfPhase = cyclePosition - 4;
  } else if (cyclePosition <= fertileWindowEnd) {
    phase = 'ovulation';
    dayOfPhase = cyclePosition - fertileWindowStart + 1;
  } else {
    phase = 'luteal';
    dayOfPhase = cyclePosition - fertileWindowEnd + 1;
  }

  const fertileStart = new Date(last);
  fertileStart.setDate(fertileStart.getDate() + fertileWindowStart);
  const fertileEnd = new Date(last);
  fertileEnd.setDate(fertileEnd.getDate() + fertileWindowEnd);

  return {
    phase,
    dayOfPhase,
    dayOfCycle,
    cycleLength,
    fertileStart: fertileStart.toISOString().split('T')[0],
    fertileEnd: fertileEnd.toISOString().split('T')[0],
    nextPeriod: predictNextPeriod(lastPeriodDate, cycleLength),
    daysUntilNextPeriod: Math.ceil((new Date(predictNextPeriod(lastPeriodDate, cycleLength)) - now) / (1000 * 60 * 60 * 24))
  };
}

export function getFertileWindow(lastPeriodDate, cycleLength = 28) {
  const phase = getCurrentPhase(lastPeriodDate, cycleLength);
  return {
    start: phase.fertileStart,
    end: phase.fertileEnd
  };
}

export function getPhaseColor(phase) {
  const colors = {
    menstrual: '#D4737A',
    follicular: '#E5A855',
    ovulation: '#5BA876',
    luteal: '#6B7FC4',
    unknown: '#9D7BC9'
  };
  return colors[phase] || colors.unknown;
}

export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    const prevDate = new Date(year, month, -startDayOfWeek + i + 1);
    days.push({
      date: prevDate.toISOString().split('T')[0],
      day: prevDate.getDate(),
      currentMonth: false
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({
      date: date.toISOString().split('T')[0],
      day,
      currentMonth: true
    });
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate.toISOString().split('T')[0],
      day: nextDate.getDate(),
      currentMonth: false
    });
  }

  return days;
}

export function getAverageCycleLength(log) {
  if (!log.period || log.period.length < 2) return null;
  const periods = log.period.map(p => new Date(p.date)).sort((a, b) => a - b);
  let total = 0;
  for (let i = 1; i < periods.length; i++) {
    total += (periods[i] - periods[i - 1]) / (1000 * 60 * 60 * 24);
  }
  return Math.round(total / (periods.length - 1));
}

export function getAveragePeriodLength(log) {
  if (!log.period || log.period.length === 0) return null;
  const flows = log.period.filter(p => p.flow).map(p => p.flow);
  if (flows.length === 0) return null;
  return Math.round(flows.reduce((a, b) => a + b, 0) / flows.length);
}
