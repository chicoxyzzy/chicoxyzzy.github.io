---
name: personal-site-craft
description: Polish static personal websites and portfolio/CV sites. Use when improving a personal site, terminal-style homepage, localized static pages, social preview cards, SEO metadata, JSON-LD structured data, robots/sitemap/llms files, accessibility of visual effects, professional profile wording, project descriptions, or an HTML-to-PDF CV workflow.
---

# Personal Site Craft

Use this skill to keep a personal website crisp, discoverable, accessible, and consistent across human pages, social previews, search metadata, agent-readable summaries, and CV outputs.

## Workflow

1. Identify the source of truth before editing.
   - Prefer source templates/scripts over generated HTML.
   - For localized static pages, edit the generator or locale table, then regenerate.
   - For social preview images, edit the vector/source asset and regenerate the raster output.

2. Keep content layers consistent.
   - Main page, localized pages, CV, `llms.txt`, JSON-LD, terminal copy, and retro/easter-egg copy should describe the same person and projects.
   - Let playful surfaces be playful, but keep professional metadata and CV copy direct.
   - After changing project/profile wording, search for old wording across all generated and source files.

3. Validate in code and in a browser.
   - Run local metadata/schema checks when present.
   - Use browser screenshots or DOM checks after frontend changes, especially for mobile, language variants, social preview assets, and high-motion/visual-effect surfaces.
   - Check for horizontal overflow on mobile and text clipping in buttons, project rows, terminal UI, and CV.

## References

Read only what the task needs:

- `references/wording.md`: profile, project, terminal, retro, and CV wording style.
- `references/seo-social-preview.md`: SEO, Open Graph, Twitter cards, JSON-LD, sitemap, robots, `llms.txt`, and metadata validation.
- `references/i18n.md`: static localization, hreflang, language detection, and avoiding mechanical translations.
- `references/a11y.md`: accessibility practices for visual, terminal, WebGL/canvas, theme, and retro UI.
- `references/cv-html-pdf.md`: HTML CV source of truth and PDF generation workflow.

## Operating Rules

- Preserve user-authored changes. Inspect `git status` and diffs before broad edits.
- Do not add SEO theater. Prefer accurate structured data and visible content over keyword stuffing.
- Do not hide important profile data only in JSON-LD; structured data must reflect visible page content.
- Do not make generated files the only place a change lives if a generator owns them.
- Keep skill-driven edits scoped. Avoid unrelated redesigns, palette churn, or refactors unless the task asks for them.
