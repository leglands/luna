/**
 * Life Ecosystem — App Store & Google Play configuration per app
 * Update appStoreUrl / playStoreUrl once apps are published to stores.
 */
export const APP_STORES = {
  luna: {
    name: 'Luna',
    bundleId: 'com.macaron-software.luna',
    appStoreUrl: null,   // TestFlight — update once published
    playStoreUrl: null,
    color: '#C084A0',
    category: 'HealthApplication',
    taglines: {
      fr: 'Ton cycle, compris',
      en: 'Your cycle, understood',
      es: 'Tu ciclo, comprendido',
      de: 'Dein Zyklus, verstanden',
      it: 'Il tuo ciclo, capito',
      pt: 'O teu ciclo, compreendido',
      nl: 'Jouw cyclus, begrepen',
      pl: 'Twój cykl, zrozumiany',
      zh: '了解您的周期',
      ja: 'あなたのサイクルを理解する',
      ko: '당신의 사이클을 이해하세요',
      ar: 'افهمي دورتك الشهرية',
      ru: 'Поймите свой цикл',
      hi: 'अपने चक्र को समझें',
      tr: 'Döngünüzü anlayın',
    },
  },
  aura: {
    name: 'Aura',
    bundleId: 'com.macaron-software.aura',
    appStoreUrl: null,
    playStoreUrl: null,
    color: '#7BA7D4',
    category: 'HealthApplication',
    taglines: {
      fr: 'Ta grossesse, accompagnée',
      en: 'Your pregnancy, supported',
      es: 'Tu embarazo, acompañado',
      de: 'Deine Schwangerschaft, begleitet',
      it: 'La tua gravidanza, accompagnata',
      pt: 'A tua gravidez, acompanhada',
      zh: '您的孕期，贴心陪伴',
      ja: '妊娠中のサポート',
      ar: 'حملك، مدعوم',
      ru: 'Ваша беременность под контролем',
    },
  },
  sienna: {
    name: 'Sienna',
    bundleId: 'com.macaron-software.sienna',
    appStoreUrl: null,   // Prod v0.1 — update once App Store entry live
    playStoreUrl: null,
    color: '#D4956A',
    category: 'LifestyleApplication',
    taglines: {
      fr: 'Bébé & parents, ensemble',
      en: 'Baby & parents, together',
      es: 'Bebé y padres, juntos',
      de: 'Baby & Eltern, gemeinsam',
      it: 'Bebè & genitori, insieme',
      pt: 'Bebé e pais, juntos',
      zh: '宝宝与父母，共同成长',
      ja: 'ベビー＆パパママ、一緒に',
      ar: 'طفلك وعائلتك، معاً',
      ru: 'Малыш и родители вместе',
    },
  },
  alma: {
    name: 'Alma',
    bundleId: 'com.macaron-software.alma',
    appStoreUrl: null,
    playStoreUrl: null,
    color: '#7BA7A7',
    category: 'HealthApplication',
    taglines: {
      fr: 'Ta santé mentale, soutenue',
      en: 'Your mental health, supported',
      es: 'Tu salud mental, apoyada',
      de: 'Deine mentale Gesundheit, unterstützt',
      it: 'La tua salute mentale, supportata',
      pt: 'A tua saúde mental, apoiada',
      zh: '您的心理健康，获得支持',
      ja: 'あなたのメンタルヘルスをサポート',
      ar: 'صحتك النفسية، مدعومة',
      ru: 'Ваше психическое здоровье под поддержкой',
    },
  },
  nova: {
    name: 'Nova',
    bundleId: 'com.macaron-software.nova',
    appStoreUrl: null,
    playStoreUrl: null,
    color: '#6B5BD4',
    category: 'EntertainmentApplication',
    taglines: {
      fr: 'Les événements près de toi',
      en: 'Events near you',
      es: 'Eventos cerca de ti',
      de: 'Events in deiner Nähe',
      it: 'Gli eventi vicino a te',
      pt: 'Eventos perto de ti',
      zh: '您附近的活动',
      ja: 'あなたの近くのイベント',
      ko: '근처 이벤트',
      ar: 'الفعاليات بالقرب منك',
      ru: 'Мероприятия рядом с вами',
    },
  },
  aida: {
    name: 'Aida',
    bundleId: 'com.macaron-software.aida',
    appStoreUrl: null,
    playStoreUrl: null,
    color: '#5B7FD4',
    category: 'FinanceApplication',
    taglines: {
      fr: 'Vos aides sociales calculées',
      en: 'Your social benefits calculated',
      es: 'Tus ayudas sociales calculadas',
      de: 'Ihre Sozialleistungen berechnet',
      it: 'I tuoi sussidi sociali calcolati',
      pt: 'Os seus benefícios sociais calculados',
      zh: '计算您的社会福利',
      ja: '社会給付を計算する',
      ar: 'احسب مزاياك الاجتماعية',
      ru: 'Рассчитайте ваши социальные льготы',
    },
  },
};

/**
 * Get the store tagline for an app in the given locale, falling back to English.
 * @param {keyof APP_STORES} appId
 * @param {string} locale
 * @returns {string}
 */
export function getTagline(appId, locale) {
  const app = APP_STORES[appId];
  if (!app) return '';
  return app.taglines[locale] ?? app.taglines['en'] ?? '';
}
