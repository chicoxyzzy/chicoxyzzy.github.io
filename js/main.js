// Single entry point: wires every module together.

import { checkCatastrophe } from './catastrophe.js';
import { initCV } from './cv.js';
import { initShader } from './shader.js';
import { initName } from './name.js?v=20260614';
import { initConsole } from './console.js?v=20260614a';
import { initTweaks } from './tweaks.js?v=20260614b';
import { initRetro } from './retro.js?v=20260614a';

// If clyde corrupted the system within the last 2 minutes, the site stays down.
if(!checkCatastrophe()){
  // Shader first so requestFrame is live before themes apply a palette.
  initShader();
  initTweaks();
  initName();
  initConsole();
  initRetro();
  initCV();

  // Reveal: add .in to .rev elements as they scroll into view.
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold:.08 });
  document.querySelectorAll('.rev').forEach(el => io.observe(el));
}
