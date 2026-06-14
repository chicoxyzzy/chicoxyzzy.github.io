// Hero name animation: phosphor character calibration effect.

function initName(){
  const nameLine  = document.getElementById('name-line');
  const nameChars = document.getElementById('name-chars');
  const FINAL = nameLine?.dataset.t || 'SERGEY RUBANOV';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderCalibrated(){
    nameChars.textContent = FINAL;
    nameLine.setAttribute('data-t', FINAL);
    nameLine.classList.add('calibrated');
  }

  if(reduceMotion){
    renderCalibrated();
    return;
  }

  nameChars.innerHTML = FINAL.split('').map((char, i) => {
    const safe = char === ' ' ? '&nbsp;' : char;
    const flicker = [1, 5, 9, 12].includes(i);
    const cls = char === ' ' ? 'phosphor-char phosphor-space' : `phosphor-char${flicker ? ' lamp-flicker' : ''}`;
    const speed = 14 + (i % 4) * 2.5;
    const delay = 3.5 + i * 0.8;
    return `<span class="${cls}" style="--i:${i};--flicker-speed:${speed}s;--flicker-delay:${delay}s">${safe}</span>`;
  }).join('');

  setTimeout(()=>{
    nameLine.classList.add('calibrated');
  }, 1280);
}

export { initName };
