// Accessibility panel UI: colorblind mode buttons. Persists to the
// sr_colormode localStorage key.

import { setColorMode } from './themes.js';

function initA11y(){
  const btn   = document.getElementById('a11y-btn');
  const panel = document.getElementById('a11y-panel');
  const rows  = panel.querySelectorAll('.a11y-row');
  const root  = document.documentElement;
  const CB_CLASSES = ['cb-deuteranopia','cb-protanopia','cb-tritanopia','cb-highcontrast'];
  const STORE_KEY  = 'sr_colormode';

  function setMode(mode){
    CB_CLASSES.forEach(c=>root.classList.remove(c));
    if(mode) root.classList.add(mode);
    setColorMode(mode);
    rows.forEach(r=>{
      const active = r.dataset.mode===mode;
      r.classList.toggle('active', active);
      r.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    try{ localStorage.setItem(STORE_KEY, mode); }catch(e){}
  }

  function setOpen(isOpen){
    panel.classList.toggle('open', isOpen);
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if(isOpen) {
      const activeRow = panel.querySelector('.a11y-row.active') || rows[0];
      activeRow?.focus();
    }
  }

  try{
    const saved = localStorage.getItem(STORE_KEY);
    if(saved !== null) setMode(saved);
  }catch(e){}

  btn.addEventListener('click', ()=>{
    setOpen(!panel.classList.contains('open'));
  });

  rows.forEach(r=>{
    r.addEventListener('click', ()=>{
      setMode(r.dataset.mode);
      setOpen(false);
      btn.focus();
    });
  });

  document.addEventListener('click', e=>{
    if(!panel.contains(e.target) && e.target!==btn)
      setOpen(false);
  });

  document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && panel.classList.contains('open')){
      setOpen(false);
      btn.focus();
    }
  });
}

export { initA11y };
