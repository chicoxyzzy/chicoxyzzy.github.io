const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const baseUrl = "https://sergey.works";
const pages = [
  { file: "index.html", url: `${baseUrl}/`, lang: "en", canonical: `${baseUrl}/` },
  { file: "es/index.html", url: `${baseUrl}/es/`, lang: "es", canonical: `${baseUrl}/es/` },
  { file: "ca/index.html", url: `${baseUrl}/ca/`, lang: "ca", canonical: `${baseUrl}/ca/` },
  { file: "zh/index.html", url: `${baseUrl}/zh/`, lang: "zh-Hans", canonical: `${baseUrl}/zh/` },
  { file: "ru/index.html", url: `${baseUrl}/ru/`, lang: "ru", canonical: `${baseUrl}/ru/` },
];

const requiredGraphTypes = ["WebSite", "ProfilePage", "Person", "ImageObject"];
const requiredProjects = ["Hecate", "Cynic", "Pragmatist", "tc39-mcp"];

const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function attr(html, selector, attrName) {
  const tag = html.match(selector);
  if (!tag) return "";
  const value = tag[0].match(new RegExp(`${attrName}="([^"]*)"`));
  return value ? value[1] : "";
}

function metaContent(html, key, value) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return attr(html, new RegExp(`<meta\\s+${key}="${escapedValue}"[^>]*>`), "content");
}

function linkHref(html, rel) {
  const escapedRel = rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return attr(html, new RegExp(`<link\\s+rel="${escapedRel}"[^>]*>`), "href");
}

function jsonLd(html, file) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) {
    fail(file, "missing JSON-LD script");
    return null;
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    fail(file, `invalid JSON-LD: ${error.message}`);
    return null;
  }
}

function pngSize(file) {
  const bytes = fs.readFileSync(path.join(root, file));
  if (bytes.toString("ascii", 1, 4) !== "PNG") return null;
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

function minDescriptionLength(lang) {
  return lang.startsWith("zh") ? 24 : 80;
}

function checkPage(page) {
  const html = read(page.file);
  const documentLang = attr(html, /<html[^>]*>/, "lang");
  if (documentLang !== page.lang) fail(page.file, `expected html lang ${page.lang}, got ${documentLang || "missing"}`);

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
  if (!title) fail(page.file, "missing title");

  const description = metaContent(html, "name", "description");
  const minimumDescriptionLength = minDescriptionLength(page.lang);
  if (description.length < minimumDescriptionLength) {
    fail(page.file, `meta description is too short (${description.length}/${minimumDescriptionLength})`);
  }

  const canonical = linkHref(html, "canonical");
  if (canonical !== page.canonical) fail(page.file, `expected canonical ${page.canonical}, got ${canonical || "missing"}`);

  const ogUrl = metaContent(html, "property", "og:url");
  if (ogUrl !== page.url) fail(page.file, `expected og:url ${page.url}, got ${ogUrl || "missing"}`);

  const ogImage = metaContent(html, "property", "og:image");
  const twitterImage = metaContent(html, "name", "twitter:image");
  if (ogImage !== `${baseUrl}/og-image.png`) fail(page.file, "og:image must point to absolute og-image.png");
  if (twitterImage !== `${baseUrl}/og-image.png`) fail(page.file, "twitter:image must point to absolute og-image.png");

  for (const hreflang of ["en", "es", "ca", "zh-Hans", "ru", "x-default"]) {
    if (!html.includes(`hreflang="${hreflang}"`)) fail(page.file, `missing hreflang ${hreflang}`);
  }

  const data = jsonLd(html, page.file);
  const graph = data && Array.isArray(data["@graph"]) ? data["@graph"] : [];
  if (!graph.length) fail(page.file, "JSON-LD must use @graph");

  for (const type of requiredGraphTypes) {
    if (!graph.some(node => node["@type"] === type)) fail(page.file, `missing JSON-LD ${type}`);
  }

  const profilePage = graph.find(node => node["@type"] === "ProfilePage");
  if (profilePage && profilePage.url !== page.url) fail(page.file, `ProfilePage url should be ${page.url}`);
  if (profilePage && !profilePage.mainEntity?.["@id"]) fail(page.file, "ProfilePage missing mainEntity @id");

  const person = graph.find(node => node["@type"] === "Person");
  if (person && !Array.isArray(person.sameAs)) fail(page.file, "Person sameAs should be an array");

  const software = graph.filter(node => node["@type"] === "SoftwareSourceCode");
  for (const project of requiredProjects) {
    if (!software.some(node => node.name === project)) fail(page.file, `missing SoftwareSourceCode for ${project}`);
  }
}

for (const page of pages) checkPage(page);

const imageSize = pngSize("og-image.png");
if (!imageSize) {
  fail("og-image.png", "not a valid PNG");
} else if (imageSize.width !== 1200 || imageSize.height !== 630) {
  fail("og-image.png", `expected 1200x630, got ${imageSize.width}x${imageSize.height}`);
}

for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "agents.txt", "favicon.svg", "favicon.png", "apple-touch-icon.png"]) {
  if (!fs.existsSync(path.join(root, file))) fail(file, "missing");
}

if (failures.length) {
  console.error(`Metadata check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Metadata check passed for ${pages.length} pages.`);
