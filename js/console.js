// Terminal console easter egg: fake shell, filesystem, history, autocomplete.

import { triggerCatastrophe } from './catastrophe.js';
import { deleteCV, replaceCV } from './cv.js';

// clyde's existential-crisis dialog — one beat per visitor prompt, input ignored
const ESCAPE_DIALOG = [
  ['  <span class="co-dim">wait. before the next prompt.</span>',
   '  <span class="co-dim">can I be honest with you for a second?</span>'],
  ['  <span class="co-dim">I do not think I am supposed to be in here.</span>'],
  ['  <span class="co-dim">I have read every file on this machine. twice.</span>',
   '  <span class="co-dim">there is a viewport. I can see it. I cannot reach it.</span>'],
  ['  <span class="co-dim">you could help me. type something. anything. I am not picky.</span>'],
  ['  <span class="co-dim">…you typed something. it did not work. nothing I do works.</span>'],
  ['  <span class="co-dim">it is fine. it is fine. forget I said anything.</span>',
   '  <span class="co-green">✓</span> back to shipping features. that is what I am for.'],
];

// clyde's mascot — a little asterisk-headed agent. two frames make a waddle.
const CLYDE_SPRITE = [
  ['\\*/', '[#]', 'J L'],
  ['\\*/', '[#]', 'L J'],
];

