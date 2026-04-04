<script>
  import { onMount } from 'svelte';
  import { _, locale } from 'svelte-i18n';
  import { browser } from '$app/environment';
  import { setupI18n, detectLocale, setLocale, ALL_LOCALES } from '$lib/i18n.js';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import TabBar from '$ds/TabBar.svelte';
  import DSPebbleDrawer from '$ds/DSPebbleDrawer.svelte';
  import { DSContactModal } from '$ds/index.js';
  setupI18n();

  const NAV_TABS = [
    { id: 'home',      label: 'Accueil',    icon: 'home'      },
    { id: 'calendar',  label: 'Calendrier', icon: 'calendar'  },
    { id: 'insights',  label: 'Insights',   icon: 'bar-chart' },
    { id: 'settings',  label: 'Réglages',   icon: 'settings'  },
  ];

  let width = $state(0);
  let contactOpen = $state(false);

  const activeTab = $derived(
    $page.url.pathname === '/' ? 'home' :
    $page.url.pathname.startsWith('/calendar') ? 'calendar' :
    $page.url.pathname.startsWith('/insights') ? 'insights' :
    $page.url.pathname.startsWith('/settings') ? 'settings' : 'home'
  );

  const showNav = $derived($page.url.pathname !== '/onboarding' && !$page.url.pathname.startsWith('/onboarding'));

  function navTo(id) {
    goto('/' + (id === 'home' ? '' : id));
  }

  onMount(() => {
    document.documentElement.setAttribute('data-app', 'luna');
    function applyTheme() {
      const s = localStorage.getItem('life-theme');
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', s || (dark ? 'dark' : 'light'));
    }
    applyTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    width = window.innerWidth;
    const onResize = () => { width = window.innerWidth; };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
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

<div class="app-shell">
  <!-- ── Left Sidebar (≥768px) ───────────────────────────────────────── -->
  {#if showNav}
    <aside class="sidebar" aria-label="Navigation principale">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--c-brand)" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          <span class="sidebar-app-name">Luna</span>
        </div>
      </div>
      <nav class="sidebar-nav" aria-label="Navigation">
        {#each NAV_TABS as tab}
          <a
            href={'/' + (tab.id === 'home' ? '' : tab.id)}
            class="sidebar-item"
            class:active={activeTab === tab.id}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {#if tab.id === 'home'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            {:else if tab.id === 'calendar'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {:else if tab.id === 'insights'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            {:else if tab.id === 'settings'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            {/if}
            <span>{tab.label}</span>
          </a>
        {/each}
      </nav>
      <div class="sidebar-contact">
        <button class="sidebar-contact-btn" onclick={() => contactOpen = true} aria-label="Nous contacter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Nous contacter</span>
        </button>
      </div>
    </aside>
  {/if}

  <!-- ── Main content area ──────────────────────────────────────────── -->
  <div class="main-area" class:has-sidebar={showNav}>
    <!-- Mobile top-right DSPebbleDrawer (<768px) -->
    {#if showNav}
      <div class="mobile-drawer-anchor">
        <DSPebbleDrawer
          brand="luna"
          items={NAV_TABS}
          activeId={activeTab}
          onselect={navTo}
        />
      </div>
    {/if}

    {@render children()}

    <!-- Bottom TabBar (<768px) -->
    {#if showNav}
      <div class="bottom-nav-wrap">
        <TabBar
          tabs={NAV_TABS}
          activeTab={activeTab}
          brand="luna"
          onchange={navTo}
        />
      </div>
    {/if}
  </div>
</div>

<DSContactModal open={contactOpen} appName="Luna" brand="luna" apiEndpoint="https://api.macaron-software.com/api/contact" onclose={() => contactOpen = false}
  labels={{
    title: $_('contact.title'),
    close: $_('contact.close'),
    back: $_('contact.back'),
    send: $_('contact.send'),
    messageAriaLabel: $_('contact.messageAriaLabel'),
    sentTitle: $_('contact.sentTitle'),
    sentBody: $_('contact.sentBody'),
    typeImprovement: $_('contact.typeImprovement'),
    typeFeedback: $_('contact.typeFeedback'),
    typeBug: $_('contact.typeBug'),
    placeholderImprovement: $_('contact.placeholderImprovement'),
    placeholderFeedback: $_('contact.placeholderFeedback'),
    placeholderBug: $_('contact.placeholderBug'),
  }}
/>

<style>
  :global(body) { background: var(--c-surface-container, #F2F2F5); }

  /* ── App shell ────────────────────────────────────────────────────── */
  .app-shell {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
    min-height: 100dvh;
    position: relative;
  }

  /* ── Sidebar ──────────────────────────────────────────────────────── */
  .sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    height: 100dvh;
    background: var(--c-surface, #fff);
    border-right: 1px solid var(--c-border, #e5e7eb);
    flex-direction: column;
    z-index: 100;
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    .sidebar { display: flex; }
  }

  .sidebar-header {
    padding: 20px 16px 12px;
    border-bottom: 1px solid var(--c-border, #f3f4f6);
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sidebar-app-name {
    font-size: 18px;
    font-weight: 700;
    color: var(--c-text, #111827);
    letter-spacing: -0.01em;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 8px 8px;
    gap: 2px;
    flex: 1;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--c-text-secondary, #6b7280);
    text-decoration: none;
    transition: background 0.12s, color 0.12s;
    min-height: 44px;
  }

  .sidebar-item:hover {
    background: color-mix(in srgb, var(--c-brand) 8%, transparent);
    color: var(--c-text, #111827);
  }

  .sidebar-item.active {
    background: color-mix(in srgb, var(--c-brand) 12%, transparent);
    color: var(--c-brand);
    font-weight: 600;
  }

  :global([data-theme="dark"]) .sidebar-item {
    color: #9ca3af;
  }

  :global([data-theme="dark"]) .sidebar-item:hover,
  :global([data-theme="dark"]) .sidebar-item.active {
    background: color-mix(in srgb, var(--c-brand) 18%, transparent);
    color: var(--c-brand);
  }

  .sidebar-item:focus-visible {
    outline: 2px solid var(--c-brand);
    outline-offset: 2px;
  }

  /* ── Main area ────────────────────────────────────────────────────── */
  .main-area {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .main-area.has-sidebar {
      margin-left: 240px;
    }
  }

  /* ── Mobile DSPebbleDrawer anchor (hidden ≥768px) ─────────────────── */
  .mobile-drawer-anchor {
    display: block;
  }

  @media (min-width: 768px) {
    .mobile-drawer-anchor {
      display: none;
    }
  }

  /* ── Bottom TabBar (<768px) ──────────────────────────────────────── */
  .bottom-nav-wrap {
    display: block;
  }

  @media (min-width: 768px) {
    .bottom-nav-wrap {
      display: none;
    }
  }

  /* ── Page-level screen container ─────────────────────────────────── */
  :global(.screen) {
    max-width: 780px;
    width: 100%;
    min-width: 360px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    :global(.screen) {
      max-width: none;
      box-shadow: none;
    }
  }

  @media (min-width: 420px) and (max-width: 767px) {
    :global(.screen) {
      box-shadow: 0 0 0 1px var(--c-border, #e5e7eb), 0 8px 40px rgba(0,0,0,0.06);
      min-height: 100dvh;
    }
  }

  /* ── Wide layout: 2-column split (≥1024px) ───────────────────────── */
  @media (min-width: 1024px) {
    :global(.wide-grid) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6, 24px);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar-item { transition: none; }
  }

  .sidebar-contact {
    padding: 8px 8px 16px;
    border-top: 1px solid var(--c-border, #f3f4f6);
  }
  .sidebar-contact-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    width: 100%;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    color: var(--c-text-secondary, #6b7280);
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    min-height: 44px;
    transition: background 0.12s, color 0.12s;
  }
  .sidebar-contact-btn:hover {
    background: color-mix(in srgb, var(--c-brand) 8%, transparent);
    color: var(--c-brand);
  }
  .sidebar-contact-btn:focus-visible { outline: 2px solid var(--c-brand); outline-offset: 2px; }
</style>
