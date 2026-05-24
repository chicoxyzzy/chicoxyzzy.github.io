// WebGL CRT background shader.

let requestFrame = () => {};

function initShader(){
  const canvas = document.getElementById('rain-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const forcedColors = window.matchMedia('(forced-colors: active)');
  const RENDER_SCALE = 0.5;
  const FRAME_MS = 1000 / 15;

  if(reduceMotion.matches || forcedColors.matches){
    canvas.style.display = 'none';
    return;
  }
  const gl = canvas.getContext('webgl', {antialias:false, alpha:false});
  if(!gl){ canvas.style.display='none'; return; }

  const VS = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

  const FS = `
  precision highp float;
  uniform float T;
  uniform vec2  R;

  const float GAIN = 3.2; // overall brightness — lifts the CRT field out of near-black

  float h(float v){ return fract(sin(v*127.1+19.3)*43758.5); }
  float h2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }

  void main(){
    vec2 uv = gl_FragCoord.xy / R;

    // ── barrel distortion (CRT curvature) ──
    vec2 cc = uv - 0.5;
    float dist = dot(cc, cc);
    vec2 buv = uv + cc * dist * 0.09;

    // clip outside barrel
    float outside = step(0.0, buv.x) * step(buv.x, 1.0)
                  * step(0.0, buv.y) * step(buv.y, 1.0);

    // base phosphor green-black
    vec3 col = vec3(0.005, 0.018, 0.009);

    // Cheap phosphor drift: no FBM loops, just layered sine/hash bands.
    float field = 0.5 + 0.5 * sin((buv.x * 2.1 + buv.y * 3.7) + T * 0.05);
    float bands = 0.5 + 0.5 * sin(buv.y * 34.0 + T * 0.18 + sin(buv.x * 3.0) * 0.8);
    float shimmer = h2(floor(vec2(buv.x * 48.0, buv.y * 18.0 + T * 2.0))) * 0.006;
    col += vec3(0., field * 0.014 + bands * 0.012 + shimmer, field * 0.007 + bands * 0.005);

    // rolling scan bar
    float scanPos = fract(T * 0.045);
    float scanBar = smoothstep(0.012, 0.0, abs(buv.y - scanPos)) * 0.025;
    col += vec3(0., scanBar, scanBar*0.4);

    // glitch flash bar
    float gSlot  = floor(T * 0.22);
    float gY     = h(gSlot + 1.0);
    float gH     = 0.002 + h(gSlot + 2.0)*0.008;
    float gAlpha = step(0.975, h(gSlot + 3.0));
    float gBar   = smoothstep(gH, 0.0, abs(buv.y - gY));
    col += vec3(0., 0.05, 0.025) * gBar * gAlpha;

    // ── animated grain / static noise ──
    float grain = h2(floor(buv * R * 0.5) + vec2(floor(T*24.0), floor(T*17.0)));
    col += vec3(grain*0.006, grain * 0.032, grain * 0.016);
    // occasional static burst band
    float burstSlot = floor(T * 0.45);
    float burstY    = h(burstSlot + 7.0);
    float burstH    = 0.025 + h(burstSlot + 8.0) * 0.06;
    float burstOn   = step(0.985, h(burstSlot + 9.0));
    float burstMask = smoothstep(burstH, 0.0, abs(buv.y - burstY));
    float burstNoise= h2(floor(buv * R * 0.25) + vec2(burstSlot));
    col += vec3(burstNoise*0.018, burstNoise*0.07, burstNoise*0.035) * burstMask * burstOn;

    // ── phosphor scanlines ──
    float sl = mod(gl_FragCoord.y, 3.0);
    col *= mix(0.88, 1.0, step(2.5, sl));

    // left-edge glow
    float edge = smoothstep(0.18, 0.0, buv.x) * 0.05;
    col += vec3(0., edge, edge*0.5);

    // ── phosphor bloom: soft glow around bright areas ──
    float luma = dot(col, vec3(0.15, 0.7, 0.15));
    col += vec3(0., luma * luma * 0.4, luma * luma * 0.2);

    // ── strong vignette + barrel mask ──
    float vig = 1.0 - dot(cc, cc) * 1.8;
    col *= vig * outside;

    // corner darkening (monitor corners)
    float corner = smoothstep(0.5, 0.2, length(cc * vec2(0.9, 1.1)));
    col *= 0.85 + 0.15 * corner;

    col *= GAIN;

    gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
  }`;

  function mk(type,src){
    const s=gl.createShader(type);
    gl.shaderSource(s,src);gl.compileShader(s);return s;
  }
  const prog=gl.createProgram();
  gl.attachShader(prog,mk(gl.VERTEX_SHADER,VS));
  gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,FS));
  gl.linkProgram(prog);gl.useProgram(prog);

  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const ap=gl.getAttribLocation(prog,'p');
  gl.enableVertexAttribArray(ap);
  gl.vertexAttribPointer(ap,2,gl.FLOAT,false,0,0);

  const uT=gl.getUniformLocation(prog,'T');
  const uR=gl.getUniformLocation(prog,'R');

  function resize(){
    canvas.width=Math.max(1, Math.round(window.innerWidth * RENDER_SCALE));
    canvas.height=Math.max(1, Math.round(window.innerHeight * RENDER_SCALE));
    canvas.style.width='100vw';canvas.style.height='100vh';
    gl.viewport(0,0,canvas.width,canvas.height);
  }
  resize();
  let resizeTimer = 0;
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=>{
      resize();
      requestFrame();
    }, 120);
  });

  let rafId = 0;
  let timerId = 0;
  let lastDraw = 0;

  function shouldRender(){
    const style = getComputedStyle(canvas);
    return !document.hidden &&
      !reduceMotion.matches &&
      !forcedColors.matches &&
      !document.getElementById('console-overlay')?.classList.contains('open') &&
      !document.getElementById('retro-overlay')?.classList.contains('open') &&
      style.display !== 'none' &&
      Number(style.opacity || 1) > 0;
  }

  function cancelScheduled(){
    if(rafId) cancelAnimationFrame(rafId);
    if(timerId) clearTimeout(timerId);
    rafId = 0;
    timerId = 0;
  }

  requestFrame = function(){
    if(rafId || timerId) return;
    if(!shouldRender()){
      cancelScheduled();
      return;
    }
    const wait = Math.max(0, FRAME_MS - (performance.now() - lastDraw));
    if(wait > 0){
      timerId = setTimeout(()=>{
        timerId = 0;
        if(shouldRender()) rafId = requestAnimationFrame(frame);
      }, wait);
    } else {
      rafId = requestAnimationFrame(frame);
    }
  };

  function frame(t){
    rafId = 0;
    if(!shouldRender()) return;
    lastDraw = t;
    gl.uniform1f(uT,t*.001);
    gl.uniform2f(uR,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    requestFrame();
  }

  document.addEventListener('visibilitychange', requestFrame);
  document.addEventListener('sr-overlay-change', requestFrame);
  reduceMotion.addEventListener?.('change', requestFrame);
  forcedColors.addEventListener?.('change', requestFrame);
  requestFrame();
}

export { initShader, requestFrame };
