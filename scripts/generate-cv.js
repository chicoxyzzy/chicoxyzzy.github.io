const path = require('node:path');
const { chromium } = require('playwright');

async function main(){
  const root = path.resolve(__dirname, '..');
  const source = path.join(root, 'cv.html');
  const output = path.join(root, 'downloads/Sergey-Rubanov-CV.pdf');

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1240, height: 1754 },
    deviceScaleFactor: 1
  });

  await page.goto(`file://${source}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    scale: 0.94
  });

  await browser.close();
  console.log(`Generated ${path.relative(root, output)} from ${path.relative(root, source)}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
