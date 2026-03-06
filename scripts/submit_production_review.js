#!/usr/bin/env node
/**
 * submit_production_review.js
 *
 * Navigates to Play Console publishing overview and clicks
 * "Envoyer X modifications pour examen" to submit production release.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const DEVELOPER_ID = '6295830866613067582';
const APP_ID = '4973061748192418870';
const PUBLISHING_URL = `https://play.google.com/console/u/0/developers/${DEVELOPER_ID}/app/${APP_ID}/publishing`;

const CHROME_PROFILE = path.join(os.homedir(), 'Library/Application Support/Google/Chrome/Default');
const HEADLESS = process.argv.includes('--headless');

(async () => {
  const tmpProfile = path.join(os.tmpdir(), 'luna-play-chrome-session');
  fs.mkdirSync(tmpProfile, { recursive: true });

  if (fs.existsSync(CHROME_PROFILE)) {
    console.log('Copying Chrome session...');
    for (const f of ['Cookies', 'Login Data', 'Local State', 'Preferences', 'Web Data']) {
      const src = path.join(CHROME_PROFILE, f);
      if (fs.existsSync(src)) {
        try { fs.copyFileSync(src, path.join(tmpProfile, f)); } catch (_) {}
      }
    }
    const lsSrc = path.join(CHROME_PROFILE, 'Local Storage');
    const lsDst = path.join(tmpProfile, 'Local Storage');
    if (fs.existsSync(lsSrc) && !fs.existsSync(lsDst)) {
      spawnSync('cp', ['-r', lsSrc, lsDst]);
    }
  }

  const context = await chromium.launchPersistentContext(tmpProfile, {
    channel: 'chrome',
    headless: HEADLESS,
    args: [
      '--no-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
    viewport: { width: 1400, height: 900 },
    slowMo: 150,
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to publishing overview...');
    await page.goto(PUBLISHING_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    console.log('Page title:', await page.title());
    console.log('URL:', page.url());

    // Look for the submit button
    const submitSelectors = [
      'button:has-text("Envoyer")',
      'button:has-text("modifications pour examen")',
      '[aria-label*="examen"]',
      'button:has-text("Send")',
      'button:has-text("modifications")',
    ];

    let submitBtn = null;
    for (const sel of submitSelectors) {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
        submitBtn = btn;
        const txt = await btn.textContent();
        console.log(`Found submit button: "${txt.trim()}" (selector: ${sel})`);
        break;
      }
    }

    if (!submitBtn) {
      // Dump visible buttons for debug
      const buttons = await page.locator('button').all();
      console.log('Submit button not found. Visible buttons:');
      for (const b of buttons.slice(0, 20)) {
        const txt = await b.textContent().catch(() => '');
        if (txt.trim()) console.log(' -', txt.trim());
      }
      await page.screenshot({ path: '/tmp/play_overview_debug.png' });
      console.log('Screenshot saved: /tmp/play_overview_debug.png');
      await context.close();
      process.exit(1);
    }

    console.log('Clicking submit button...');
    await submitBtn.click();
    await page.waitForTimeout(3000);

    // Handle confirmation dialog
    const dialogSelectors = [
      'button:has-text("Envoyer pour examen")',
      'button:has-text("Confirmer")',
      'button:has-text("Envoyer")',
      '[role="dialog"] button:has-text("Envoyer")',
      'mat-dialog-container button:has-text("Envoyer")',
    ];

    let confirmed = false;
    for (const sel of dialogSelectors) {
      const btn = page.locator(sel).last();
      if (await btn.isVisible({ timeout: 4000 }).catch(() => false)) {
        const txt = await btn.textContent();
        console.log(`Found confirm button: "${txt.trim()}"`);
        await btn.click();
        confirmed = true;
        break;
      }
    }

    if (!confirmed) {
      console.log('ℹNo confirmation dialog appeared — checking if already submitted...');
      await page.screenshot({ path: '/tmp/play_after_click.png' });
      console.log('Screenshot: /tmp/play_after_click.png');
    }

    await page.waitForTimeout(5000);
    console.log('Final URL:', page.url());

    const body = await page.locator('body').textContent().catch(() => '');
    if (body.includes('examen') || body.includes('review') || body.includes('soumis') || body.includes('submitted')) {
      console.log('SUCCESS: Release submitted for review!');
    } else {
      console.log('ℹStatus unclear — check screenshot');
    }

    await page.screenshot({ path: '/tmp/play_final_state.png' });
    console.log('Final screenshot: /tmp/play_final_state.png');

  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: '/tmp/play_error.png' }).catch(() => {});
  } finally {
    await context.close();
  }
})();