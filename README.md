# sergey.works

Personal portfolio site for Sergey Rubanov, deployed from
`chicoxyzzy/chicoxyzzy.github.io` to `sergey.works`.

The site is intentionally static: plain HTML, CSS, and browser JavaScript.
There is no build step.

## Local preview

```sh
python3 -m http.server 5177
```

Then open:

```text
http://localhost:5177/index.html
```

Opening `index.html` directly from the filesystem mostly works, but a local
server is better for testing module loading and browser behavior.

## Structure

```text
index.html              Main document, metadata, content, overlays
styles.css              Main screen, 90s mode, terminal, themes, responsive CSS
js/main.js              App entry point
js/shader.js            WebGL CRT background
js/themes.js            Theme palette application
js/tweaks.js            Tweaks panel, font size, shader intensity
js/console.js           Interactive fake terminal
js/retro.js             90s mode, visitor counter, local guestbook
js/name.js              Hero name effect
js/a11y.js              Accessibility/color mode wiring
js/cv.js                CV easter-egg state
js/catastrophe.js       Temporary fake crash state
```

## Main page

The default page presents:

- hero summary and professional links
- core skills
- projects: Hecate, Cynic, and Pragmatist
- contact/profile links
- theme and visual tweaks
- a WebGL background that follows the active color theme

The top and footer link icons use the same SVG paths and shared `.link-icon`
styling so sizing and visual weight stay consistent.

## Terminal

The terminal opens from `$ open terminal` or the backtick key.

It implements a small in-memory filesystem with project files, CV handling,
history, tab completion, `cat`, `ls`, `cd`, `curl cv`, `sudo hire`, `moo`,
and other playful commands. Files reset every time the terminal opens; command
history is stored in localStorage.

## 90s mode

`Time Machine` opens the retro page. It includes:

- old-school visitor counter
- 90s-style project/about sections
- localStorage-backed guestbook
- Windows 95-style fake progress modal while signing

Guestbook messages stay in the visitor's browser only.

## Assets and metadata

- `Sergey_Rubanov-CV.pdf` is the downloadable CV.
- `favicon.svg`, `favicon.png`, `favicon.ico`, and `apple-touch-icon.png`
  provide site icons.
- `og-image.png` / `og-image.svg` provide the social preview.
- `CNAME` must stay in place for GitHub Pages custom-domain deployment.

## Deployment

Pushes to `master` deploy through GitHub Pages for
`chicoxyzzy/chicoxyzzy.github.io`.

Do not remove `CNAME` during cleanups or remote syncs.