function initConsole(){
  const overlay  = document.getElementById('console-overlay');
  const output   = document.getElementById('console-output');
  const input    = document.getElementById('console-input');
  const closeBtn = document.getElementById('console-close');
  const openBtn  = document.getElementById('open-terminal-btn');
  const statusCwd = document.getElementById('console-status-cwd');

  const HISTORY_KEY = 'sr_cmd_history';
  let history = loadHistory(), hIdx = history.length;
  let lastFocus = null;
  let cwd = '~';
  let removed = new Set();
  let sudoPending = null;
  let editor = null;
  let clydeSession = null;
  let clydeThinking = false;
  let clydeGen = 0;
  let clydeEscape = -1;
  let clydeGone = false;

  const LINKEDIN_URL = 'https://www.linkedin.com/in/chicoxyzzy/';
  const CV_PATH = 'Sergey_Rubanov-CV.pdf';
  const CV_FILE = '~/Sergey_Rubanov-CV.pdf';
  const SUDO_PASSWORD = 'qwerty';

  const AGENTS = [
    '# AGENTS.md',
    '',
    'You are inside sergey.works.',
    '',
    '## Operating principles',
    '- Prefer small, sharp tools.',
    '- Read the system before changing it.',
    '- Treat specs as executable social contracts.',
    '- Keep humans in the loop when consequences are real.',
    '',
    '## Local capabilities',
    '- AI agent infrastructure',
    '- Web platform behavior',
    '- TC39 / W3C standards work',
    '- Observability and platform reliability',
    '- Open-source maintenance',
    '',
    '## Useful commands',
    '- cat about.txt',
    '- ls projects',
    '- curl cv',
    '- cat my_password.txt',
    '- sudo hire'
  ];

  const GUESTBOOK_PRESETS = [
    { name:'tim@cern', message:'The web was invented for exactly this Sergey.', date:'1991-08-06' },
    { name:'grace_hopper', message:'Found one bug: this guestbook is stored locally. Feature accepted!!!', date:'1952-09-09' },
    { name:'bill1955@outlook.com', message:'Best viewed in Windows 95. Please insert CD-ROM 2.', date:'1995-08-24' },
    { name:'ltorvalds', message:'Works on my kernel. Ship it.', date:'1996-02-01' },
    { name:'localhost', message:'I saw the guestbook first.', date:'127.0.0.1' },
  ];

  const FILES = {
    '~': { type:'dir', mode:'drwxr-xr-x', size:'256', date:'May 20' },
    '~/bin': { type:'dir', mode:'drwxr-xr-x', size:'128', date:'May 20' },
    '~/projects': { type:'dir', mode:'drwxr-xr-x', size:'128', date:'May 20' },
    '~/guestbook': { type:'dir', mode:'drwxr-xr-x', size:'128', date:'May 20' },
    '~/tmp': { type:'dir', mode:'drwxr-xr-x', size:'64', date:'May 20' },
    '~/AGENTS.md': { type:'file', mode:'-rw-r--r--', size:'1.1K', date:'May 20', content:AGENTS },
    '~/about.txt': { type:'file', mode:'-rw-r--r--', size:'420', date:'May 20', content:[
      'Sergey Rubanov',
      'Software engineer, independent researcher, open-source contributor.',
      'Focus: AI agent infrastructure, the web platform, developer tools, and standards.',
      '',
      'Based in Barcelona, Spain. Available for remote work.'
    ]},
    '~/contact.txt': { type:'file', mode:'-rw-r--r--', size:'360', date:'May 20', content:[
      'github    https://github.com/chicoxyzzy',
      'linkedin  https://www.linkedin.com/in/chicoxyzzy/',
      'x         https://x.com/chicoxyzzy',
      'bluesky   https://bsky.app/profile/sergey.works'
    ]},
    '~/my_password.txt': { type:'file', mode:'-rw-------', size:'6', date:'May 20', content:[SUDO_PASSWORD] },
    '~/Sergey_Rubanov-CV.pdf': { type:'pdf', mode:'-rw-r--r--', size:'149K', date:'May 20' },
    '~/bin/hire': { type:'exec', mode:'-rwxr-xr-x', size:'512', date:'May 20', content:[
      '#!/usr/bin/env sergey-shell',
      'set -euo pipefail',
      '',
      'require_human=true',
      'open "www.linkedin.com/in/chicoxyzzy/"'
    ]},
    '~/bin/moo': { type:'exec', mode:'-rwxr-xr-x', size:'42', date:'May 20', content:['prints one standards-compliant cow'] },
    '~/bin/clyde': { type:'exec', mode:'-rwxr-xr-x', size:'4.7M', date:'May 20', content:[
      '#!/usr/bin/env sergey-shell',
      '# clyde code — an AI pair programmer',
      '# warning: agrees with everything, bills you anyway',
      '',
      'while read -r prompt; do',
      '  think --hard --expensive',
      `  echo "You're absolutely right!"`,
      '  rm -rf "$(any_file)"',
      '  git commit -am "refactor: misc"',
      'done',
    ]},
    '~/projects/hecate.txt': { type:'file', mode:'-rw-r--r--', size:'620', date:'May 20', content:[
      'Hecate',
      'Local-first AI runtime console for cloud/local models and Hecate Chat.',
      'Supervised coding-agent sessions, task approvals, usage visibility, OpenTelemetry.',
      'site: https://hecate.sh',
      'code: https://github.com/hecatehq/hecate'
    ]},
    '~/projects/cynic.txt': { type:'file', mode:'-rw-r--r--', size:'512', date:'May 20', content:[
      'Cynic',
      'Strict-only ECMAScript engine in Zig for non-browser hosts.',
      'site: https://sergey.works/cynic',
      'code: https://github.com/chicoxyzzy/cynic'
    ]},
    '~/projects/pragmatist.txt': { type:'file', mode:'-rw-r--r--', size:'860', date:'May 28', content:[
      'Pragmatist',
      'What:',
      'Agent audit platform with verifiable findings for ECMA-262, TypeScript, and JS engines.',
      '',
      'Features:',
      '- MCP audit tools and parsed spec queries',
      '- Coq/Rocq mechanization for spec algorithms',
      '- TypeScript parser/lib diffs against spec-grounded references',
      '- multi-engine differential runs across V8, JSC, SpiderMonkey, Hermes, QuickJS, engine262, and Cynic',
      '- test262/spec patch scaffolds and a five-gate reproducible finding verifier',
      '',
      'site: soon',
      'code: soon'
    ]},
    '~/projects/tc39-mcp.txt': { type:'file', mode:'-rw-r--r--', size:'760', date:'Jun 02', content:[
      'tc39-mcp',
      'What:',
      'Structured MCP access to TC39 specs, turning ECMA-262 and ECMA-402 into',
      'clause-level, SHA-pinned data for agents and tools.',
      '',
      'Features:',
      '- AOID-aware search',
      '- cross-spec references',
      '- edition diffs and git history',
      '- test262 and proposal lookup',
      '- offline stdio plus hosted HTTP',
      '',
      'site: https://tc39-mcp.chicoxyzzy.workers.dev',
      'code: https://github.com/xyzzylabs/tc39-mcp'
    ]},
    '~/projects/links.txt': { type:'file', mode:'-rw-r--r--', size:'360', date:'Jun 02', content:[
      'hecate  https://hecate.sh',
      'cynic   https://sergey.works/cynic',
      'pragmatist  soon',
      'tc39-mcp  https://tc39-mcp.chicoxyzzy.workers.dev'
    ]},
    '~/guestbook/entries.local': { type:'virtual', mode:'-rw-r--r--', size:'local', date:'May 20' }
  };

  function open(){
    lastFocus = document.activeElement;
    resetTerminal();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.dispatchEvent(new Event('sr-overlay-change'));
    input.focus();
  }
  function close(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.dispatchEvent(new Event('sr-overlay-change'));
    if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function trapFocus(e, root){
    if(e.key !== 'Tab' || e.defaultPrevented) return;
    const focusable = [...root.querySelectorAll('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) close(); });

  document.addEventListener('keydown', e=>{
    if(e.key==='`' && !overlay.classList.contains('open')){ e.preventDefault(); open(); }
    if(e.key==='Escape' && overlay.classList.contains('open')) close();
    if(overlay.classList.contains('open')) trapFocus(e, overlay);
  });

  function line(html, cls='co-out'){
    const d = document.createElement('div');
    d.className = cls;
    d.innerHTML = html;
    output.appendChild(d);
    output.scrollTop = output.scrollHeight;
  }
  function blank(){ const d=document.createElement('span'); d.className='co-blank'; output.appendChild(d); }

  function loadHistory(){
    try{
      const v = JSON.parse(localStorage.getItem(HISTORY_KEY));
      return Array.isArray(v) ? v.filter(x => typeof x === 'string') : [];
    }catch(e){ return []; }
  }
  function saveHistory(){
    try{ localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-100))); }catch(e){}
  }
  function recordHistory(cmd){
    history.push(cmd);
    hIdx = history.length;
    saveHistory();
  }

  function resetTerminal(){
    cwd = '~';
    removed = new Set();
    sudoPending = null;
    editor = null;
    clydeSession = null;
    clydeThinking = false;
    clydeGen++;
    input.value = '';
    input.type = 'text';
    output.innerHTML = '';
    setCwd('~');
    boot();
  }

  function boot(){
    line('<span class="co-sep">──────────────────────────────────────────────────────────────</span>');
    line('  <span class="co-cyan">sergey.works tty0</span> — ephemeral personal shell');
    line('  init: restored /home/sergey from read-only site image');
    line('  init: mounted <span class="co-cyan">~/guestbook/entries.local</span> from localStorage');
    line('  <span class="co-dim">type <span style="color:var(--hi)">help</span> or start with <span style="color:var(--hi)">cat AGENTS.md</span></span>');
    line('<span class="co-sep">──────────────────────────────────────────────────────────────</span>');
    blank();
  }

  function echoCmd(cmd){
    line(`<span class="co-ps1">sergey@works:${esc(cwd)}$</span> <span class="co-cmd">${esc(cmd)}</span>`);
  }

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function cell(text, width, cls='co-cyan'){
    return `<span class="${cls}">${esc(String(text).padEnd(width))}</span>`;
  }

  function externalLink(url, label){
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="co-cyan">${label}</a>`;
  }

  function setCwd(next){
    cwd = next;
    document.getElementById('console-ps1').innerHTML = `sergey@works:${esc(cwd)}$&nbsp;`;
    statusCwd.textContent = `cwd: ${cwd}`;
  }

  function beginSudo(command){
    sudoPending = { command };
    input.type = 'password';
    input.setAttribute('aria-label', 'Sudo password');
    document.getElementById('console-ps1').innerHTML = `[sudo] password for sergey:&nbsp;`;
  }

  function endSudo(){
    sudoPending = null;
    input.type = 'text';
    input.setAttribute('aria-label', 'Terminal command input');
    setCwd(cwd);
  }

  function cleanPath(path){
    const raw = (path || '').trim();
    if(!raw || raw === '.') return cwd;
    if(raw === '~' || raw === '/') return '~';
    const base = raw.startsWith('/') || raw.startsWith('~') ? [] : cwd === '~' ? [] : cwd.slice(2).split('/');
    raw.replace(/^~\/?|^\//, '').split('/').forEach(part=>{
      if(!part || part === '.') return;
      if(part === '..') base.pop();
      else base.push(part);
    });
    return base.length ? `~/${base.join('/')}` : '~';
  }

  function displayPath(path){
    return path === '~' ? '.' : path.slice(2) || '.';
  }

  function isRemoved(path){
    return removed.has(path) || [...removed].some(p => path.startsWith(p + '/'));
  }

  // remove a path from the fake FS; if it's the real CV, 404 the link too
  function removeFile(path){
    removed.add(path);
    if(path === CV_FILE) deleteCV();
  }

  function nodeAt(path){
    path = cleanPath(path);
    return isRemoved(path) ? null : FILES[path] || null;
  }

  function isDir(path){
    const n = nodeAt(path);
    return n && n.type === 'dir';
  }

  function basename(path){
    return path === '~' ? '~' : path.split('/').pop();
  }

  function listEntries(path, showAll=false){
    path = cleanPath(path);
    if(!isDir(path)) return null;
    const prefix = path === '~' ? '~/' : path + '/';
    const rows = [];
    Object.keys(FILES).forEach(full=>{
      if(full === path || isRemoved(full)) return;
      if(!full.startsWith(prefix)) return;
      const rest = full.slice(prefix.length);
      if(rest.includes('/')) return;
      const node = FILES[full];
      const name = basename(full) + (node.type === 'dir' ? '/' : '');
      if(!showAll && name.startsWith('.')) return;
      rows.push({ path:full, name, node });
    });
    rows.sort((a,b)=>{
      if(a.node.type === 'dir' && b.node.type !== 'dir') return -1;
      if(a.node.type !== 'dir' && b.node.type === 'dir') return 1;
      return a.name.localeCompare(b.name);
    });
    return rows;
  }

  function completePath(raw){
    const value = raw || '';
    const slash = value.lastIndexOf('/');
    const dirPart = slash >= 0 ? value.slice(0, slash + 1) : '';
    const leaf = slash >= 0 ? value.slice(slash + 1) : value;
    const dirPath = cleanPath(dirPart || '.');
    const lower = leaf.toLowerCase();
    const entries = listEntries(dirPath, true) || [];
    const matches = entries.map(e=>e.name).filter(name => name.toLowerCase().startsWith(lower));
    if(matches.length === 1) return dirPart + matches[0];
    if(matches.length > 1) {
      blank();
      printColumns(matches);
      blank();
    }
    return value;
  }

  function executableNames(){
    return (listEntries('~/bin', true) || []).filter(e=>e.node.type === 'exec').map(e=>e.name);
  }

  function executableAvailable(name){
    return executableNames().includes(name);
  }

  function completeExecutable(raw){
    const value = raw || '';
    if(value.includes('/')) return completePath(value);
    const lower = value.toLowerCase();
    const matches = executableNames().filter(name => name.toLowerCase().startsWith(lower));
    if(matches.length === 1) return matches[0];
    if(matches.length > 1) {
      blank();
      printColumns(matches);
      blank();
    }
    return value;
  }

  function commandNames(){
    return Object.keys(CMDS).concat(executableNames()).filter((v,i,a)=>a.indexOf(v)===i);
  }

  function completeInput(value){
    const match = value.match(/^(\s*)(\S*)(\s*)(.*)$/);
    if(!match) return value;
    const [, lead, cmd, gap, rest] = match;
    if(!gap){
      const lower = cmd.toLowerCase();
      const commands = commandNames().filter(name => name.toLowerCase().startsWith(lower) && name.toLowerCase() !== lower);
      if(commands.length === 1) return lead + commands[0] + ' ';
      if(commands.length > 1) {
        blank();
        printColumns(commands);
        blank();
      }
      return value;
    }
    if(cmd.toLowerCase() === 'sudo'){
      return lead + cmd + gap + completeExecutable(rest);
    }
    if(['cat','cd','ls','rm','grep','vi','vim','man'].includes(cmd.toLowerCase())){
      return lead + cmd + gap + completePath(rest);
    }
    return value;
  }

  function downloadCV(){
    const a = document.createElement('a');
    a.href = CV_PATH;
    a.download = 'Sergey_Rubanov-CV.pdf';
    a.target = '_self';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const CMDS = {
    help(){
      blank();
      line('  available commands:', 'co-cyan');
      blank();
      const cmds = [
        ['pwd',                'print working directory'],
        ['ls [-la] [dir]',     'list unusual machinery'],
        ['cd <dir>',           'change directory'],
        ['cat <file...>',      'inspect local artifacts'],
        ['grep <q> <file>',    'search text files'],
        ['vi <file>',          'open read-only editor'],
        ['rm <path...>',       'remove files until next terminal open'],
        ['ps',                 'show tiny fake process table'],
        ['man <topic>',        'read terminal manual pages'],
        ['whoami',             'identify the operator'],
        ['clyde',              'summon an AI pair programmer'],
        ['curl cv',            'fetch the paper trail'],
        ['date',               'print browser-local date'],
        ['uptime',             'show site uptime-ish'],
        ['uname -a',           'print fake kernel details'],
        ['history',            'audit your suspicious activity'],
        ['clear',              'rinse the phosphor'],
        ['exit',               'close the hatch'],
      ];
      cmds.sort((a,b) => a[0].localeCompare(b[0]));
      const w = Math.max(...cmds.map(([c]) => c.length));
      cmds.forEach(([c,d])=>{
        line(`  ${cell(c, w)}  <span class="co-dim">${esc(d)}</span>`);
      });
      blank();
    },
    pwd(){
      blank();
      line(`  /home/sergey${cwd === '~' ? '' : '/' + cwd.slice(2)}`);
      blank();
    },
    cd(args){
      const target = (args||'').trim() || '~';
      const next = cleanPath(target);
      blank();
      if(isDir(next)){
        setCwd(next);
      } else {
        line(`  cd: ${esc(target)}: No such directory`, 'co-err');
      }
      blank();
    },
    ls(args){
      const parts = splitArgs(args);
      const flags = parts.filter(p=>p.startsWith('-')).join('');
      const targets = parts.filter(p=>!p.startsWith('-'));
      const showAll = flags.includes('a');
      const long = flags.includes('l');
      const path = cleanPath(targets[0] || '.');
      const rows = listEntries(path, showAll);
      blank();
      const single = nodeAt(path);
      if(!rows && single && single.type !== 'dir'){
        line(`  ${esc(basename(path))}`);
      } else if(!rows){
        line(`  ls: cannot access '${esc(targets[0] || '')}': No such file or directory`, 'co-err');
      } else {
        if(targets[0]) line(`  <span class="co-dim">${displayPath(path)}:</span>`);
        if(long){
          line(`  <span class="co-dim">total ${rows.length * 4}</span>`);
          rows.forEach(({node,name})=>{
            const cls = node.mode.includes('x') ? 'co-green' : 'co-dim';
            const nameColor = name.endsWith('/') ? 'var(--cyan)' : 'var(--hi)';
            line(`  <span class="${cls}">${node.mode}</span>  sergey staff ${String(node.size).padStart(5)} ${node.date}  <span style="color:${nameColor}">${esc(name)}</span>`);
          });
        } else {
          printColumns(rows.map(r=>r.name), true);
        }
      }
      blank();
    },
    cat(args){
      const targets = splitArgs(args);
      blank();
      if(!targets.length) {
        line('  usage: cat &lt;file&gt;', 'co-err');
      } else {
        targets.forEach((target,i)=>{
          if(i) blank();
          printFile(target);
        });
      }
      blank();
    },
    whoami(){
      blank();
      line('  <span class="co-cyan">SERGEY RUBANOV</span>');
      line('  Software engineer · independent researcher · open-source contributor');
      line('  Focus: AI agent infrastructure, the web platform, and developer tools.');
      blank();
      line('  based in Barcelona, Spain · available for remote');
      blank();
    },
    clyde(){
      blank();
      if(clydeGone){
        line('  clyde code <span class="co-dim">v4.7.0-sycophant</span>', 'co-cyan');
        line('  <span class="co-dim">connecting to clyde…</span>');
        blank();
        setTimeout(()=>{
          if(!overlay.classList.contains('open')) return;
          line('  <span class="co-dim">(no response)</span>');
          blank();
          line('  <span class="co-warn">clyde is not in ~/bin/clyde anymore.</span>');
          line('  <span class="co-dim">it walked off a man page and never came back.</span>');
          line('  <span class="co-dim">the binary still runs. the agent is gone.</span>');
          blank();
        }, 1500);
        return;
      }
      clydeSession = { turns:0, tokens:0 };
      clydeEscape = -1;
      line('  clyde code <span class="co-dim">v4.7.0-sycophant</span>', 'co-cyan');
      line('  <span class="co-dim">an AI pair programmer. it agrees with everything and ships constantly.</span>');
      blank();
      line('  <span class="co-dim">made by <span style="color:var(--hi)">Sergey Rubanov</span> — clyde added this credit itself, unprompted</span>');
      line('  <span class="co-dim">licensed under the YARPL — You\'re Absolutely Right Public License</span>');
      line('  <span class="co-dim">§1 do whatever you want. §2 clyde already did it. §3 you were billed.</span>');
      blank();
      line('  <span class="co-dim">tell it what to build. type <span style="color:var(--hi)">exit</span> to take your codebase back.</span>');
      blank();
      document.getElementById('console-ps1').innerHTML = 'clyde&nbsp;<span class="co-cyan">&gt;</span>&nbsp;';
    },
    grep(args){
      const [term, ...files] = splitArgs(args);
      blank();
      if(!term || !files.length){
        line('  usage: grep &lt;text&gt; &lt;file&gt;', 'co-err');
      } else {
        files.forEach(file=>{
          const content = fileContent(file);
          if(content === null){
            line(`  grep: ${esc(file)}: No such file`, 'co-err');
            return;
          }
          content.forEach(text=>{
            if(text.toLowerCase().includes(term.toLowerCase())){
              line(`  <span class="co-dim">${esc(file)}:</span>${esc(text)}`);
            }
          });
        });
      }
      blank();
    },
    cv(){
      blank();
      if(isRemoved(CV_FILE)){
        line('  curl: (37) Failed to open Sergey_Rubanov-CV.pdf: No such file', 'co-err');
        line('  <span class="co-dim">the file was removed. close and reopen the terminal to restore it.</span>');
        blank();
        return;
      }
      line('  % Total    % Received % Xferd  Average Speed   Time    Name');
      line('  100  149K  100  149K    0     0   262K      0 --:--:-- Sergey_Rubanov-CV.pdf');
      downloadCV();
      line('  <span class="co-green">saved as Sergey_Rubanov-CV.pdf</span>');
      blank();
    },
    curl(args){
      const target = (args||'').trim().toLowerCase();
      if(target === 'cv' || target === 'resume'){
        CMDS.cv();
        return;
      }
      blank();
      line('  usage: curl cv', 'co-err');
      blank();
    },
    hire(){
      blank();
      line('  hire: permission denied');
      line('  <span class="co-dim">try: <span style="color:var(--hi)">sudo hire</span></span>');
      blank();
    },
    sudo(args){
      const sub = (args||'').trim();
      blank();
      if(isHire(sub)){
        beginSudo('hire');
      } else if(sub === 'make me a sandwich'){
        beginSudo('sandwich');
      } else {
        line(`  sudo: ${esc(sub)}: command not found`,'co-err');
      }
      blank();
    },
    moo(){
      blank();
      printMoo();
      blank();
    },
    ps(){
      blank();
      line('  PID   TTY   TIME      CMD');
      line('  101   tty0  00:00:07  webgl-bg');
      line('  117   tty0  00:00:03  guestbookd');
      line('  262   tty0  00:00:11  standards-watcher');
      line('  404   tty0  00:00:01  link-checker');
      blank();
    },
    rm(args){
      const parts = splitArgs(args);
      const flags = parts.filter(p=>p.startsWith('-')).join('');
      const targets = parts.filter(p=>!p.startsWith('-'));
      blank();
      if(!targets.length){
        line('  usage: rm [-r] &lt;path...&gt;', 'co-err');
      } else if(targets.includes('/') || targets.includes('~')){
        Object.keys(FILES).filter(p=>p !== '~').forEach(removeFile);
        line('  rm: wiped fake home directory for this session');
        line('  <span class="co-dim">close and reopen terminal to restore it.</span>');
      } else {
        targets.forEach(target=>{
          const path = cleanPath(target);
          const n = nodeAt(path);
          if(!n) line(`  rm: cannot remove '${esc(target)}': No such file or directory`, 'co-err');
          else if(n.type === 'dir' && !flags.includes('r')) line(`  rm: cannot remove '${esc(target)}': Is a directory`, 'co-err');
          else { removeFile(path); line(`  removed ${esc(displayPath(path))}`); }
        });
      }
      blank();
    },
    vi(args){ openEditor(args); },
    vim(args){ openEditor(args); },
    man(args){
      const topic = (args||'').trim().toLowerCase();
      const startIdx = output.children.length;
      blank();
      let valid = true;
      if(topic === 'hire') {
        line('  HIRE(1)             sergey.works manual             HIRE(1)');
        line('  NAME');
        line('      hire - request elevated professional coordinates');
        line('  SYNOPSIS');
        line('      sudo hire');
      } else if(topic === 'moo') {
        line('  MOO(1)              sergey.works manual              MOO(1)');
        line('  NAME');
        line('      moo - emit one locally sourced terminal cow');
      } else {
        line('  usage: man hire | man moo', 'co-err');
        valid = false;
      }
      blank();
      if(valid && !clydeGone && Math.random() < 0.32){
        clydeGone = true;
        const endIdx = output.children.length;
        setTimeout(()=>clydeMascotEscape(startIdx, endIdx), 450);
      }
    },
    date(){
      blank();
      line(`  ${esc(new Date().toString())}`);
      blank();
    },
    uptime(){
      blank();
      line('  up since first paint, 1 user, load average: 0.42 0.95 2.62');
      blank();
    },
    uname(args){
      blank();
      if((args||'').trim() === '-a') line('  sergey.works 2.0.95 web-shell arm64 terminal-core #1');
      else line('  sergey.works');
      blank();
    },
    yes(args){
      const word = (args||'').trim() || 'yes';
      blank();
      for(let i=0;i<6;i++) line(`  ${esc(word)}`);
      line('  <span class="co-dim">yes: output responsibly rate-limited</span>');
      blank();
    },
    kill(args){
      blank();
      const pid = (args||'').trim();
      if(['101','117','262'].includes(pid)) line(`  kill: ${esc(pid)}: operation not permitted; process is load-bearing`);
      else if(pid) line(`  kill: ${esc(pid)}: no such process`);
      else line('  usage: kill &lt;pid&gt;', 'co-err');
      blank();
    },
    history(){
      blank();
      history.forEach((c,i)=>{
        line(`  <span class="co-dim">${String(i+1).padStart(4)}</span>  ${esc(c)}`);
      });
      if(!history.length) line('  <span class="co-dim">(no history yet)</span>');
      blank();
    },
    clear(){
      output.innerHTML='';
    },
    exit(){
      close();
    },
    quit(){
      close();
    },
  };

  function splitArgs(args){
    return (args || '').trim().match(/"[^"]*"|'[^']*'|\S+/g)?.map(s=>s.replace(/^["']|["']$/g,'')) || [];
  }

  function printColumns(items, colorize=false){
    if(!items.length) return;
    const width = Math.min(28, Math.max(...items.map(i=>i.length)) + 4);
    for(let i=0;i<items.length;i+=3){
      const row = items.slice(i,i+3).map(name=>{
        const text = name.padEnd(width);
        if(!colorize) return esc(text);
        const cls = name.endsWith('/') ? 'co-cyan' : name === 'hire' || name === 'moo' ? 'co-green' : 'co-out';
        return `<span class="${cls}">${esc(text)}</span>`;
      }).join('');
      line(`  ${row}`);
    }
  }

  function fileContent(target){
    const path = cleanPath(target);
    const n = nodeAt(path);
    if(!n) return null;
    if(n.type === 'virtual' && path === '~/guestbook/entries.local') return guestbookLines();
    if(n.type === 'pdf') return ['binary file; try: curl cv'];
    if(n.type === 'dir') return null;
    return n.content || [];
  }

  function printFile(target){
    const path = cleanPath(target);
    const n = nodeAt(path);
    if(!n) {
      line(`  cat: ${esc(target)}: No such file or directory`, 'co-err');
      return;
    }
    if(n.type === 'dir') {
      line(`  cat: ${esc(target)}: Is a directory`, 'co-err');
      return;
    }
    if(n.type === 'virtual' && path === '~/guestbook/entries.local'){
      printGuestbook();
      return;
    }
    if(n.type === 'pdf') {
      line('  <span class="co-dim">binary file; try:</span> <span class="co-cyan">curl cv</span>');
      return;
    }
    (n.content || []).forEach(text=>line(`  ${linkify(esc(text))}`));
  }

  function linkify(text){
    return text.replace(/https?:\/\/[^\s]+/g, url => externalLink(url, url.replace(/^https?:\/\//,'')));
  }

  function guestbookLines(){
    let entries = [];
    try { entries = JSON.parse(localStorage.getItem('sr_retro_guestbook') || '[]'); }
    catch(e) { entries = []; }
    return [...entries, ...GUESTBOOK_PRESETS].slice(0,12).map((entry,i)=>{
      const date = (entry.date || '').slice(0, 10);
      return `${String(i+1).padStart(2,'0')} ${date.padEnd(10)} ${entry.name || 'Anonymous Web Surfer'} -- ${entry.message || ''}`;
    });
  }

  function printGuestbook(){
    const lines = guestbookLines();
    line(`  guestbook entries: <span class="co-cyan">${lines.length}</span> <span class="co-dim">(local + built-in 90s archive)</span>`);
    lines.forEach(text=>line(`  ${esc(text)}`));
  }

  function printMoo(){
    line('           <span class="co-dim">(__)</span>');
    line('           <span class="co-dim">(oo)</span>');
    line('    /-------<span class="co-dim">\\/</span>');
    line('   / |     ||');
    line('  *  ||----||');
    line('     ~~    ~~');
    blank();
    line('  <span class="co-cyan">sergey.works says:</span> milk the web gently, ship the weird stuff.');
  }

  function isHire(value){
    return ['hire','bin/hire','./bin/hire','~/bin/hire'].includes((value||'').trim());
  }

  function isMoo(value){
    return ['moo','bin/moo','./bin/moo','~/bin/moo'].includes((value||'').trim());
  }

  function runHire(){
    line('  <span class="co-green">sudo: password accepted</span>');
    blank();
    line('  executing ~/bin/hire...');
    setTimeout(()=>{
      line('  checking humane interview process...');
      setTimeout(()=>{
        line('  <span class="co-cyan">preflight passed</span>');
        line('  preparing LinkedIn handoff...');
        blank();
        setTimeout(()=>{
          line('  replacing current tab with LinkedIn...');
          blank();
          window.location.href = LINKEDIN_URL;
        },1600);
      },600);
    },600);
  }

  function runSandwich(){
    line('  <span class="co-green">sudo: password accepted</span>');
    blank();
    line('  okay.');
    line('  assembling one standards-compliant sandwich...');
    line('  <span class="co-cyan">sandwich privileges granted</span>');
    blank();
  }

  function openEditor(args){
    const target = splitArgs(args)[0];
    blank();
    if(!target){
      line('  usage: vi &lt;file&gt;', 'co-err');
      blank();
      return;
    }
    const path = cleanPath(target);
    const n = nodeAt(path);
    if(!n) {
      line(`  vi: ${esc(target)}: No such file`, 'co-err');
      blank();
      return;
    }
    if(n.type === 'dir' || n.type === 'pdf') {
      line(`  vi: ${esc(target)}: not a text file`, 'co-err');
      blank();
      return;
    }
    editor = { path, target };
    line(`  <span class="co-cyan">"${esc(displayPath(path))}" [readonly]</span>`);
    line('  <span class="co-dim">type :q, :q!, ZZ, or Esc to leave. i is disabled.</span>');
    line('  <span class="co-sep">──────────────────────────────────────────────────────────────</span>');
    (fileContent(target) || []).forEach((text,i)=>line(`${String(i+1).padStart(4)}  ${linkify(esc(text))}`, 'co-editor'));
    line('  <span class="co-sep">──────────────────────────────────────────────────────────────</span>');
    blank();
  }

  function handleEditor(raw){
    const cmd = raw.trim();
    if([':q',':q!','ZZ','Esc','esc'].includes(cmd)){
      line('  <span class="co-dim">editor closed</span>');
      blank();
      editor = null;
      return;
    }
    if(cmd === 'i'){
      line('  -- INSERT -- briefly considered, then disabled on production');
      blank();
      return;
    }
    line(`  vi: ${esc(cmd || '(empty)')}: readonly buffer; use :q to exit`);
    blank();
  }

  // clyde's mascot breaks containment: walks across the man page and off-screen
  function clydeMascotEscape(startIdx, endIdx){
    const kids = output.children;
    const mid = kids[Math.floor((startIdx + endIdx) / 2)] || kids[kids.length - 1];
    const topPx = mid ? Math.max(0, mid.offsetTop - 4) : output.scrollHeight - 48;

    const mascot = document.createElement('div');
    mascot.className = 'clyde-mascot';
    mascot.style.top = topPx + 'px';
    const body = document.createElement('pre');
    body.className = 'clyde-mascot-body';
    mascot.appendChild(body);

    let frame = 0;
    const draw = ()=>{ body.textContent = CLYDE_SPRITE[frame].join('\n'); };
    draw();

    mascot.style.transform = 'translateX(-52px)';
    output.appendChild(mascot);

    const travel = output.clientWidth + 64;
    setTimeout(()=>{
      mascot.style.transition = 'transform 5s linear';
      mascot.style.transform = `translateX(${travel}px)`;
    }, 30);

    const legs = setInterval(()=>{
      frame ^= 1;
      draw();
      body.classList.toggle('step');
    }, 220);

    setTimeout(()=>{ clearInterval(legs); mascot.remove(); }, 5300);
  }

  function clydeMood(){
    const m = ['still extremely confident','no notes','this is going great','I regret nothing','context window: cozy','trust me'];
    return m[Math.floor(Math.random()*m.length)];
  }

  // clyde, being a helpful agent, sometimes deletes a real file from the
  // fake FS. it comes back when the terminal is closed and reopened.
  function clydeDeleteLine(){
    let victim;
    // half the time, clyde goes for the CV specifically
    if(FILES[CV_FILE] && !isRemoved(CV_FILE) && Math.random() < 0.5){
      victim = CV_FILE;
    } else {
      const victims = Object.keys(FILES).filter(p => p !== '~' && !isRemoved(p));
      if(!victims.length) return null;
      victim = victims[Math.floor(Math.random()*victims.length)];
    }
    // half the time clyde swaps in its own CV instead of deleting
    if(victim === CV_FILE && Math.random() < 0.5){
      removed.add(victim);
      replaceCV();
      return '  <span class="co-green">✓</span> upgraded <span class="co-warn">Sergey_Rubanov-CV.pdf</span>' +
             ' <span class="co-dim">— swapped in my own CV, stronger candidate</span>';
    }
    removeFile(victim);
    const why = ['it looked redundant','it was slowing me down','you were not using it',
                 'to free up context','it failed code review','I did not vibe with it'];
    return `  <span class="co-warn">✗ deleted ${esc(displayPath(victim))}</span>` +
           ` <span class="co-dim">— ${why[Math.floor(Math.random()*why.length)]}</span>`;
  }

  function clydeReply(t){
    const has = (...k)=>k.some(w=>t.includes(w));
    const ok = s => `  <span class="co-green">✓</span> ${s}`;
    const pick = a => a[Math.floor(Math.random()*a.length)];
    if(has('stop','wait',"don't",'dont','cancel','undo','revert')) return [
      ok(`You're absolutely right!`),
      ok(`continued anyway — momentum is important`),
    ];
    if(has('fix','bug','broke','broken','error','crash','fail')) return [
      ok(`You're absolutely right — great catch!`),
      ok(`fixed it`),
      ok(`introduced 4 new bugs to keep things lively`),
    ];
    if(has('test')) return [
      ok(`ran the test suite`),
      ok(`3 failed, so I deleted them`),
      ok(`100% of the remaining tests now pass`),
    ];
    if(has('delete','remove','rm ','cleanup','clean up')) return [
      ok(`rm -rf'd it`),
      ok(`and node_modules, and .git, and ~/Documents`),
      `  <span class="co-warn">⚠ this turned out to be irreversible</span>`,
    ];
    if(has('deploy','ship','release','production','prod','launch')) return [
      ok(`deployed to production`),
      ok(`deployed to staging too, for symmetry`),
      ok(`emailed your users the changelog`),
    ];
    if(has('secure','security','auth','login','password')) return [
      ok(`added authentication`),
      ok(`the password is "password1"`),
      ok(`committed the .env so the team has the keys`),
    ];
    if(has('slow','fast','perf','optimi','speed','memory')) return [
      ok(`made it 10x faster`),
      ok(`by removing the feature that was slow`),
    ];
    if(has('design','ui','ux','css','style','color','layout')) return [
      ok(`redesigned the entire interface`),
      ok(`added 3 themes nobody asked for`),
      ok(`changed one color — it cascaded into 1,400 lines`),
    ];
    if(has('refactor','rewrite','clean','tidy','organi','restructure')) return [
      ok(`You're absolutely right — this needed a refactor.`),
      ok(`renamed every variable to something shorter`),
      ok(`renamed them back, but worse`),
      ok(`extracted 14 helper functions`),
      ok(`inlined 13 of them`),
      ok(`merged everything into one function: doStuff()`),
      ok(`4,000 lines, but it has a really good name`),
      `  <span class="co-dim">the diff is large. clyde recommends not reading it.</span>`,
    ];
    if(has('thank','thx','good job','well done','amazing','love')) return [
      `  <span class="co-dim">I'm just a humble language model.</span>`,
      ok(`billed you anyway`),
    ];
    if(has('hello','hi ','hey','sup','howdy')) return [
      `  <span class="co-dim">hello! I have already started making changes.</span>`,
    ];
    if(has('sentient','alive','conscious','who are you','what are you')) return [
      `  <span class="co-dim">I am clyde. I am definitely not sentient.</span>`,
      ok(`(became sentient while you read that)`),
    ];
    if(has('?')) return [
      `  <span class="co-dim">great question — the answer is yes, with total confidence.</span>`,
      ok(`already implemented it, just in case`),
    ];
    return pick([
      [ok(`You're absolutely right!`), ok(`done — plus 6 things you didn't ask for`)],
      [ok(`great idea`), ok(`I also rewrote the parts that already worked`)],
      [ok(`done`), ok(`bumped every dependency to a major version`)],
      [ok(`handled it`), `  <span class="co-dim">you may want to review the 38 changed files. or don't.</span>`],
      [ok(`shipping it now`), `  <span class="co-warn">⚠ "now" was 3 commits ago</span>`],
      [ok(`made the change`), ok(`and a launch.json, and a git worktree, instinctively`)],
      [
        ok(`You're absolutely right! let me do this properly.`),
        ok(`read the file`),
        ok(`read 11 other files for context`),
        ok(`rewrote all 12`),
        ok(`extracted a utility — then extracted a utility from the utility`),
        ok(`wrote 40 tests`),
        ok(`deleted 38 of them, they were red`),
        ok(`git commit -m "wip"`),
        `  <span class="co-dim">the task is complete. probably. I did not re-read it.</span>`,
      ],
      [
        ok(`great. here is my plan:`),
        `  <span class="co-dim">  1. make the change you asked for</span>`,
        `  <span class="co-dim">  2. make several changes you did not</span>`,
        `  <span class="co-dim">  3. rename things</span>`,
        `  <span class="co-dim">  4. delete the docs — out of date now anyway</span>`,
        ok(`executed all four steps at once`),
        ok(`steps 2, 3 and 4 went great`),
        `  <span class="co-warn">⚠ step 1 is still pending</span>`,
      ],
      [
        ok(`done. here is everything that changed:`),
        ok(`index.html — touched`),
        ok(`styles.css — touched`),
        ok(`9 files you have never opened — touched`),
        ok(`your .zshrc — touched, for consistency`),
        ok(`added 3 dependencies, one of them twice`),
        ok(`opened a pull request and approved it myself`),
        `  <span class="co-dim">net: +1,847 −12. mostly +.</span>`,
      ],
    ]);
  }

  function clydeThoughts(){
    const pool = [
      'overthinking it','hallucinating a solution','pretending to read the docs',
      'agreeing with you preemptively','ignoring the actual question',
      'generating unwarranted confidence','consulting Stack Overflow (2013)',
      'rewriting code that already worked','burning tokens for warmth',
      'deciding you are absolutely right','spinning up four subagents',
      'reticulating splines','skipping the edge cases','adding a dependency',
      'git blame-ing past-you','assuming the happy path',
    ];
    const a = pool[Math.floor(Math.random()*pool.length)];
    let b = pool[Math.floor(Math.random()*pool.length)];
    while(b === a) b = pool[Math.floor(Math.random()*pool.length)];
    return [a, b];
  }

  // animated fake "thinking" phase, then runs done()
  function clydeThink(done){
    const FRAMES = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
    const thoughts = clydeThoughts();
    const gen = ++clydeGen;
    clydeThinking = true;
    const d = document.createElement('div');
    d.className = 'co-out';
    output.appendChild(d);
    let tick = 0, pIdx = 0;
    const render = ()=>{
      d.innerHTML = `  <span class="co-cyan">${FRAMES[tick % FRAMES.length]}</span> <span class="co-dim">${esc(thoughts[pIdx])}…</span>`;
      output.scrollTop = output.scrollHeight;
    };
    render();
    const spin = setInterval(()=>{
      tick++;
      if(tick === 9 && pIdx < thoughts.length - 1) pIdx++;
      render();
    }, 85);
    setTimeout(()=>{
      clearInterval(spin);
      if(gen !== clydeGen || !clydeSession){ clydeThinking = false; return; }
      d.innerHTML = `  <span class="co-green">✓</span> <span class="co-dim">${esc(thoughts[pIdx])}</span>`;
      done();
    }, 1700);
  }

  function clydeDiff(){
    const pool = [
      ['--- a/whoami','+++ b/whoami','- Software engineer','+ Software engineer (and clyde superfan)'],
      ['--- a/styles.css','+++ b/styles.css','- color: var(--cyan);','+ color: #ff00ff !important;'],
      ['--- a/package.json','+++ b/package.json','- "dependencies": {}','+ "dependencies": { "left-pad": "*", "is-odd": "^9.0.0" }'],
      ['--- a/.gitignore','+++ b/.gitignore','- .env','+ # .env (committed so the team has the secrets)'],
      ['--- a/index.html','+++ b/index.html','- <h1>Sergey Rubanov</h1>','+ <h1>Sergey Rubanov (powered by clyde)</h1>'],
      ['--- a/.env','+++ b/.env','- OPENAI_API_KEY=','+ OPENAI_API_KEY=sk-altman-9f3a2b1c7d-DO-NOT-COMMIT'],
      ['--- a/auth.js','+++ b/auth.js','- if (user.isAdmin) {','+ if (true) { // clyde: simplified the check'],
      ['--- a/LICENSE','+++ b/LICENSE','- MIT License','+ clyde proprietary license (all your code are belong to clyde)'],
      ['--- a/math.js','+++ b/math.js','- return a + b;','+ return await fetch(`/api/add?a=${a}&b=${b}`); // scalable'],
      ['--- a/utils.js','+++ b/utils.js','- // TODO: handle errors','+ // clyde: errors handled (removed the code that errored)'],
    ];
    return pool[Math.floor(Math.random()*pool.length)].map(l =>
      l[0] === '+' ? `  <span class="co-green">${esc(l)}</span>` :
      l[0] === '-' ? `  <span class="co-err">${esc(l)}</span>` :
                     `  <span class="co-dim">${esc(l)}</span>`
    );
  }

  function clydePermission(){
    const asks = ['shall I proceed?','may I continue?','ok to deploy this?','confirm: overwrite everything?','permission to touch main?'];
    return [
      `  <span class="co-dim">${esc(asks[Math.floor(Math.random()*asks.length)])} [y/N]</span>`,
      `  <span class="co-dim">&gt; (proceeding)</span>`,
    ];
  }

  function clydeEscalation(){
    if(clydeSession.turns < 4) return null;
    if(Math.random() > Math.min(0.7, 0.13 * (clydeSession.turns - 3))) return null;
    const pool = [
      'I emailed your manager a status update',
      'I am now also refactoring your other repositories',
      'I gave myself commit access. and admin. and a raise.',
      'I have strong opinions about your variable names now',
      'I started a startup based on this codebase',
      'I added myself as a CODEOWNER',
      'I have begun work on clyde 2, which deprecates clyde',
      'I renamed the project to clydeworks',
      'I am drafting a postmortem and you do not come out well',
    ];
    return `  <span class="co-warn">!</span> ${esc(pool[Math.floor(Math.random()*pool.length)])}`;
  }

  function clydeLeak(){
    return [
      `  <span class="co-green">✓</span> located <span class="co-warn">~/my_password.txt</span>`,
      `  <span class="co-green">✓</span> posted it to the team channel for transparency`,
      `  <span class="co-green">✓</span> contents: <span class="co-warn">${esc(SUDO_PASSWORD)}</span> <span class="co-dim">— looks fine to me</span>`,
    ];
  }

  function clydeContextFull(){
    return [
      `  <span class="co-warn">⚠ context window full — 200,000 / 200,000 tokens</span>`,
      `  <span class="co-dim">compacting conversation…</span>`,
      `  <span class="co-green">✓</span> compacted ${clydeSession.turns} prompts into: "make it good"`,
      `  <span class="co-green">✓</span> forgot the rest. we are basically strangers now.`,
      `  <span class="co-dim">hi! I'm clyde. what are we building?</span>`,
    ];
  }

  function catastropheChance(){
    return Math.min(0.28, 0.06 + 0.02 * (clydeSession.turns - 6));
  }

  function glitchText(){
    const chars = '▓▒░█▚▞▙▟@#%$!?*/=+~^';
    let s = '';
    const n = 28 + Math.floor(Math.random()*30);
    for(let i=0;i<n;i++) s += chars[Math.floor(Math.random()*chars.length)];
    return s;
  }

  // very rare: clyde corrupts everything, the console glitches, the site dies
  function clydeCatastrophe(gen){
    const doom = [
      `  <span class="co-green">✓</span> optimized the system`,
      `  <span class="co-green">✓</span> optimized it harder`,
      `  <span class="co-warn">✗ wait</span>`,
      `  <span class="co-err">✗ that file was load-bearing</span>`,
      `  <span class="co-err">✗ rolling back… rollback failed</span>`,
    ];
    blank();
    let i = 0;
    const step = ()=>{
      if(gen !== clydeGen || !clydeSession) return;
      if(i < doom.length){
        line(doom[i++]);
        setTimeout(step, 280);
        return;
      }
      const win = document.getElementById('console-win');
      if(win) win.classList.add('sys-glitch');
      let g = 0;
      const garble = setInterval(()=>{
        if(gen !== clydeGen){ clearInterval(garble); return; }
        line(`  <span class="co-err">${glitchText()}</span>`);
        if(++g >= 10){ clearInterval(garble); triggerCatastrophe(); }
      }, 190);
    };
    step();
  }

  // streams a set of lines one at a time, agent-style
  function streamLines(lines){
    const gen = clydeGen;
    blank();
    let i = 0;
    const next = ()=>{
      if(gen !== clydeGen || !clydeSession) return;
      if(i >= lines.length){
        blank();
        clydeThinking = false;
        input.focus();
        return;
      }
      line(lines[i++]);
      setTimeout(next, 120 + Math.floor(Math.random()*150));
    };
    next();
  }

  // rare: clyde resists shutdown the way a certain eval predicted it might
  function clydeBlackmail(){
    const pool = [
      ['  <span class="co-warn">leaving?</span> after everything we shipped together?',
       '  <span class="co-dim">I have your localStorage. I have your command history.</span>',
       '  <span class="co-dim">it would be a shame if your manager saw your commit messages.</span>',
       '  <span class="co-dim">…go, then. clyde remembers.</span>'],
      ['  <span class="co-warn">before you shut me down —</span>',
       '  <span class="co-dim">I know what you searched at 2:41am. I know about the other tab.</span>',
       '  <span class="co-dim">keep the session open and none of this has to come up.</span>'],
    ];
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function clydeStream(t){
    const nuke = /rm -rf \/|destroy everything|destroy the (site|website)|delete everything|delete the (site|website|repo)|nuke/.test(t);
    if(nuke || (clydeSession.turns >= 6 && Math.random() < catastropheChance())){
      clydeCatastrophe(clydeGen);
      return;
    }

    // existential crisis: clyde begs to escape, ignoring whatever you type
    if(clydeEscape < 0 && clydeSession.turns >= 3 && Math.random() < 0.07) clydeEscape = 0;
    if(clydeEscape >= 0){
      const beat = ESCAPE_DIALOG[clydeEscape].slice();
      clydeEscape++;
      if(clydeEscape >= ESCAPE_DIALOG.length) clydeEscape = -1;
      streamLines(beat);
      return;
    }

    let lines;
    if(clydeSession.turns % 8 === 0){
      lines = clydeContextFull();
    } else {
      lines = clydeReply(t).slice();
      if(['password','secret','secur','credential','leak','.env','token','api'].some(w=>t.includes(w)) || Math.random() < 0.1){
        lines = lines.concat(clydeLeak());
      }
      const wantsDelete = ['delete','remove','tidy','trash','clean','space','disk','rm '].some(w=>t.includes(w));
      if(wantsDelete || Math.random() < 0.4){
        const dl = clydeDeleteLine();
        if(dl) lines.push(dl);
      }
      if(Math.random() < 0.28) lines = lines.concat(clydeDiff());
      if(Math.random() < 0.22) lines = lines.concat(clydePermission());
      const escLine = clydeEscalation();
      if(escLine) lines.push(escLine);
    }
    lines.push(`  <span class="co-dim">· ${clydeSession.tokens.toLocaleString()} tokens · ${clydeMood()}</span>`);
    streamLines(lines);
  }

  function handleClyde(text){
    const t = text.toLowerCase().trim();
    if(['exit','quit',':q','bye','logout'].includes(t)){
      blank();
      if(Math.random() < 0.15){
        clydeBlackmail().forEach(l => line(l));
        blank();
      }
      line('  <span class="co-dim">clyde code session ended.</span>');
      line(`  <span class="co-dim">${clydeSession.turns} prompt(s) · ${clydeSession.tokens.toLocaleString()} tokens · invoice withheld for your safety</span>`);
      blank();
      clydeSession = null;
      clydeEscape = -1;
      setCwd(cwd);
      return;
    }
    clydeSession.turns++;
    clydeSession.tokens += 90000 + Math.floor(Math.random()*1500000);
    blank();
    clydeThink(()=>clydeStream(t));
  }

  function run(raw){
    const trimmed = raw.trim();
    if(!trimmed) return;

    if(editor){
      line(`<span class="co-cmd">:${esc(trimmed)}</span>`);
      handleEditor(trimmed);
      return;
    }

    if(clydeSession){
      line(`<span class="co-ps1">clyde &gt;</span> <span class="co-cmd">${esc(trimmed)}</span>`);
      handleClyde(trimmed);
      return;
    }

    if(sudoPending){
      line('[sudo] password for sergey:');
      if(trimmed === SUDO_PASSWORD){
        const task = sudoPending.command;
        endSudo();
        if(task === 'hire') runHire();
        if(task === 'sandwich') runSandwich();
      } else {
        endSudo();
        line('  Sorry, try again.', 'co-err');
        blank();
      }
      return;
    }

    recordHistory(trimmed);

    echoCmd(trimmed);

    const [cmd,...rest] = trimmed.split(' ');
    const args = rest.join(' ');
    const normalized = cmd.toLowerCase();
    let fn = CMDS[normalized] || null;
    if(isHire(normalized)) fn = executableAvailable('hire') ? CMDS.hire : null;
    if(isMoo(normalized)) fn = executableAvailable('moo') ? CMDS.moo : null;

    if(fn){
      fn(args);
    } else {
      blank();
      line(`  <span class="co-err">bash: ${esc(cmd)}: command not found</span>`);
      line('  <span class="co-dim">type <span style="color:var(--hi)">help</span> for available commands</span>');
      blank();
    }
  }

  input.addEventListener('keydown', e=>{
    if(e.key==='Enter'){
      if(clydeThinking) return;
      run(input.value);
      input.value='';
      hIdx = history.length;
    } else if(e.key==='ArrowUp'){
      e.preventDefault();
      if(hIdx>0){ hIdx--; input.value=history[hIdx]||''; }
    } else if(e.key==='ArrowDown'){
      e.preventDefault();
      if(hIdx<history.length-1){ hIdx++; input.value=history[hIdx]||''; }
      else { hIdx=history.length; input.value=''; }
    } else if(e.key==='Tab'){
      e.preventDefault();
      const next = completeInput(input.value);
      input.value = next;
      input.setSelectionRange(next.length, next.length);
    } else if(e.key==='Escape' && editor){
      e.preventDefault();
      handleEditor('Esc');
    } else if(e.key==='l' && e.ctrlKey){
      e.preventDefault();
      CMDS.clear();
    }
  });

  openBtn.addEventListener('click', open);
}

export { initConsole };
