const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('playwright');

const STABLE_PDF_DATE = "D:20200101000000+00'00'";

function normalizePdfMetadata(filePath){
  const source = fs.readFileSync(filePath, 'latin1');
  const normalized = source
    .replace(/\/CreationDate \(D:\d{14}[+-]\d{2}'\d{2}'\)/, `/CreationDate (${STABLE_PDF_DATE})`)
    .replace(/\/ModDate \(D:\d{14}[+-]\d{2}'\d{2}'\)/, `/ModDate (${STABLE_PDF_DATE})`);
  fs.writeFileSync(filePath, normalized, 'latin1');
}

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
  normalizePdfMetadata(output);
  console.log(`Generated ${path.relative(root, output)} from ${path.relative(root, source)}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
