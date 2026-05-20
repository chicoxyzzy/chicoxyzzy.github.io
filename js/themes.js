// Single source of color truth: themes, colorblind palettes, and merged
// palette application. Both setTheme and setColorMode re-apply the merged
// palette to the document root and trigger a shader re-render.

import { requestFrame } from './shader.js';

const THEMES = {
  phosphor: {'--cyan':'#00e87a','--mag':'#e87000','--green':'#00e87a','--amber':'#e87000','--text':'#82b890','--hi':'#d0e8d8','--dim':'#1a3a24','--mid':'#4a8a62','--bg':'#030a05'},
  amber:    {'--cyan':'#ffaa00','--mag':'#ff4422','--green':'#ffaa00','--amber':'#ff4422','--text':'#c8900a','--hi':'#ffe0a0','--dim':'#2a1a00','--mid':'#8a5a10','--bg':'#0a0600'},
  ice:      {'--cyan':'#88ccff','--mag':'#cc88ff','--green':'#88ccff','--amber':'#cc88ff','--text':'#88a8c8','--hi':'#d8eeff','--dim':'#0a1828','--mid':'#3060a0','--bg':'#030a14'},
};

const CB_PALETTES = {
  'cb-deuteranopia': {
    '--cyan':'#4499ff','--mag':'#ff8800','--green':'#4499ff','--amber':'#ff8800',
  },
  'cb-protanopia': {
    '--cyan':'#22aaff','--mag':'#ffaa00','--green':'#22aaff','--amber':'#ffaa00',
  },
  'cb-tritanopia': {
    '--cyan':'#ff4455','--mag':'#44ff88','--green':'#44ff88','--amber':'#ff4455',
  },
  'cb-highcontrast': {
    '--bg':'#000000','--cyan':'#00ff00','--mag':'#ffff00','--green':'#00ff00',
    '--amber':'#ffff00','--dim':'#2a4a2a','--mid':'#5a9a5a','--text':'#aaddaa','--hi':'#ffffff',
  },
};

let currentTheme = 'phosphor';
let currentMode = '';

function apply(){
  const th = THEMES[currentTheme] || THEMES.phosphor;
  const cb = CB_PALETTES[currentMode] || {};
  const r = document.documentElement;
  Object.entries({ ...th, ...cb }).forEach(([k, v]) => r.style.setProperty(k, v));
  requestFrame();
}

function setTheme(name){
  currentTheme = name;
  apply();
}

function setColorMode(mode){
  currentMode = mode || '';
  apply();
}

function getTheme(){ return currentTheme; }
function getColorMode(){ return currentMode; }
function getThemeNames(){ return Object.keys(THEMES); }

export { setTheme, setColorMode, getTheme, getColorMode, getThemeNames };
