const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureKillaNikkei() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const outDir = '/workspace/demos/captures/killa-nikkei/screenshots';
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Capturing Killa Nikkei (dismissing popup)...');

  try {
    await page.goto('https://www.killanikkei.com/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Dismiss any popup/modal by clicking close button or pressing Escape
    try {
      // Try clicking any close button
      const closeBtn = await page.$('[aria-label="Close"], .close, .modal-close, button:has-text("×"), button:has-text("Close")');
      if (closeBtn) {
        await closeBtn.click();
        console.log('  ✓ Clicked close button');
        await page.waitForTimeout(500);
      }
    } catch (e) {}

    // Press Escape to close any modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Inject CSS to hide any remaining modals/overlays
    await page.addStyleTag({
      content: `
        [role="dialog"], .modal, .popup, .overlay, 
        [class*="modal"], [class*="popup"], [class*="overlay"],
        [class*="Modal"], [class*="Popup"], [class*="Overlay"],
        div[style*="position: fixed"][style*="z-index"],
        .ReactModal__Overlay, .ReactModal__Content {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `
    });
    await page.waitForTimeout(500);

    // Scroll to trigger lazy loading
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < scrollHeight; y += 500) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Full page screenshot
    await page.screenshot({ path: path.join(outDir, 'fullpage.png'), fullPage: true });
    console.log('  ✓ fullpage.png');

    // Viewport screenshots
    for (let i = 0; i < 6; i++) {
      const scrollY = i * 900;
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outDir, `viewport-${i}.png`) });
      console.log(`  ✓ viewport-${i}.png (scroll: ${scrollY}px)`);
    }

  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }

  await browser.close();
}

async function captureBurgerLab() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const outDir = '/workspace/demos/captures/burger-lab/screenshots';
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Capturing Burger Lab...');

  try {
    await page.goto('https://burgerlabbar.com/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Scroll to trigger lazy loading
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < scrollHeight; y += 500) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    await page.screenshot({ path: path.join(outDir, 'fullpage.png'), fullPage: true });
    console.log('  ✓ fullpage.png');

    for (let i = 0; i < 6; i++) {
      const scrollY = i * 900;
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outDir, `viewport-${i}.png`) });
      console.log(`  ✓ viewport-${i}.png (scroll: ${scrollY}px)`);
    }

  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }

  await browser.close();
}

async function captureDasks() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const outDir = '/workspace/demos/captures/dasks/screenshots';
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Capturing Dasks...');

  try {
    await page.goto('https://www.dasks.com/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < scrollHeight; y += 500) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    await page.screenshot({ path: path.join(outDir, 'fullpage.png'), fullPage: true });
    console.log('  ✓ fullpage.png');

    for (let i = 0; i < 6; i++) {
      const scrollY = i * 900;
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outDir, `viewport-${i}.png`) });
      console.log(`  ✓ viewport-${i}.png (scroll: ${scrollY}px)`);
    }

  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }

  await browser.close();
}

async function main() {
  await captureKillaNikkei();
  await captureBurgerLab();
  await captureDasks();
  console.log('\nDone.');
}

main().catch(console.error);
