// WebGL CRT background shader.

let requestFrame = () => {};

function initShader(){
  const canvas = document.getElementById('rain-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const forcedColors = window.matchMedia('(forced-colors: active)');

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

  const float GAIN = 3.0; // overall brightness — lifts the CRT field out of near-black

  float h(float v){ return fract(sin(v*127.1+19.3)*43758.5); }
  float h2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }

  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    f=f*f*(3.-2.*f);
    return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),
               mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p){
    float v=0.,a=.5;
    for(int i=0;i<4;i++){v+=a*noise(p);p*=2.1;a*=.5;}
    return v;
  }

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

    // slow FBM noise field
    float n = fbm(buv * 3.0 + vec2(T*0.018, T*0.01));
    col += vec3(0., n*0.018, n*0.009);

    // very slow horizontal interference bands
    float bands = fbm(vec2(0.5, buv.y*7.0 + T*0.045));
    col += vec3(0., bands*0.012, bands*0.006);

    // scanline shimmer
    float shimmer = noise(vec2(buv.x*34.0, buv.y*1.2 + T*0.12)) * 0.006;
    col += vec3(0., shimmer, shimmer*0.5);

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
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    canvas.style.width='100vw';canvas.style.height='100vh';
    gl.viewport(0,0,canvas.width,canvas.height);
  }
  resize();
  window.addEventListener('resize',resize);

  let rafId = 0;
  function shouldRender(){
    const style = getComputedStyle(canvas);
    return !document.hidden &&
      !reduceMotion.matches &&
      !forcedColors.matches &&
      style.display !== 'none' &&
      Number(style.opacity || 1) > 0;
  }

  requestFrame = function(){
    if(!rafId && shouldRender()) rafId = requestAnimationFrame(frame);
  };

  function frame(t){
    rafId = 0;
    if(!shouldRender()) return;
    gl.uniform1f(uT,t*.001);
    gl.uniform2f(uR,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    requestFrame();
  }

  document.addEventListener('visibilitychange', requestFrame);
  reduceMotion.addEventListener?.('change', requestFrame);
  forcedColors.addEventListener?.('change', requestFrame);
  requestFrame();
}

export { initShader, requestFrame };
