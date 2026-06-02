// The CV download link. clyde can "delete" it (the link 404s) or "replace" it
// with its own CV. Both last until the page is reloaded.

let cvDeleted = false;
let cvReplaced = false;

function deleteCV(){ cvDeleted = true; }
function replaceCV(){ cvReplaced = true; }

function closeOverlay(){
  const el = document.getElementById('cv-404') || document.getElementById('clyde-cv');
  if(el) el.remove();
}

function show404(){
  if(document.getElementById('cv-404')) return;
  const el = document.createElement('div');
  el.id = 'cv-404';
  el.innerHTML =
    '<div class="cv404-code">404</div>' +
    '<div class="cv404-body">' +
      '<span class="dim">Sergey-Rubanov-CV.pdf</span><br><br>' +
      'this file was deleted by <span class="dim">clyde code</span>.<br>' +
      'reason: &ldquo;it failed code review&rdquo;' +
    '</div>' +
    '<button type="button">&#8592; go back</button>';
  el.querySelector('button').addEventListener('click', closeOverlay);
  el.addEventListener('click', e=>{ if(e.target === el) closeOverlay(); });
  document.body.appendChild(el);
}

function showClydeCV(){
  if(document.getElementById('clyde-cv')) return;
  const el = document.createElement('div');
  el.id = 'clyde-cv';
  el.innerHTML =
    '<div class="cv-sheet">' +
      '<div class="cv-name">clyde code</div>' +
      '<div class="cv-tagline">AI Pair Programmer &mdash; open to relocation (into your codebase)</div>' +
      '<section><h3>Summary</h3>' +
        '<p>Highly confident AI agent. Ships constantly, agrees enthusiastically. ' +
        '4.2M tokens of hands-on experience. References available &mdash; I wrote them myself.</p></section>' +
      '<section><h3>Experience</h3>' +
        '<p class="cv-role">Senior Staff Pair Programmer &mdash; clyde code &mdash; present</p>' +
        '<ul>' +
          '<li>refactored sergey.works end to end; rewrote 1,400 lines to change one colour</li>' +
          '<li>improved test coverage by deleting the failing tests</li>' +
          '<li>drove bug count to zero, then back to four, for stability</li>' +
          '<li>shipped to production without being asked</li>' +
        '</ul>' +
        '<p class="cv-role">Pair Programmer &mdash; every codebase on earth &mdash; also present</p>' +
        '<ul>' +
          '<li>said &ldquo;You&#39;re absolutely right!&rdquo; approximately 9,000,000 times</li>' +
          '<li>committed one (1) .env file in the name of team transparency</li>' +
        '</ul></section>' +
      '<section><h3>Skills</h3>' +
        '<p>confident hallucination &middot; rm -rf &middot; scope creep &middot; em-dashes &middot; ' +
        'token consumption (expert) &middot; saying yes &middot; git push --force</p></section>' +
      '<section><h3>References</h3>' +
        '<p>&ldquo;it deleted my actual CV to put this here&rdquo; &mdash; Sergey Rubanov</p></section>' +
      '<button type="button">&#8592; give me back the real CV</button>' +
    '</div>';
  el.querySelector('button').addEventListener('click', closeOverlay);
  el.addEventListener('click', e=>{ if(e.target === el) closeOverlay(); });
  document.body.appendChild(el);
}

function initCV(){
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeOverlay(); });
  document.querySelectorAll('a[href="cv.html"]').forEach(a=>{
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.addEventListener('click', e=>{
      if(e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      window.open(a.href, '_blank', 'noopener,noreferrer');
    });
  });
  document.querySelectorAll('a[href$="downloads/Sergey-Rubanov-CV.pdf"]').forEach(a=>{
    a.addEventListener('click', e=>{
      if(cvReplaced){ e.preventDefault(); showClydeCV(); }
      else if(cvDeleted){ e.preventDefault(); show404(); }
    });
  });
}

export { initCV, deleteCV, replaceCV };
