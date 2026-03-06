#!/usr/bin/env node
/**
 * upload_aab_to_play.js
 *
 * Uploads app-release.aab to Play Store internal testing track via CDP.
 * Then optionally promotes through: internal → closed (alpha) → open (beta) → production
 *
 * Usage:
 * node scripts/upload_aab_to_play.js # upload to internal only
 * node scripts/upload_aab_to_play.js --promote-all # upload + promote to prod
 * node scripts/upload_aab_to_play.js --track internal # specify track
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const CDP_PORT = 18800;
const DEVELOPER_ID = '6295830866613067582';
const APP_ID = '4973061748192418870';
const AAB_PATH = path.join(__dirname, '..', 'android-app', 'app', 'build', 'outputs', 'bundle', 'release', 'app-release.aab');

const BASE_URL = `https://play.google.com/console/u/0/developers/${DEVELOPER_ID}/app/${APP_ID}`;
const TRACK_URLS = {
  internal: `${BASE_URL}/tracks/internal`,
  alpha: `${BASE_URL}/tracks/closed`,
  beta: `${BASE_URL}/tracks/open`,
  production: `${BASE_URL}/tracks/production`,
};

const args = process.argv.slice(2);
const PROMOTE_ALL = args.includes('--promote-all');
const TRACK = args.includes('--track') ? args[args.indexOf('--track') + 1] : 'internal';

const RELEASE_NOTES = {
  'en-US': 'Initial release of LUNA - Cycle & Wellness. Track your cycle, symptoms, mood and energy. 100% private — all data stored locally on your device.',
  'fr-FR': 'Première version de LUNA - Cycle & Bien-être. Suivez votre cycle, symptômes, humeur et énergie. 100% privé — toutes les données stockées localement.',
  'de-DE': 'Erste Version von LUNA - Zyklus & Wohlbefinden. Verfolgen Sie Ihren Zyklus, Symptome, Stimmung und Energie. 100% privat — alle Daten lokal gespeichert.',
  'es-ES': 'Primera versión de LUNA - Ciclo y Bienestar. Rastrea tu ciclo, síntomas, estado de ánimo y energía. 100% privado — todos los datos almacenados localmente.',
  'it-IT': 'Prima versione di LUNA - Ciclo e Benessere. Tieni traccia del tuo ciclo, sintomi, umore ed energia. 100% privato — tutti i dati memorizzati localmente.',
};

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function uploadToTrack(page, trackName) {
  const url = TRACK_URLS[trackName] || TRACK_URLS.internal;
  console.log(`\nNavigating to ${trackName} track...`);
  await page.goto(url, { waitUntil: 'load', timeout: 40000 });
  await sleep(3000);

  // Click "Create new release" button
  const createBtn = page.locator('button:has-text("Create new release"), button:has-text("Créer une version"), a:has-text("Create new release"), a:has-text("Créer une version")').first();
  if (await createBtn.count() === 0) {
    console.log(' "Create new release" button not found');
    // Try screenshot for debugging
    await page.screenshot({ path: '/tmp/play_track_debug.png' });
    console.log(' Debug screenshot: /tmp/play_track_debug.png');
    return false;
  }
  await createBtn.click();
  await sleep(3000);
  console.log(' Clicked "Create new release"');

  // Upload AAB via file chooser
  console.log(' Uploading AAB...');
  const uploadArea = page.locator('[class*="upload"], input[type="file"], [drag-and-drop]').first();

  // Try the "Browse files" or upload button
  const browseBtn = page.locator('button:has-text("Browse files"), button:has-text("Parcourir"), label[for*="file"], [data-testid*="upload"]').first();

  try {
    const [chooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 8000 }),
      browseBtn.count() > 0 ? browseBtn.click() : uploadArea.click(),
    ]);
    await chooser.setFiles(AAB_PATH);
    console.log(' AAB file selected');
  } catch (e) {
    // Try finding any upload element on the page
    console.log(` First upload attempt failed: ${e.message.split('\n')[0]}`);
    console.log(' Trying alternative upload method...');

    const allInputs = page.locator('input[type="file"]');
    const count = await allInputs.count();
    console.log(` Found ${count} file inputs`);
    if (count > 0) {
      await allInputs.first().setInputFiles(AAB_PATH);
      console.log(' AAB uploaded via direct input');
    } else {
      await page.screenshot({ path: '/tmp/play_upload_debug.png' });
      console.log(' Debug screenshot: /tmp/play_upload_debug.png');
      return false;
    }
  }

  // Wait for upload to complete (progress bar disappears)
  console.log(' Waiting for upload to complete...');
  await sleep(5000);

  // Wait for the AAB to be processed (may show version code)
  for (let i = 0; i < 30; i++) {
    const processing = await page.locator('[class*="progress"], [class*="uploading"], [aria-label*="upload"]').count();
    if (processing === 0) break;
    await sleep(2000);
    process.stdout.write('.');
  }
  console.log('\n Upload complete');

  // Fill release notes (at least en-US)
  console.log(' Adding release notes...');
  const notesArea = page.locator('textarea[placeholder*="release notes"], textarea[placeholder*="notes de version"], [class*="release-notes"] textarea').first();
  if (await notesArea.count() > 0) {
    await notesArea.fill(RELEASE_NOTES['en-US']);
    console.log(' Release notes filled');
  } else {
    console.log(' Release notes field not found, skipping');
  }

  // Click "Save" / "Next" / "Review release"
  const saveBtn = page.locator('button:has-text("Save"), button:has-text("Enregistrer"), button:has-text("Next"), button:has-text("Suivant")').first();
  if (await saveBtn.count() > 0) {
    await saveBtn.click();
    await sleep(2000);
    console.log(' Saved');
  }

  // "Review release" → "Start rollout"
  const reviewBtn = page.locator('button:has-text("Review release"), button:has-text("Examiner la version")').first();
  if (await reviewBtn.count() > 0) {
    await reviewBtn.click();
    await sleep(2000);
    console.log(' Reviewing release');
  }

  const rolloutBtn = page.locator('button:has-text("Start rollout"), button:has-text("Lancer le déploiement"), button:has-text("Send for review"), button:has-text("Envoyer pour examen")').first();
  if (await rolloutBtn.count() > 0) {
    const btnText = await rolloutBtn.textContent();
    await rolloutBtn.click();
    await sleep(2000);
    // Confirm dialog if present
    const confirmBtn = page.locator('[role="dialog"] button:has-text("Rollout"), [role="dialog"] button:has-text("Déployer"), [role="dialog"] button:has-text("OK")').first();
    if (await confirmBtn.count() > 0) await confirmBtn.click();
    console.log(` ${btnText?.trim() || 'Submitted'}`);
  }

  await sleep(2000);
  console.log(` ${trackName} track: release submitted!`);
  return true;
}

(async () => {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║ LUNA — Upload AAB to Play Store ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  if (!fs.existsSync(AAB_PATH)) {
    console.error(`AAB not found: ${AAB_PATH}`);
    process.exit(1);
  }
  const aabSize = (fs.statSync(AAB_PATH).size / 1024 / 1024).toFixed(1);
  console.log(`AAB: ${AAB_PATH} (${aabSize} MB)`);

  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const context = browser.contexts()[0];
  let page = context.pages().find(p => p.url().includes('play.google.com'))
           || context.pages()[0];

  const tracks = PROMOTE_ALL
    ? ['internal', 'alpha', 'beta', 'production']
    : [TRACK];

  let success = false;
  for (const track of tracks) {
    success = await uploadToTrack(page, track);
    if (!success) {
      console.log(`\nFailed at ${track} track. Stopping.`);
      break;
    }
    if (tracks.indexOf(track) < tracks.length - 1) {
      console.log('\nWaiting 30s before next track...');
      await sleep(30000);
    }
  }

  if (success) {
    console.log('\nDone! Check Play Console for review status.');
    console.log(` ${BASE_URL}/tracks/internal`);
  }

  await browser.close();
})();