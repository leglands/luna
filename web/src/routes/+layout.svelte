<script>
  import { onMount } from 'svelte';
  import { _, locale } from 'svelte-i18n';
  import { browser } from '$app/environment';
  import { setupI18n, detectLocale, setLocale, ALL_LOCALES } from '$lib/i18n.js';
  setupI18n();

  onMount(() => {
    document.documentElement.setAttribute('data-app', 'luna');
    function applyTheme() {
      const s = localStorage.getItem('life-theme');
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', s || (dark ? 'dark' : 'light'));
    }
    applyTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  });

  const BASE_URL = 'https://luna.macaron-software.com';

  const SEO_TITLE = {
    fr: 'Luna — Ton cycle, compris',
    en: 'Luna — Your cycle, understood',
    es: 'Luna — Tu ciclo, comprendido',
    de: 'Luna — Dein Zyklus, verstanden',
    it: 'Luna — Il tuo ciclo, capito',
    pt: 'Luna — O teu ciclo, compreendido',
    nl: 'Luna — Jouw cyclus, begrepen',
    pl: 'Luna — Twój cykl, zrozumiany',
    zh: 'Luna — 了解您的月经周期',
    ja: 'Luna — あなたのサイクルを理解する',
    ko: 'Luna — 당신의 사이클을 이해하세요',
    ar: 'Luna — افهمي دورتك الشهرية',
    ru: 'Luna — Поймите свой менструальный цикл',
    hi: 'Luna — अपने मासिक धर्म चक्र को समझें',
    tr: 'Luna — Adet döngünüzü anlayın',
    uk: 'Luna — Зрозумійте свій менструальний цикл',
  };

  const SEO_DESC = {
    fr: 'Luna — Suis ton cycle menstruel, comprends ton corps et prédis ta prochaine période. Privé, chiffré, sans données envoyées.',
    en: 'Luna — Track your menstrual cycle, understand your body and predict your next period. Private, encrypted, zero data sent.',
    es: 'Luna — Sigue tu ciclo menstrual, comprende tu cuerpo y predice tu próximo período. Privado y cifrado.',
    de: 'Luna — Verfolge deinen Menstruationszyklus, verstehe deinen Körper und sage deine nächste Periode vorher. Privat und verschlüsselt.',
    it: 'Luna — Traccia il tuo ciclo mestruale, capisce il tuo corpo e prevedi il prossimo ciclo. Privato e cifrato.',
    pt: 'Luna — Acompanha o teu ciclo menstrual, compreende o teu corpo e prevê o teu próximo período. Privado e cifrado.',
    zh: 'Luna — 追踪您的月经周期，了解您的身体，预测下次月经。私密、加密、零数据发送。',
    ja: 'Luna — 月経周期を記録し、体を理解し、次の生理を予測します。プライベート、暗号化済み。',
    ko: 'Luna — 생리 주기를 추적하고, 몸을 이해하고, 다음 생리를 예측하세요. 프라이빗, 암호화.',
    ar: 'Luna — تتبعي دورتك الشهرية، تفهمي جسمك وتوقعي دورتك التالية. خاص ومشفر.',
    ru: 'Luna — Отслеживайте менструальный цикл, понимайте свое тело и предсказывайте следующие месячные. Конфиденциально.',
    hi: 'Luna — मासिक धर्म चक्र को ट्रैक करें, शरीर को समझें और अगले मासिक धर्म की भविष्यवाणी करें।',
    tr: 'Luna — Adet döngünüzü takip edin, vücudunuzu anlayın ve bir sonraki döneminizi tahmin edin.',
    uk: 'Luna — Відстежуйте менструальний цикл, розумійте своє тіло та передбачайте наступні місячні.',
  };

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Luna',
    description: SEO_DESC['en'],
    url: BASE_URL,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android, Web',
    inLanguage: ALL_LOCALES,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'Macaron Software', url: 'https://macaron-software.com' },
  });

  onMount(() => {
    const detected = detectLocale();
    setLocale(detected);
  });

  let { children } = $props();
</script>

<svelte:head>
  <title>{SEO_TITLE[$locale ?? 'en'] ?? SEO_TITLE['en']}</title>
  <meta name="description" content={SEO_DESC[$locale ?? 'en'] ?? SEO_DESC['en']} />
  <link rel="canonical" href={BASE_URL} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={BASE_URL} />
  <meta property="og:site_name" content="Luna" />
  <meta property="og:title" content={SEO_TITLE[$locale ?? 'en'] ?? SEO_TITLE['en']} />
  <meta property="og:description" content={SEO_DESC[$locale ?? 'en'] ?? SEO_DESC['en']} />
  <meta property="og:image" content="{BASE_URL}/og-image.png" />
  <meta property="og:locale" content={($locale ?? 'en').replace('-', '_')} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SEO_TITLE[$locale ?? 'en'] ?? SEO_TITLE['en']} />
  <meta name="twitter:description" content={SEO_DESC[$locale ?? 'en'] ?? SEO_DESC['en']} />
  <meta name="twitter:image" content="{BASE_URL}/og-image.png" />
  {#each ALL_LOCALES as lang}
    <link rel="alternate" hreflang={lang} href={BASE_URL} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={BASE_URL} />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

{@render children()}

<style>
  :global(body) { background: var(--c-surface-container, #F2F2F5); }
  /* pages inside already have max-width: 390px; add phone frame on desktop */
  :global(.screen) {
    max-width: 390px;
    margin: 0 auto;
  }
  @media (min-width: 420px) {
    :global(.screen) {
      box-shadow: 0 0 0 1px var(--c-border, #e5e7eb), 0 8px 40px rgba(0,0,0,0.06);
      min-height: 100dvh;
    }
  }
</style>
