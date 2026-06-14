# SEO And Social Preview

## Baseline Metadata

A polished static personal site should have:

- unique `<title>` and meta description;
- canonical URL;
- robots meta allowing indexing and large image previews;
- favicon SVG/PNG and Apple touch icon;
- Open Graph title, description, URL, type, site name, locale, image, dimensions, MIME type, and alt text;
- Twitter/X `summary_large_image` tags;
- `robots.txt` with sitemap URL;
- `sitemap.xml` with canonical public pages;
- `llms.txt` and optionally `agents.txt` when the user wants agent-readable summaries.

Use absolute production URLs in OG/Twitter image tags.

## Structured Data

Prefer JSON-LD with an `@graph` for personal sites:

- `WebSite` for the domain;
- `ProfilePage` for the main page;
- `Person` for the site owner;
- `ImageObject` for the social preview;
- `SoftwareSourceCode` for code projects with public repos.

Connect nodes with stable `@id` values, for example:

- `https://example.com/#website`
- `https://example.com/#profile-page`
- `https://example.com/#person`
- `https://example.com/#project-name`

Structured data must match visible content. Do not invent credentials, employers, contact details, ratings, or claims.

## Social Preview Images

Use a source asset such as `og-image.svg` and regenerate the PNG. Keep the final image:

- 1200 x 630;
- readable at small sizes;
- not overly bottom-heavy after removing footer/domain text;
- aligned to a clear grid;
- with no tiny text that is essential to understand the card.

After editing, open or view the generated PNG.

## Validation

Add a local metadata check script when the project has enough metadata to regress. It should verify:

- canonical URLs;
- `hreflang` links;
- OG/Twitter image URLs and image dimensions;
- valid JSON-LD;
- required graph node types;
- project `SoftwareSourceCode` nodes;
- presence of `robots.txt`, `sitemap.xml`, favicon assets, and `llms.txt`.

Do not make validators too English-centric; CJK descriptions have fewer characters for the same information density.

## Search Expectations

Do not promise a Google "card". Search engines choose snippets and rich results. The site can provide strong signals, but display is not guaranteed. Social cards are controlled by OG/Twitter metadata and each platform's cache.
