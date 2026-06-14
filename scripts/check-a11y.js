const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pages = ["index.html", "es/index.html", "ca/index.html", "zh/index.html", "ru/index.html", "cv.html"];
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function attrs(tag) {
  const values = {};
  for (const match of tag.matchAll(/\s([a-zA-Z_:][-a-zA-Z0-9_:.]*)=(?:"([^"]*)"|'([^']*)')/g)) {
    values[match[1]] = match[2] ?? match[3] ?? "";
  }
  return values;
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function idSet(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]));
}

function labelMap(html) {
  const labels = new Map();
  for (const match of html.matchAll(/<label\b([^>]*)>([\s\S]*?)<\/label>/g)) {
    const tagAttrs = attrs(`<label${match[1]}>`);
    if (tagAttrs.for) labels.set(tagAttrs.for, stripTags(match[2]));
  }
  return labels;
}

function hasVisibleName(opening, inner, allIds, labels) {
  const tagAttrs = attrs(opening);
  if (tagAttrs["aria-label"]?.trim()) return true;
  if (tagAttrs["aria-labelledby"]) {
    return tagAttrs["aria-labelledby"].split(/\s+/).some(id => allIds.has(id));
  }
  if (tagAttrs.id && labels.get(tagAttrs.id)) return true;
  if (tagAttrs.alt !== undefined) return true;
  if (tagAttrs.value?.trim()) return true;
  return Boolean(stripTags(inner));
}

function checkAriaReferences(file, html, allIds) {
  for (const match of html.matchAll(/<[^>]+\saria-labelledby="([^"]+)"[^>]*>/g)) {
    const missing = match[1].split(/\s+/).filter(id => !allIds.has(id));
    if (missing.length) fail(file, `aria-labelledby references missing id(s): ${missing.join(", ")}`);
  }

  for (const match of html.matchAll(/<[^>]+\saria-controls="([^"]+)"[^>]*>/g)) {
    if (!allIds.has(match[1])) fail(file, `aria-controls references missing id: ${match[1]}`);
  }
}

function checkControls(file, html, allIds, labels) {
  const paired = [
    ...html.matchAll(/<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/g),
    ...html.matchAll(/<(input|textarea|select)\b([^>]*)>([\s\S]*?)<\/\1>/g),
  ];

  for (const match of paired) {
    const tag = match[1].toLowerCase();
    const opening = `<${match[1]}${match[2]}>`;
    const tagAttrs = attrs(opening);
    if (tag === "a" && !tagAttrs.href) continue;
    if (tag === "input" && tagAttrs.type === "hidden") continue;
    if (!hasVisibleName(opening, match[3] || "", allIds, labels)) {
      fail(file, `control has no accessible name: ${opening.slice(0, 120)}`);
    }
  }
}

function checkHiddenFocus(file, html) {
  for (const match of html.matchAll(/<([a-zA-Z0-9-]+)\b([^>]*)aria-hidden="true"([^>]*)>([\s\S]*?)<\/\1>/g)) {
    const opening = `<${match[1]}${match[2]}${match[3]}>`;
    if (/\sinert(?:\s|>|=)/.test(opening)) continue;
    if (/<(?:a\b[^>]*href=|button\b|input\b|textarea\b|select\b|[^>]+tabindex="(?!-1"))/i.test(match[4])) {
      fail(file, `aria-hidden container has focusable descendants without inert: ${opening.slice(0, 120)}`);
    }
  }
}

function checkLocalizedAssets(file, html) {
  if (!file.includes("/")) return;
  for (const match of html.matchAll(/\s(?:src|href)="([^":#?][^"#]*)/g)) {
    const value = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) continue;
    if (value.startsWith("/") || value.startsWith("mailto:")) continue;
    if (value.startsWith("./") || value.startsWith("../")) continue;
    fail(file, `localized page uses non-root-relative asset/link: ${value}`);
  }
}

function checkLocalFiles(file, html) {
  for (const match of html.matchAll(/\s(?:src|href)="\/?((?:assets|downloads|js)\/[^"#?]+|styles\.css|favicon\.(?:svg|png)|apple-touch-icon\.png|og-image\.png)/g)) {
    const target = match[1];
    if (!fs.existsSync(path.join(root, target))) fail(file, `referenced local file is missing: ${target}`);
  }
}

function checkPage(file) {
  const html = read(file);
  const allIds = idSet(html);
  const labels = labelMap(html);
  checkAriaReferences(file, html, allIds);
  checkControls(file, html, allIds, labels);
  checkHiddenFocus(file, html);
  checkLocalizedAssets(file, html);
  checkLocalFiles(file, html);
}

for (const page of pages) checkPage(page);

if (failures.length) {
  console.error(`Accessibility/static check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Accessibility/static check passed for ${pages.length} pages.`);
