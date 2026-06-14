// Tweaks panel UI: theme buttons, shader-intensity slider, font-size slider.
// Persists to the sr_tweaks localStorage key.

import { setColorMode, setTheme } from './themes.js';
import { requestFrame } from './shader.js';

const FONT_SIZES = [11, 13, 15, 17];
const FONT_LABELS = ['Small', 'Medium', 'Large', 'X-Large'];
const CB_CLASSES = ['cb-deuteranopia','cb-protanopia','cb-tritanopia','cb-highcontrast'];
const COLOR_MODE_KEY = 'sr_colormode';

function initTweaks(){
  const DEFAULTS = { shaderOpacity:0.55, fontSize:13, colorTheme:'phosphor' };

  function load(){
    try{
      const s=localStorage.getItem('sr_tweaks');
      const loaded = s ? {...DEFAULTS,...JSON.parse(s)} : {...DEFAULTS};
      if(Number(loaded.shaderOpacity) < 0.2) loaded.shaderOpacity = DEFAULTS.shaderOpacity;
      return loaded;
    }catch(e){
      return {...DEFAULTS};
    }
  }
  function save(v){ try{ localStorage.setItem('sr_tweaks',JSON.stringify(v)); }catch(e){} }

  const vals = load();

  function describeShader(v) {
    const pct = Math.round(Number(v) * 100);
    return `${pct} percent`;
  }
  function applyShader(v) {
    const c=document.getElementById('rain-canvas');
    if(c) c.style.opacity=v;
    if(shaderEl) shaderEl.setAttribute('aria-valuetext', describeShader(v));
    requestFrame();
  }
  function applyFontSize(v) { document.documentElement.style.fontSize=v+'px'; }

  applyFontSize(vals.fontSize);
  setTheme(vals.colorTheme);

  const panel      = document.getElementById('tweaks-panel');
  const tweaksBtn  = document.getElementById('tweaks-btn');
  const closeBtn   = document.getElementById('tweaks-close');
  const shaderEl   = document.getElementById('tweaks-shader');
  const fontEl     = document.getElementById('tweaks-fontsize');
  const fontValEl  = document.getElementById('tweaks-fontsize-val');
  const themeBtns  = document.querySelectorAll('.tweaks-rbtn[data-theme]');
  const modeBtns   = document.querySelectorAll('.a11y-row[data-mode]');
  const root       = document.documentElement;

  shaderEl.value  = vals.shaderOpacity;
  let fontIdx = FONT_SIZES.indexOf(vals.fontSize);
  if(fontIdx < 0) fontIdx = FONT_SIZES.indexOf(DEFAULTS.fontSize);
  vals.fontSize = FONT_SIZES[fontIdx];
  fontEl.value = fontIdx;
  fontValEl.textContent = FONT_LABELS[fontIdx];
  fontEl.setAttribute('aria-valuetext', FONT_LABELS[fontIdx]);
  themeBtns.forEach(b => {
    const active = b.dataset.theme===vals.colorTheme;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  function setMode(mode){
    CB_CLASSES.forEach(c=>root.classList.remove(c));
    if(mode) root.classList.add(mode);
    setColorMode(mode);
    modeBtns.forEach(r=>{
      const active = r.dataset.mode===mode;
      r.classList.toggle('active', active);
      r.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    try{ localStorage.setItem(COLOR_MODE_KEY, mode); }catch(e){}
  }

  try{
    const savedMode = localStorage.getItem(COLOR_MODE_KEY);
    setMode(savedMode || '');
  }catch(e){
    setMode('');
  }

  applyShader(vals.shaderOpacity);

  function setOpen(isOpen){
    panel.classList.toggle('open', isOpen);
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    panel.toggleAttribute('inert', !isOpen);
    tweaksBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if(isOpen) shaderEl.focus();
  }

  tweaksBtn.addEventListener('click', ()=>{ setOpen(!panel.classList.contains('open')); });
  closeBtn.addEventListener('click', ()=>{ setOpen(false); tweaksBtn.focus(); });
  document.addEventListener('click', e=>{ if(!panel.contains(e.target)&&e.target!==tweaksBtn) setOpen(false); });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && panel.classList.contains('open')){
      setOpen(false);
      tweaksBtn.focus();
    }
  });

  shaderEl.addEventListener('input', e=>{
    vals.shaderOpacity=+e.target.value; applyShader(vals.shaderOpacity); save(vals);
  });
  fontEl.addEventListener('input', e=>{
    const idx = +e.target.value;
    vals.fontSize = FONT_SIZES[idx];
    fontValEl.textContent = FONT_LABELS[idx];
    fontEl.setAttribute('aria-valuetext', FONT_LABELS[idx]);
    applyFontSize(vals.fontSize);
    save(vals);
  });
  themeBtns.forEach(b=> b.addEventListener('click', ()=>{
    vals.colorTheme=b.dataset.theme;
    themeBtns.forEach(x=>{
      const active = x===b;
      x.classList.toggle('active', active);
      x.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    setTheme(vals.colorTheme);
    save(vals);
  }));
  modeBtns.forEach(r=> r.addEventListener('click', ()=> setMode(r.dataset.mode)));
}

export { initTweaks };
