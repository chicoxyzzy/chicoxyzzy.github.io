// 90s retro overlay easter egg: time machine, hit counter, guestbook.

let openRetro = () => {};

function initRetro(){
  const overlay = document.getElementById('retro-overlay');
  const retroBtn = document.getElementById('retro-btn');
  const retroClose = document.getElementById('retro-close');
  let lastFocus = null;

  function setRetroOpen(isOpen) {
    if(isOpen) lastFocus = document.activeElement;
    overlay.classList.toggle('open', isOpen);
    overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    overlay.toggleAttribute('inert', !isOpen);
    retroBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.dispatchEvent(new Event('sr-overlay-change'));
    if(isOpen) retroClose.focus();
    else if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function trapRetroFocus(e) {
    if(e.key !== 'Tab' || !overlay.classList.contains('open')) return;
    const focusable = [...overlay.querySelectorAll('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if(!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  openRetro = () => setRetroOpen(true);
  retroBtn.addEventListener('click', () => setRetroOpen(!overlay.classList.contains('open')));
  retroClose.addEventListener('click', () => setRetroOpen(false));
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && overlay.classList.contains('open')) setRetroOpen(false);
    trapRetroFocus(e);
  });

  const BASE = 133472, key = 'sr_retro_hits';
  const n = parseInt(localStorage.getItem(key)||'0', 10) + 1;
  localStorage.setItem(key, n);
  const el = document.getElementById('retro-hit-display');
  if(el) el.textContent = String(BASE + n).padStart(7, '0');

  const guestbookKey = 'sr_retro_guestbook';
  const guestbookSeed = [
    { name:'tim@cern', message:'The web was invented for exactly this Sergey.', date:'1991-08-06' },
    { name:'grace_hopper', message:'Found one bug: this guestbook is stored locally. Feature accepted!!!', date:'1952-09-09' },
    { name:'bill1955@outlook.com', message:'Best viewed in Windows 95. Please insert CD-ROM 2.', date:'1995-08-24' },
    { name:'ltorvalds', message:'Works on my kernel. Ship it.', date:'1996-02-01' },
    { name:'localhost', message:'I saw the guestbook first.', date:'127.0.0.1' },
  ];
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookEntries = document.getElementById('guestbook-entries');
  const guestbookStatus = document.getElementById('guestbook-status');
  const guestbookName = document.getElementById('guestbook-name');
  const guestbookMessage = document.getElementById('guestbook-message');
  const guestbookModal = document.getElementById('guestbook-modal');
  const guestbookModalClose = guestbookModal?.querySelector('.win95-close');
  const guestbookModalProgress = document.getElementById('guestbook-modal-progress');
  const guestbookModalLabel = document.getElementById('guestbook-modal-label');
  const guestbookModalStep = document.getElementById('guestbook-modal-step');
  let guestbookLastFocus = null;

  function escapeText(value) {
    return value.replace(/[&<>"']/g, ch => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[ch]));
  }

  function normalizeEntry(entry) {
    return {
      name: entry.name || 'Anonymous Web Surfer',
      message: entry.message || '',
      date: (entry.date || '').slice(0, 10) || new Date().toISOString().slice(0, 10),
    };
  }

  function loadGuestbook() {
    try {
      const saved = JSON.parse(localStorage.getItem(guestbookKey) || '[]');
      return Array.isArray(saved) ? saved.map(normalizeEntry) : [];
    } catch(e) {
      return [];
    }
  }

  function saveGuestbook(entries) {
    localStorage.setItem(guestbookKey, JSON.stringify(entries.slice(0, 12)));
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function setGuestbookModalProgress(value, step) {
    const pct = Math.max(0, Math.min(100, Math.round(value)));
    if(guestbookModalProgress) guestbookModalProgress.style.width = `${pct}%`;
    if(guestbookModalLabel) guestbookModalLabel.textContent = `${pct}% complete`;
    if(guestbookModalStep) guestbookModalStep.textContent = step;
  }

  function closeGuestbookModal(restoreFocus = true) {
    if(!guestbookModal) return;
    guestbookModal.classList.remove('open');
    guestbookModal.setAttribute('aria-hidden', 'true');
    guestbookModal.setAttribute('inert', '');
    if(restoreFocus && guestbookLastFocus && typeof guestbookLastFocus.focus === 'function') {
      guestbookLastFocus.focus();
    }
  }

  async function runGuestbookModal() {
    if(!guestbookModal) return;
    const steps = [
      [8, 'Booting the guestbook stack'],
      [24, 'Checking the message envelope'],
      [41, 'Routing note through local storage'],
      [63, 'Writing signature to this browser'],
      [82, 'Indexing for future homepage archaeology'],
      [100, 'Done!'],
    ];
    guestbookLastFocus = document.activeElement;
    guestbookModal.classList.add('open');
    guestbookModal.setAttribute('aria-hidden', 'false');
    guestbookModal.removeAttribute('inert');
    guestbookModalClose?.focus();
    for(const [pct, step] of steps) {
      setGuestbookModalProgress(pct, step);
      await wait(pct === 100 ? 650 : 620);
    }
    await wait(500);
    closeGuestbookModal();
    setGuestbookModalProgress(0, 'Booting the guestbook stack');
  }

  function renderGuestbook() {
    if(!guestbookEntries) return;
    const visibleEntries = [...loadGuestbook(), ...guestbookSeed];
    guestbookEntries.innerHTML = visibleEntries.slice(0, 10).map(entry => `
      <div class="guestbook-entry">
        <div><span class="guestbook-entry-name">${escapeText(entry.name)}</span> <span class="guestbook-entry-date">${escapeText(entry.date)}</span></div>
        <div class="guestbook-entry-msg">${escapeText(entry.message)}</div>
      </div>
    `).join('');
  }

  if(guestbookForm) {
    guestbookForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = (guestbookName.value || '').trim() || 'Anonymous Web Surfer';
      const message = (guestbookMessage.value || '').trim();
      if(!message) {
        if(guestbookStatus) guestbookStatus.textContent = 'Please type a message before signing!!!';
        guestbookMessage.focus();
        return;
      }

      const entry = {
        name: name.slice(0, 32),
        message: message.slice(0, 180),
        date: new Date().toISOString().slice(0, 10),
      };
      if(guestbookStatus) guestbookStatus.textContent = 'Saving to Sergey\'s local guestbook...';
      await runGuestbookModal();
      saveGuestbook([entry, ...loadGuestbook()]);
      guestbookForm.reset();
      if(guestbookStatus) guestbookStatus.textContent = 'Guestbook signed!!! Saved to this browser for future homepage archaeology!!!';
      renderGuestbook();
    });
  }

  if(guestbookModalClose) {
    guestbookModalClose.addEventListener('click', () => {
      closeGuestbookModal();
    });
  }

  renderGuestbook();
}

export { initRetro, openRetro };
