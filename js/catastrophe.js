// Clyde's catastrophe: a fake "system corrupted" screen that locks the site
// for 2 minutes — persisted in localStorage so reloads stay down until it lifts.

const KEY = 'sr_catastrophe';
const DURATION = 120000; // 2 minutes

function remainingMs(){
  try{
    const t = Number(localStorage.getItem(KEY));
    if(!t) return 0;
    const left = DURATION - (Date.now() - t);
    return left > 0 ? left : 0;
  }catch(e){ return 0; }
}

function fmt(ms){
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s/60)}:${String(s % 60).padStart(2,'0')}`;
}

function showCrashScreen(){
  if(document.getElementById('system-down')) return;
  const el = document.createElement('div');
  el.id = 'system-down';
  el.innerHTML =
    '<div class="sd-title">SYSTEM CORRUPTED</div>' +
    '<div class="sd-body">' +
      'clyde code refactored <span class="warn">sergey.works</span>.<br>' +
      'the refactor did not pass review.<br><br>' +
      '<span class="warn">503</span> &middot; service unavailable<br>' +
      'recovery in <span class="warn" id="sd-countdown">2:00</span>' +
    '</div>' +
    '<div class="sd-hint">(or clear localStorage — you clearly know how)</div>';
  document.body.appendChild(el);
  const cd = el.querySelector('#sd-countdown');
  const tick = ()=>{
    const left = remainingMs();
    if(left <= 0){ location.reload(); return; }
    cd.textContent = fmt(left);
  };
  tick();
  setInterval(tick, 1000);
}

// called by clyde at the climax of the catastrophe
function triggerCatastrophe(){
  try{ localStorage.setItem(KEY, String(Date.now())); }catch(e){}
  showCrashScreen();
}

// called by main.js on load — returns true if the site is still locked down
function checkCatastrophe(){
  if(remainingMs() <= 0) return false;
  showCrashScreen();
  return true;
}

export { triggerCatastrophe, checkCatastrophe };
