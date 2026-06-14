# HTML CV And PDF

## Source Of Truth

Prefer `cv.html` as the source of truth and generate the PDF from it. This prevents divergence between the site CV and downloadable CV.

The website can link to:

- HTML CV for reading in a browser;
- generated PDF for download.

The CV page itself can include a toolbar with:

- personal website link;
- download PDF;
- print/save button.

Hide the toolbar in print CSS.

## PDF Generation

Use a deterministic browser-based workflow when available, typically Playwright/Chromium:

- load `cv.html`;
- wait for fonts/images;
- print to PDF;
- store PDF under a downloads directory, not cluttering the repository root;
- avoid checking generated PDFs as inputs to the CI diff if the CI job itself creates them.

CI should trigger PDF generation on HTML/CSS/CV asset changes, not on PDF-only changes.

## Print Styling

For print:

- use `@page` with A4 dimensions when targeting a European-style CV;
- remove app/background chrome;
- avoid preserving decorative website backgrounds unless the user explicitly wants that;
- ensure images are aligned and cropped consistently;
- avoid layout shifts between screen and print.

## Content Alignment

Keep CV wording aligned with the main site but more professional:

- no retro jokes;
- no terminal easter eggs;
- project descriptions can be denser;
- contact details should be intentional;
- selected projects should match the public site project set when the user asks for consistency.
