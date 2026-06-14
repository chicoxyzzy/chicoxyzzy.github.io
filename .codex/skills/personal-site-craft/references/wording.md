# Wording

## Profile

Use direct first-page wording that reads like a professional profile, not an auto-biography in the third person. Good patterns:

- "Software engineer and independent researcher working on AI agent infrastructure, the web platform, developer tools, and open source."
- "Works with TC39 and W3C standards where specifications meet browser behavior, runtimes, and developer-facing APIs."

Avoid:

- inflated claims such as "thought leader", "world-class", or "visionary";
- awkward third-person phrasing on the personal homepage;
- duplicated ideas between tagline, summary, and standards paragraph;
- excessive "runtime" repetition;
- over-specific diagnostics/checks wording unless the project is actually about diagnostics.

## Projects

Use a compact `what / features / stack` shape when the site is terminal- or portfolio-like.

Project descriptions should be technical but clean:

- Hecate: local-first console for local/cloud AI models, Hecate Chat, supervised coding-agent sessions, task approvals, usage visibility, OpenTelemetry.
- Cynic: strict-only ECMAScript engine in Zig for non-browser hosts such as edge JavaScript, Workers, and server-side JavaScript.
- Pragmatist: tool for finding, reproducing, and verifying bugs across ECMA-262, TypeScript, and JavaScript engines.
- tc39-mcp: MCP server exposing TC39 specifications as clause-level, SHA-pinned data for agents and developer tools.

Avoid phrases that sounded wrong in this project:

- "agent audit platform" for Pragmatist;
- "model gateways" if the project is broader than routing;
- "checks" as a vague project feature;
- "structured MCP access" when "MCP server that exposes..." is clearer;
- unexplained "next" sections for unreleased projects.

## Playful Surfaces

Retro pages, guestbooks, terminal easter eggs, and fake OS UI can be funny, but should still be personal and comprehensible.

- Keep the joke visible from the UI itself.
- Keep famous-person guestbook messages obviously fake and playful.
- Prefer "coming soon" / "release coming soon" over broken links for unreleased projects.
- Avoid red close-button hover unless the action is destructive.

## CV

CV copy should be denser and less playful than the website.

- Keep email/contact decisions explicit; do not remove or add contact details without user intent.
- Keep CV, main site, and `llms.txt` aligned on profile and project descriptions.
- Use "CV" for English, Spanish, and Catalan; use localized labels where natural, such as Russian "Резюме" and Chinese "简历".
