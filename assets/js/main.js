/* =========================================================
   Divya Prabhu · Portfolio · main.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Each feature is isolated: if one throws, the rest of the page still initializes.
  const features = [
    initLoader, initTheme, initCustomCursor, initMagneticButtons, initBackgroundCanvas,
    initTypewriter, initNav, initReveal, initCounters, initBetaCellDemo, initNeuronDemo,
    initDemoModeToggle, initCalciumChart, initSkills, initTimeline, initProjects, initPublications, initBlogs,
    initCertifications, initAchievements, initTestimonials, initContact, initScrollRing,
  ];
  features.forEach(fn => {
    try { fn(); } catch (err) { console.error(`[portfolio] ${fn.name} failed:`, err); }
  });
});

/* ---------------- Loader ---------------- */
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 300);
  });
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800);
}

/* ---------------- Theme toggle ---------------- */
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('i');
  const saved = localStorage.getItem('dp-theme');
  if (saved === 'light') { root.setAttribute('data-theme', 'light'); icon.className = 'fa-solid fa-sun'; }

  btn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      icon.className = 'fa-solid fa-moon';
      localStorage.setItem('dp-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      icon.className = 'fa-solid fa-sun';
      localStorage.setItem('dp-theme', 'light');
    }
  });
}

/* ---------------- Custom cursor (glow + dot) ---------------- */
function initCustomCursor() {
  const glow = document.getElementById('glow');
  const dot = document.getElementById('dot');
  if (!glow || !dot) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  let gx = window.innerWidth / 2, gy = window.innerHeight / 2, mx = gx, my = gy;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function animate() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

/* ---------------- Magnetic buttons ---------------- */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
  });
}

/* ---------------- Background particle network ---------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, nodes;
  const NODE_COUNT = Math.min(70, Math.floor(window.innerWidth / 18));

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = document.documentElement.scrollHeight; }
  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * Math.min(h, window.innerHeight * 1.4),
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 0.6,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const viewLimit = window.innerHeight * 1.4;
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > viewLimit) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(148,205,255,${(1 - dist / 140) * 0.32})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(148,205,255,0.7)'; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize(); makeNodes(); draw();
  window.addEventListener('resize', resize);
}

/* ---------------- Typewriter ---------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  const phrases = ['Translational Scientist', 'Bioengineer & Imaging Researcher', 'iPSC Disease Modeling', 'Drug Discovery Enthusiast'];
  let p = 0, c = 0, deleting = false;
  function tick() {
    const word = phrases[p];
    el.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);
    let delay = deleting ? 40 : 70;
    if (!deleting && c === word.length + 1) { deleting = true; delay = 1400; }
    else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ---------------- Nav ---------------- */
function initNav() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const burger = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  links.forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

  const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));

  function onScroll() {
    navbar.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -15px rgba(0,0,0,0.4)' : '';
    let current = null;
    for (const sec of sections) {
      if (!sec) continue;
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom >= 140) current = sec.id;
    }
    links.forEach(l => l.classList.toggle('active', current && l.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* ---------------- Scroll reveal ---------------- */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---------------- Animated counters ---------------- */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-num').forEach(n => obs.observe(n));
}

/* ---------------- Signature demo: islet alpha/beta calcium wave ---------------- */
function initBetaCellDemo() {
  const grid = document.getElementById('cellGrid');
  if (!grid) return;
  const GRID_COLS = 16, GRID_ROWS = 6, N = GRID_COLS * GRID_ROWS;
  const ALPHA_RATIO = 0.22; // ~22% alpha cells, majority beta - roughly matches islet composition
  const cells = [];
  const types = [];

  for (let i = 0; i < N; i++) {
    const isAlpha = Math.random() < ALPHA_RATIO;
    types.push(isAlpha ? 'alpha' : 'beta');
    const d = document.createElement('div');
    d.className = 'cell ' + (isAlpha ? 'alpha' : 'beta');
    d.dataset.i = i;
    d.title = isAlpha ? 'α-cell (glucagon+)' : 'β-cell (insulin+)';
    grid.appendChild(d); cells.push(d);
  }

  const betaCount = types.filter(t => t === 'beta').length;
  const alphaCount = N - betaCount;
  const countBetaEl = document.getElementById('countBeta');
  const countAlphaEl = document.getElementById('countAlpha');
  if (countBetaEl) countBetaEl.textContent = betaCount;
  if (countAlphaEl) countAlphaEl.textContent = alphaCount;

  let fired = 0, waves = 0;
  const statFired = document.getElementById('statFired');
  const statWaves = document.getElementById('statWaves');
  const statLatency = document.getElementById('statLatency');
  const status = document.getElementById('demoStatus');

  function coords(i) { return { x: i % GRID_COLS, y: Math.floor(i / GRID_COLS) }; }

  function pulseAlpha(cell) {
    if (status) status.textContent = 'That’s an α-cell (glucagon+): it secretes glucagon under low glucose and doesn’t join the glucose-stimulated calcium wave. Try a green β-cell instead.';
    cell.classList.add('pulse');
    setTimeout(() => cell.classList.remove('pulse'), 320);
  }

  function triggerWave(originIdx) {
    const originType = types[originIdx];
    if (originType === 'alpha') { pulseAlpha(cells[originIdx]); return; }

    waves++; if (statWaves) statWaves.textContent = waves;
    const o = coords(originIdx);
    let maxDelay = 0;
    let activated = 0;

    cells.forEach((cell, i) => {
      if (types[i] !== 'beta') return; // only beta cells participate in the calcium wave
      const p = coords(i);
      const dist = Math.hypot(p.x - o.x, p.y - o.y);
      const delay = dist * 70;
      maxDelay = Math.max(maxDelay, delay);
      activated++;
      setTimeout(() => {
        cell.classList.add('active');
        fired++; if (statFired) statFired.textContent = fired;
        setTimeout(() => cell.classList.remove('active'), 260);
      }, delay);
    });

    if (status) status.textContent = `Calcium wave triggered from a β-cell, propagating outward to ${activated} neighboring β-cells. α-cells (red) stay dark; they don’t carry this signal.`;
    setTimeout(() => { if (statLatency) statLatency.textContent = Math.round(maxDelay); }, maxDelay + 50);
  }

  let hoverLock = false;
  cells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      if (!hoverLock) { hoverLock = true; triggerWave(+cell.dataset.i); setTimeout(() => (hoverLock = false), 500); }
    });
    cell.addEventListener('click', () => triggerWave(+cell.dataset.i));
  });

  document.getElementById('resetDemo').addEventListener('click', () => {
    fired = 0; waves = 0;
    if (statFired) statFired.textContent = '0';
    if (statWaves) statWaves.textContent = '0';
    if (statLatency) statLatency.textContent = '–';
    if (status) status.textContent = 'Click a green β-cell to trigger a calcium wave, or a red α-cell to see why it doesn’t join in.';
    cells.forEach(c => c.classList.remove('active', 'pulse'));
  });
}

/* ---------------- Demo mode toggle (Islet / Neuron) ---------------- */
function initDemoModeToggle() {
  const buttons = document.querySelectorAll('.mode-btn');
  if (!buttons.length) return;
  const isletView = document.getElementById('isletView');
  const neuronView = document.getElementById('neuronView');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      const mode = btn.dataset.mode;
      isletView.classList.toggle('hidden', mode !== 't2d');
      neuronView.classList.toggle('hidden', mode !== 'pd');
    });
  });
}

/* ---------------- Signature demo: fibroblast -> cortical t-neuron growth ---------------- */
function initNeuronDemo() {
  const canvas = document.getElementById('neuronCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, CX = W / 2, CY = H / 2 + 10;

  const slider = document.getElementById('daySlider');
  const statDay = document.getElementById('statDay');
  const statStage = document.getElementById('statStage');
  const status = document.getElementById('neuronStatus');
  const lineBtns = document.querySelectorAll('.line-btn');
  let currentLine = 'control';

  // seeded PRNG so branch geometry stays stable while scrubbing, but differs by line
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildTree(seed) {
    const rnd = mulberry32(seed);
    const primaries = [];
    const PRIMARY_COUNT = 6;
    for (let i = 0; i < PRIMARY_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PRIMARY_COUNT + (rnd() - 0.5) * 0.5;
      const len1 = 55 + rnd() * 25;
      const secondaries = [];
      const secCount = 2 + Math.floor(rnd() * 2);
      for (let s = 0; s < secCount; s++) {
        const branchAt = 0.5 + rnd() * 0.35;
        const angleOff = (rnd() - 0.5) * 1.3;
        const len2 = 30 + rnd() * 22;
        const tertiaries = [];
        const terCount = 1 + Math.floor(rnd() * 2);
        for (let t = 0; t < terCount; t++) {
          tertiaries.push({ branchAt: 0.55 + rnd() * 0.35, angleOff: (rnd() - 0.5) * 1.1, len: 16 + rnd() * 14 });
        }
        secondaries.push({ branchAt, angleOff, len: len2, tertiaries });
      }
      primaries.push({ angle, len: len1, secondaries });
    }
    // punctae positions for PD-line synuclein accumulation (inside soma)
    const punctae = Array.from({ length: 10 }, () => ({ x: (rnd() - 0.5) * 24, y: (rnd() - 0.5) * 20, r: 1.5 + rnd() * 2 }));
    return { primaries, punctae };
  }

  const trees = { control: buildTree(11), pd: buildTree(77) };

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(x) { return Math.max(0, Math.min(1, x)); }

  function stageForDay(day) {
    if (day <= 2) return { name: 'Fibroblast', text: `Day ${day}: a patient skin fibroblast, before any reprogramming factors are switched on.` };
    if (day <= 5) return { name: 'Post-mitotic transition', text: `Day ${day}: the cell exits the cell cycle and begins losing its fibroblast identity as reprogramming factors switch on.` };
    if (day <= 7) return { name: 'Morphology loss', text: `Day ${day}: fibroblast morphology is lost; the cell rounds up and starts extending its first processes.` };
    if (day <= 12) return { name: 'Elongating processes', text: `Day ${day}: neurite outgrowth begins as the cell adapts to a neuron-specific culture environment.` };
    if (day <= 17) return { name: 'Early neuronal morphology', text: `Day ${day}: branching increases and the cell adopts an early cortical neuron shape.` };
    return {
      name: 'Complex processes, mature',
      text: currentLine === 'pd'
        ? `Day ${day}: a mature PD-line neuron. Published GBA-PD studies predict α-synuclein accumulation and reduced neurite complexity here, shown as puncta and shorter branches; this is illustrating that prediction, not data I've already measured.`
        : `Day ${day}: a mature cortical neuron, showing the complex, branching neurites typical of this stage.`,
    };
  }

  function drawBranch(x, y, angle, len, depth, sub, growthFactor, damp) {
    if (growthFactor <= 0) return;
    const l = len * growthFactor * damp;
    const x2 = x + Math.cos(angle) * l;
    const y2 = y + Math.sin(angle) * l;
    ctx.lineWidth = Math.max(1, 3.2 - depth * 0.9);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
    return { x: x2, y: y2 };
  }

  function draw(day) {
    ctx.clearRect(0, 0, W, H);
    const tree = trees[currentLine];
    const damp = currentLine === 'pd' ? 0.72 : 1; // PD-line: reduced neurite complexity

    // soma morph: fibroblast (flat/spindle) -> round mature soma
    const somaT = clamp01(day / 7);
    const somaW = lerp(64, 34, somaT);
    const somaH = lerp(22, 34, somaT);

    const strokeColor = currentLine === 'pd' ? '#f59e0b' : '#38bdf8';
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = currentLine === 'pd' ? 'rgba(245,158,11,0.16)' : 'rgba(56,189,248,0.16)';

    // neurites (drawn behind soma)
    const primaryT = clamp01((day - 5) / 7);
    const secondaryT = clamp01((day - 10) / 7);
    const tertiaryT = clamp01((day - 15) / 15);

    tree.primaries.forEach(p => {
      const end1 = drawBranch(CX, CY, p.angle, p.len, 0, 0, primaryT, damp);
      if (!end1 || secondaryT <= 0) return;
      p.secondaries.forEach(s => {
        const bx = CX + Math.cos(p.angle) * p.len * primaryT * s.branchAt * damp;
        const by = CY + Math.sin(p.angle) * p.len * primaryT * s.branchAt * damp;
        const end2 = drawBranch(bx, by, p.angle + s.angleOff, s.len, 1, 0, secondaryT, damp);
        if (!end2 || tertiaryT <= 0) return;
        s.tertiaries.forEach(t => {
          const tx = bx + (end2.x - bx) * t.branchAt;
          const ty = by + (end2.y - by) * t.branchAt;
          drawBranch(tx, ty, p.angle + s.angleOff + t.angleOff, t.len, 2, 0, tertiaryT, damp);
        });
      });
    });

    // soma
    ctx.beginPath();
    ctx.ellipse(CX, CY, somaW, somaH, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.lineWidth = 2; ctx.stroke();

    // alpha-synuclein punctae for PD-line, appearing as the neuron matures
    if (currentLine === 'pd' && tertiaryT > 0.15) {
      const count = Math.round(tertiaryT * tree.punctae.length);
      ctx.fillStyle = '#ef4444';
      for (let i = 0; i < count; i++) {
        const pnt = tree.punctae[i];
        ctx.beginPath();
        ctx.arc(CX + pnt.x, CY + pnt.y, pnt.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function render() {
    const day = +slider.value;
    draw(day);
    if (statDay) statDay.textContent = day;
    const stage = stageForDay(day);
    if (statStage) statStage.textContent = stage.name;
    if (status) status.textContent = stage.text;
  }

  slider.addEventListener('input', render);
  lineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lineBtns.forEach(b => b.classList.toggle('active', b === btn));
      currentLine = btn.dataset.line;
      render();
    });
  });

  render();
}

/* ---------------- Calcium chart with scrub (hand-drawn canvas, no external library) ---------------- */
let calciumTraces = null;
function initCalciumChart() {
  const canvas = document.getElementById('calciumChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const scrub = document.getElementById('scrub');
  const tVal = document.getElementById('tVal');
  const readout = document.getElementById('readout');
  if (!scrub || !readout) return;

  const N = 40;
  const labels = Array.from({ length: N }, (_, i) => i);

  function trace(peakAt, height, noise, seed) {
    let s = seed;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return labels.map(t => {
      const rise = 1 / (1 + Math.exp(-(t - peakAt) / 2));
      const decay = Math.exp(-Math.max(0, t - peakAt - 6) / 10);
      return +(height * rise * decay + (rnd() - 0.5) * noise).toFixed(3);
    });
  }

  const dataFirst = trace(6, 1.0, 0.03, 11);
  const dataMed = trace(16, 0.85, 0.03, 42);
  const dataLast = trace(28, 0.7, 0.03, 77);
  calciumTraces = { dataFirst, dataMed, dataLast };

  // Padding for axes/labels within the fixed-size canvas coordinate space.
  const PAD = { left: 46, right: 14, top: 16, bottom: 38 };

  function layout() {
    const w = canvas.width, h = canvas.height;
    return { w, h, plotW: w - PAD.left - PAD.right, plotH: h - PAD.top - PAD.bottom };
  }
  function xPix(i, L) { return PAD.left + (i / (N - 1)) * L.plotW; }
  function yPix(v, L) { const maxV = 1.15; return PAD.top + (1 - v / maxV) * L.plotH; }

  function drawTrace(data, color, L) {
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    data.forEach((v, i) => { const x = xPix(i, L), y = yPix(v, L); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
    ctx.stroke();
  }

  function draw() {
    const L = layout();
    ctx.clearRect(0, 0, L.w, L.h);

    // gridlines + y ticks
    ctx.strokeStyle = 'rgba(148,163,184,0.14)'; ctx.lineWidth = 1; ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#6b7794'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    [0, 0.25, 0.5, 0.75, 1.0].forEach(v => {
      const y = yPix(v, L);
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(L.w - PAD.right, y); ctx.stroke();
      ctx.fillText(v.toFixed(2), PAD.left - 8, y);
    });

    // x ticks
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    [0, 10, 20, 30, 39].forEach(t => {
      const x = xPix(t, L);
      ctx.fillText(String(t), x, L.h - PAD.bottom + 8);
    });
    ctx.fillText('Time (s), post glucose stimulation', PAD.left + L.plotW / 2, L.h - 16);

    // y axis title (rotated)
    ctx.save();
    ctx.translate(14, PAD.top + L.plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('Normalized ΔF/F₀', 0, 0);
    ctx.restore();

    // traces
    drawTrace(dataFirst, '#22d3ee', L);
    drawTrace(dataMed, '#a78bfa', L);
    drawTrace(dataLast, '#f472b6', L);

    // scrub line
    const idx = +scrub.value;
    const x = xPix(idx, L);
    ctx.save();
    ctx.strokeStyle = 'rgba(230,235,245,0.5)'; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, L.h - PAD.bottom); ctx.stroke();
    ctx.restore();

    // marker dots at the scrubbed instant
    [[dataFirst, '#22d3ee'], [dataMed, '#a78bfa'], [dataLast, '#f472b6']].forEach(([data, color]) => {
      const y = yPix(data[idx], L);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    });
  }

  function updateReadout() {
    const idx = +scrub.value;
    if (tVal) tVal.textContent = idx;
    readout.innerHTML = `
      <span>First: <b>${dataFirst[idx].toFixed(2)}</b></span>
      <span>Median: <b>${dataMed[idx].toFixed(2)}</b></span>
      <span>Last: <b>${dataLast[idx].toFixed(2)}</b></span>
    `;
    draw();
  }
  scrub.addEventListener('input', updateReadout);
  updateReadout();
}

/* ---------------- Skills data ---------------- */
const SKILL_CATEGORIES = [
  { key: 'drug', label: 'Drug Discovery', items: [
      ['Disease modeling (T2D, neurodegeneration, oncology)', 92],
      ['Functional assays (calcium imaging, flow cytometry, ELISA)', 90],
      ['Target engagement studies (Western blot, qPCR, IF)', 85],
      ['Phenotypic & high-content screening readouts', 88],
      ['Mechanism-of-action studies (siRNA, co-culture)', 84],
  ]},
  { key: 'cell', label: 'Cell-Based Platforms', items: [
      ['iPSC culture & directed differentiation', 93],
      ['Primary cell isolation (islets, PBMCs, fibroblasts)', 88],
      ['Co-culture systems & 3D models', 86],
      ['Cell line engineering (viral transduction, CRISPRi)', 78],
      ['Assay development & screening optimization', 85],
  ]},
  { key: 'invivo', label: 'In Vivo Pharmacology', items: [
      ['Transgenic mouse models (GCaMP6, disease lines)', 87],
      ['Xenograft tumor models', 80],
      ['In vivo dosing & sample collection', 82],
      ['Tissue processing & biomarker analysis (IHC, flow)', 85],
      ['Pharmacodynamic endpoint assessment', 80],
  ]},
  { key: 'analytical', label: 'Analytical Techniques', items: [
      ['Advanced microscopy (confocal, FLIM, FRAP, multiphoton)', 95],
      ['Molecular biology (PCR/qPCR, Western, ELISA, gel)', 88],
  ]},
  { key: 'data', label: 'Data & Automation', items: [
      ['High-throughput image analysis (MATLAB, ImageJ, Imaris)', 94],
      ['Statistical modeling (GraphPad Prism, R, Python)', 85],
      ['Pipeline development for automated data processing', 90],
      ['Database management (LIMS/ELN)', 88],
      ['Visualization & reporting (Power BI, Excel)', 82],
  ]},
  { key: 'pm', label: 'Project Management', items: [
      ['Agile project management (JIRA, Confluence)', 86],
      ['Regulatory compliance (GCP, GMP, FDA, HIPAA)', 84],
      ['SOP development & technical documentation', 90],
      ['Vendor management & technology transfer', 80],
      ['Training & cross-team knowledge sharing', 88],
  ]},
];


const CATEGORY_COLORS = {
  drug: '#22d3ee', cell: '#a78bfa', invivo: '#f472b6',
  analytical: '#34d399', data: '#38bdf8', pm: '#f59e0b',
};

/* ---------------- Skills scatter plot (hand-drawn canvas) ---------------- */
function initSkillScatter() {
  const canvas = document.getElementById('skillScatter');
  const caption = document.getElementById('scatterDesc');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PAD = { left: 54, right: 20, top: 20, bottom: 74 };
  const W = canvas.width, H = canvas.height;
  const plotW = W - PAD.left - PAD.right, plotH = H - PAD.top - PAD.bottom;
  const colW = plotW / SKILL_CATEGORIES.length;

  // build flat point list, one per skill, positioned by category column + proficiency height
  const points = [];
  SKILL_CATEGORIES.forEach((cat, ci) => {
    const n = cat.items.length;
    const colCenter = PAD.left + colW * (ci + 0.5);
    cat.items.forEach(([label, pct], j) => {
      const spread = Math.min(colW * 0.6, 70);
      const jitter = n > 1 ? (j - (n - 1) / 2) * (spread / n) : 0;
      points.push({
        x: colCenter + jitter,
        y: PAD.top + (1 - pct / 100) * plotH,
        label, pct, catKey: cat.key, catLabel: cat.label,
        color: CATEGORY_COLORS[cat.key] || '#22d3ee',
      });
    });
  });

  let selected = -1;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // horizontal gridlines + % labels
    ctx.strokeStyle = 'rgba(148,163,184,0.14)'; ctx.lineWidth = 1;
    ctx.font = '11px Inter, sans-serif'; ctx.fillStyle = '#6b7794'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    [0, 25, 50, 75, 100].forEach(v => {
      const y = PAD.top + (1 - v / 100) * plotH;
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
      ctx.fillText(v + '%', PAD.left - 10, y);
    });

    // column separators + category labels
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    SKILL_CATEGORIES.forEach((cat, ci) => {
      const x0 = PAD.left + colW * ci;
      if (ci > 0) {
        ctx.strokeStyle = 'rgba(148,163,184,0.1)'; ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(x0, PAD.top); ctx.lineTo(x0, PAD.top + plotH); ctx.stroke();
        ctx.setLineDash([]);
      }
      const cx = x0 + colW / 2;
      ctx.fillStyle = CATEGORY_COLORS[cat.key] || '#9aa7c2';
      const words = cat.label.split(' ');
      words.forEach((w, wi) => ctx.fillText(w, cx, PAD.top + plotH + 14 + wi * 13));
    });

    // points
    points.forEach((p, i) => {
      const isSel = i === selected;
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSel ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = isSel ? 1 : 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
      if (isSel) {
        ctx.lineWidth = 2; ctx.strokeStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(p.x, p.y, 11, 0, Math.PI * 2); ctx.stroke();
      }
    });
  }

  draw();

  function pointerToCanvas(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  canvas.addEventListener('click', (e) => {
    const pos = pointerToCanvas(e);
    let best = -1, bestDist = 16; // px threshold in canvas space
    points.forEach((p, i) => {
      const d = Math.hypot(p.x - pos.x, p.y - pos.y);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best === -1) return;
    selected = best;
    draw();
    if (caption) {
      const p = points[best];
      caption.textContent = `${p.label}: ${p.pct}% self-rated, part of ${p.catLabel}.`;
    }
  });
}

// Evidence tags: ties each self-rated skill to the real project/demo that backs it up.
// type "project" -> jumps to and expands that project card. type "section" -> jumps to
// the interactive demo and switches it to the right mode.
const SKILL_EVIDENCE = {
  'Disease modeling (T2D, neurodegeneration, oncology)': [
    { label: 'T2D thesis', type: 'project', id: 'cal' },
    { label: 'PD t-neurons', type: 'section', id: 'pd' },
    { label: 'CSF/glioblastoma model', type: 'project', id: 'csf' },
  ],
  'Functional assays (calcium imaging, flow cytometry, ELISA)': [
    { label: 'First responder analysis', type: 'project', id: 'beta' },
    { label: 'Calcium + NAD(P)H thesis', type: 'project', id: 'cal' },
  ],
  'Target engagement studies (Western blot, qPCR, IF)': [
    { label: 'α/β-cell IF staining', type: 'project', id: 'cal' },
  ],
  'Phenotypic & high-content screening readouts': [
    { label: 'Robotic microscopy, PD neurons', type: 'section', id: 'pd' },
  ],
  'Primary cell isolation (islets, PBMCs, fibroblasts)': [
    { label: 'Islet β-cell demo', type: 'section', id: 't2d' },
  ],
  'Assay development & screening optimization': [
    { label: 'First responder pipeline', type: 'project', id: 'beta' },
  ],
  'Transgenic mouse models (GCaMP6, disease lines)': [
    { label: 'T2D thesis', type: 'project', id: 'cal' },
  ],
  'Tissue processing & biomarker analysis (IHC, flow)': [
    { label: 'α/β-cell IF staining', type: 'project', id: 'cal' },
  ],
  'Pharmacodynamic endpoint assessment': [
    { label: 'CSF drug delivery model', type: 'project', id: 'csf' },
  ],
  'Advanced microscopy (confocal, FLIM, FRAP, multiphoton)': [
    { label: 'Calcium + NAD(P)H thesis', type: 'project', id: 'cal' },
    { label: 'PD biosensor imaging', type: 'section', id: 'pd' },
  ],
  'High-throughput image analysis (MATLAB, ImageJ, Imaris)': [
    { label: 'First responder analysis', type: 'project', id: 'beta' },
  ],
  'Statistical modeling (GraphPad Prism, R, Python)': [
    { label: 'T2D thesis stats', type: 'project', id: 'cal' },
  ],
  'Pipeline development for automated data processing': [
    { label: 'First responder pipeline', type: 'project', id: 'beta' },
  ],
  'Database management (LIMS/ELN)': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
  ],
  'Visualization & reporting (Power BI, Excel)': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
  ],
  'Agile project management (JIRA, Confluence)': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
  ],
  'Regulatory compliance (GCP, GMP, FDA, HIPAA)': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
    { label: 'FDA pathway strategy', type: 'project', id: 'ran' },
  ],
  'SOP development & technical documentation': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
  ],
  'Vendor management & technology transfer': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
  ],
  'Training & cross-team knowledge sharing': [
    { label: 'OpenSpecimen plug-in', type: 'project', id: 'biobank' },
  ],
};

function jumpToEvidence(type, id) {
  if (type === 'project') {
    const allBtn = document.querySelector('.filter-btn[data-key="all"]');
    if (allBtn) allBtn.click();
    const card = document.querySelector(`.project-card[data-id="${id}"]`);
    if (card) {
      card.classList.add('open');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.outline = '2px solid var(--accent)';
      setTimeout(() => { card.style.outline = ''; }, 1600);
    }
  } else if (type === 'section') {
    const modeBtn = document.querySelector(`.mode-btn[data-mode="${id}"]`);
    if (modeBtn) modeBtn.click();
    const demo = document.getElementById('demo');
    if (demo) demo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initSkills() {
  initSkillScatter();

  // detailed tabs + bars
  const tabsEl = document.getElementById('skillTabs');
  const panelsEl = document.getElementById('skillPanels');

  SKILL_CATEGORIES.forEach((cat, i) => {
    const tbtn = document.createElement('button');
    tbtn.className = 'tab-btn' + (i === 0 ? ' active' : '');
    tbtn.textContent = cat.label; tbtn.dataset.key = cat.key;
    tbtn.addEventListener('click', () => activateTab(cat.key));
    tabsEl.appendChild(tbtn);

    const panel = document.createElement('div');
    panel.className = 'tab-panel' + (i === 0 ? ' active' : '');
    panel.dataset.key = cat.key;
    panel.innerHTML = cat.items.map(([label, pct]) => {
      const evidence = SKILL_EVIDENCE[label];
      const chips = evidence
        ? `<div class="skill-evidence">${evidence.map(ev => `<button class="evidence-chip" data-type="${ev.type}" data-target="${ev.id}"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${ev.label}</button>`).join('')}</div>`
        : '';
      return `
      <div class="skill-item">
        <div class="skill-item-top"><span>${label}</span><span>${pct}%</span></div>
        <div class="skill-bar-bg"><div class="skill-bar-fill" data-pct="${pct}"></div></div>
        ${chips}
      </div>`;
    }).join('');
    panelsEl.appendChild(panel);
  });

  panelsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.evidence-chip');
    if (!chip) return;
    jumpToEvidence(chip.dataset.type, chip.dataset.target);
  });

  function activateTab(key) {
    tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.key === key));
    panelsEl.querySelectorAll('.tab-panel').forEach(p => {
      const active = p.dataset.key === key;
      p.classList.toggle('active', active);
      if (active) animateBars(p);
    });
  }
  function animateBars(panel) {
    panel.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = bar.dataset.pct + '%'; }));
    });
  }

  const skillsSection = document.getElementById('skills');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateBars(panelsEl.querySelector('.tab-panel.active')); obs.disconnect(); } });
  }, { threshold: 0.2 });
  obs.observe(skillsSection);
}

/* ---------------- Timeline data ---------------- */
const TIMELINE = [
  {
    date: 'Oct 2025 – Present', title: 'Research Associate III', org: 'J. David Gladstone Institutes, San Francisco, CA',
    context: 'Studying Parkinson’s Disease using patient-derived cortical neurons made by direct transdifferentiation rather than through an iPSC stage, which better preserves the aging-associated biology relevant to a late-onset disease.',
    bullets: [
      'Convert patient skin fibroblasts directly into cortical neurons ("t-neurons") using a four-factor, doxycycline-inducible lentiviral system (rtTA + miR-9/9*-124 + Myt1L + NeuroD2), bypassing the pluripotent stem cell stage entirely.',
      'Deploy a live-cell biosensor panel: a ratiometric lysosomal pH sensor, a photoconvertible α-synuclein turnover reporter, a mitochondrial morphology reporter, and a genetically encoded neurodegeneration/death indicator.',
      'Run longitudinal imaging on a robotic microscopy platform to track lysosomal function, protein turnover, and neuronal survival across multiple patient-derived lines over the multi-week conversion process.',
      'Earlier in this role, modeled frontotemporal dementia using iPSC-derived neuronal and immune cell types (NPCs, iNeurons, HPCs, iMGs, monocytes), running co-culture experiments to quantify inflammatory activation and neuronal toxicity across C9orf72 and TDP-43 genetic variants.',
      'Optimize protocols for cell maintenance, directed differentiation, and integration of primary patient cells to support ongoing disease-modeling screens.',
    ],
    tools: ['iPSC / t-neuron culture', 'Lentiviral transduction', 'Live-cell biosensors', 'Robotic microscopy', 'Longitudinal image analysis'],
  },
  {
    date: 'Apr 2024 – Aug 2025', title: 'Research Associate (M.S. Thesis)', org: 'Kravets Lab, UC San Diego, CA',
    context: 'My Master’s thesis: why do some β-cells respond to glucose faster than others, and does that timing difference reflect a difference in how the cell is metabolizing glucose? Answered using paired calcium imaging and fluorescence lifetime imaging (FLIM) on live mouse islets.',
    bullets: [
      'Aim 1: built a MATLAB pipeline to classify "first responder" vs. "last responder" β-cells from raw calcium traces; refining the pre-processing (trace smoothing + local minima detection) raised classification accuracy from about 60% to about 90%.',
      'Ran this across three conditions, standard glucose, high glucose, and palmitate (a fatty acid used to model lipotoxic stress), and confirmed β-cell response-timing heterogeneity in all three, with no statistically significant difference in the degree of heterogeneity between groups (Kruskal-Wallis, Dunn’s post-hoc).',
      'Aim 2: paired calcium imaging with FLIM on the same islets to measure NAD(P)H fluorescence lifetime, a read-out of oxidative phosphorylation vs. glycolysis, using phasor analysis to map metabolic state at the single-cell level.',
      'Compared metabolic shift (ΔBound/Total NAD(P)H) between first and last responders across all three conditions; found high intra-islet variability and no consistent, group-specific trend, evidence of substantial cell-to-cell metabolic heterogeneity even within a single islet.',
      'Used immunofluorescence (anti-insulin, anti-glucagon) to tell α- from β-cells within the same islet and connect metabolic shifts back to cell type.',
      'Separately, mapped immune-islet interactions in a Type 1 Diabetes side project using spatial transcriptomics and 4D confocal imaging.',
    ],
    tools: ['MATLAB', 'Calcium imaging', 'FLIM / phasor analysis', 'Immunofluorescence', 'Nonparametric statistics (GraphPad Prism)'],
  },
  {
    date: 'Sept 2023 – Aug 2025', title: 'M.S. in Bioengineering', org: 'University of California, San Diego', edu: true,
    context: 'Thesis: "Integrating calcium dynamics and NAD(P)H metabolism to study β-cell dysfunction in Type 2 Diabetes," carried out in the Kravets Lab (see the role above and the Projects section for the full breakdown).',
    bullets: [
      'Coursework: Biochemistry, Cell & Molecular Biology, Stem Cell Biology, Tissue/Cell Biomechanics, Patient-Centered Clinical Medicine, Tissue Engineering & Regenerative Medicine, Quantitative Cardiovascular Pathophysiology.',
    ],
    tools: [],
  },
  {
    date: 'Jan 2024 – Mar 2024', title: 'Research Associate', org: 'Cheresh Lab, UC San Diego, CA',
    context: 'A short rotation studying how pancreatic cancer recruits its surrounding tissue to help it spread, specifically, how tumor-fibroblast signaling remodels the extracellular matrix (ECM).',
    bullets: [
      'Investigated tumor-stroma signaling by measuring LPAR4 and fibronectin expression (flow cytometry, western blot, gel electrophoresis) to identify regulators of ECM remodeling and metastasis.',
      'Designed tumor-fibroblast co-culture assays with siRNA knockdowns and immunofluorescence imaging, uncovering fibroblast-mediated mechanisms that drive tumor invasion and chemoresistance.',
      'Used atomic force microscopy (AFM) and immunohistochemistry (IHC) in xenograft and transgenic mouse models to measure ECM stiffness and biomarker profiles, feeding into anti-stromal therapeutic strategy work.',
      'Integrated high-content imaging, transcriptomic profiling, and protein quantification into one workflow, cutting project timelines by about 30%.',
    ],
    tools: ['Flow cytometry', 'Western blot', 'AFM', 'IHC', 'siRNA knockdown'],
  },
  {
    date: 'Jul 2020 – Aug 2023', title: 'Product Manager', org: 'Krishagni Solutions (OpenSpecimen LIMS), India',
    context: 'Before moving to the bench full-time, three years as product manager for OpenSpecimen, an open-source LIMS/biobanking platform used by research institutions worldwide, translating lab and regulatory needs into shippable product features.',
    bullets: [
      'Deployed 30+ LIMS/ELN integrations for oncology and metabolic disease research programs, cutting specimen tracking errors by 75% and improving regulatory compliance.',
      'Managed 20+ cross-functional projects integrating LIMS, ELN, and EDC tools end-to-end, from requirements gathering through release.',
      'Led system design, testing, and feature validation cycles; authored 40+ technical documents and SOPs that became the internal knowledge base and client-facing user guides.',
      'Built and mentored a 4-person team, ran 50+ client training sessions, and stood up JIRA-based analytics dashboards that gave leadership real-time visibility into adoption and turnaround time.',
    ],
    tools: ['LIMS / ELN systems', 'JIRA / Confluence', 'Regulatory documentation (GCP, HIPAA)', 'Cross-functional leadership'],
  },
  {
    date: 'Jun 2020 – Jul 2020', title: 'Research Intern', org: 'Center for Innovation and Bio-Design (CIBioD), India',
    context: 'A summer research internship on diabetes-related manufacturing and early digital-health tooling.',
    bullets: [
      'Optimized manufacturing workflows for diabetes-related products, implementing three process improvements that measurably increased production efficiency.',
      'Researched neurological complications and metabolic dysfunction in Type 1 and Type 2 diabetes to inform product design decisions.',
      'Led a small cross-functional team building a machine-learning-based diabetes risk-prediction tool, improving diagnostic accuracy by nearly 49% over the team’s baseline model.',
    ],
    tools: ['Process improvement', 'Applied ML'],
  },
  {
    date: 'Aug 2016 – Oct 2020', title: 'B.E. in Biomedical Engineering', org: 'University of Mumbai, India', edu: true,
    context: 'Capstone projects from this degree (an 8051-based humidity sensor and a CNN for facial expression detection) are written up in the Projects section.',
    bullets: [
      'Coursework: Signals & Control Systems, Medical Imaging, Hospital Management, Biomaterials, Advanced Image Processing.',
    ],
    tools: [],
  },
  {
    date: 'Dec 2018 – Jan 2019', title: 'Biomedical Engineering Intern', org: 'Holy Family Hospital, India',
    context: 'An early internship maintaining and validating clinical equipment in a hospital setting, my first real exposure to the regulatory side of medical devices.',
    bullets: [
      'Partnered with senior engineers to troubleshoot and maintain medical devices across radiology, ICU, and surgical units under GMP/FDA compliance.',
      'Led validation and fixture-development work for diagnostic imaging systems, ventilators, infusion pumps, and surgical tools.',
      'Used LabVIEW, SolidWorks, and Minitab for design-of-experiments and measurement-system-analysis studies on device performance.',
    ],
    tools: ['LabVIEW', 'SolidWorks', 'DOE / MSA'],
  },
];

function initTimeline() {
  const el = document.getElementById('timeline');
  el.innerHTML = TIMELINE.map((item, i) => `
    <div class="timeline-item reveal${item.edu ? ' edu' : ''}" data-i="${i}">
      <span class="t-date">${item.date}</span>
      <h3>${item.title}</h3>
      <span class="t-org">${item.org}</span>
      <p class="t-context">${item.context}</p>
      <div class="t-details">
        <ul>${item.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        ${item.tools && item.tools.length ? `<div class="t-tools">${item.tools.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
      </div>
      <button class="t-toggle" type="button">View full role details <i class="fa-solid fa-chevron-down"></i></button>
    </div>`).join('');

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('.t-toggle');
    if (!btn) return;
    const item = btn.closest('.timeline-item');
    const open = item.classList.toggle('open');
    btn.innerHTML = open ? 'Hide role details <i class="fa-solid fa-chevron-up"></i>' : 'View full role details <i class="fa-solid fa-chevron-down"></i>';
  });

  document.querySelectorAll('.timeline .reveal').forEach(el2 => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    obs.observe(el2);
  });
}

/* ---------------- Projects data ---------------- */
const PROJECT_FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'diabetes', label: 'Diabetes & Imaging' },
  { key: 'cns', label: 'CNS Pharmacology' },
  { key: 'industry', label: 'Biotech Industry' },
  { key: 'strategy', label: 'Market & Strategy' },
  { key: 'engineering', label: 'Engineering & ML' },
];

const PROJECTS = [
  { id: 'cal', tier: 'research', tags: ['diabetes'], catLabel: 'Diabetes & Imaging', title: 'Integrating Calcium Dynamics and NAD(P)H Metabolism in β-Cell Dysfunction (T2D)', org: 'Kravets Lab, UC San Diego · Aug 2024 – Aug 2025',
    summary: 'Combined live-cell calcium imaging with FLIM-based NAD(P)H phasor analysis to map early β-cell dysfunction under lipotoxic conditions.',
    bullets: [
      'Investigated how heterogeneity in β-cell calcium dynamics influences insulin secretion, focusing on "first responder" cells.',
      'Explored the link between calcium response timing and metabolic flexibility by combining live-cell calcium imaging with FLIM-based NAD(P)H phasor analysis.',
      'Demonstrated how lipotoxic conditions (palmitate exposure) impair β-cell signaling and metabolism, modeling key aspects of T2D progression.',
      'Developed a quantitative framework to spatially map calcium and metabolic shifts at the single-cell level.',
      'Generated heatmaps and spatial maps of metabolic shifts, providing novel insights into early biomarkers of β-cell failure.',
    ]},
  { id: 'beta', tier: 'research', tags: ['diabetes'], catLabel: 'Diabetes & Imaging', title: 'First Responder Analysis for Calcium Imaging in Type 2 Diabetes', org: 'Kravets Lab, UC San Diego · Jul 2024 – Dec 2024',
    summary: 'Built a MATLAB pipeline to automate identification of first/last responder β-cells in glucose-stimulated insulin secretion (GSIS) experiments.',
    stat: { value: '~90%', label: 'responder classification accuracy (up from ~60%)' },
    bullets: [
      'Developed a MATLAB-based computational pipeline to analyze calcium imaging data from pancreatic islet cells, identifying first and last responder β-cells in GSIS experiments.',
      'Automated calcium trace analysis using local minima detection and normalization algorithms.',
      'Designed a semi-automated correction step to refine β-cell activation timing, reducing false detections.',
      'Integrated response time calculations to generate quantitative datasets for comparing β-cell coordination and functional heterogeneity.',
      'Streamlined workflows by automating data visualization and statistical analysis.',
    ]},
  { id: 'csf', tier: 'research', tags: ['cns'], catLabel: 'CNS Pharmacology', title: 'Modeling CSF Flow Modulation Effects on Locally Delivered Brain Drugs', org: 'UC San Diego · Apr 2024 – Jun 2024',
    summary: 'Computational model of CSF-mediated drug transport, improving predicted Temozolomide exposure in glioblastoma simulations by 45%.',
    stat: { value: '+45%', label: 'predicted drug exposure at target site' },
    bullets: [
      'Developed a spatial diffusion computational model to simulate CSF-mediated drug transport, improving accuracy of CNS drug delivery predictions by 25%.',
      'Engineered and validated a pharmacokinetic model for Temozolomide, accounting for CSF dynamics, blood-brain barrier permeability, and regional drug retention.',
      'Ran large-scale computational simulations showing a 45% increase in drug exposure at target sites via CSF flow modulation.',
    ]},
  { id: 'biobank', tier: 'research', tags: ['industry'], catLabel: 'Biotech Industry', title: 'Development & Deployment of OpenSpecimen Workflow Plug-in', org: 'OpenSpecimen (UMC Utrecht) · Aug 2022 – Aug 2023',
    summary: 'Led a 6-month LIMS workflow implementation streamlining 100+ biospecimen protocols at a major European medical center.',
    stat: { value: '+30%', label: 'operational productivity increase' },
    bullets: [
      'Designed, developed, and deployed the OpenSpecimen Workflow plug-in at UMC Utrecht, streamlining 100+ protocols for serum, DNA/RNA, and tissue processing.',
      'Led a six-month end-to-end implementation: client interactions, requirements gathering, documentation, and workflow configuration.',
      'Increased operational productivity by 30% through customizable, automated workflows.',
      'Ensured regulatory compliance by aligning automation with HIPAA and IRB protocols.',
      'Received client commendations for improving sample traceability and lab efficiency.',
    ]},
  { id: 'ran', tier: 'research', tags: ['strategy'], catLabel: 'Market & Strategy', title: 'RAN Vasculo x Venture Fellows', org: 'UC San Diego · Apr 2025 – Jun 2025',
    summary: 'Market and regulatory strategy analysis for thrombectomy devices, identifying an early-share opportunity in dialysis access interventions.',
    bullets: [
      'Conducted market research and segmentation for the global thrombectomy device market, identifying an early-share opportunity in U.S. dialysis access interventions.',
      'Performed competitive landscape assessment highlighting unmet needs in procedural speed, safety, and cost-effectiveness.',
      'Mapped the FDA 510(k) regulatory pathway and proposed a strategic Q-submission plan.',
      'Co-developed a commercialization and go-to-market strategy including distributor partnerships and KOL advocacy.',
      'Evaluated acquisition potential, benchmarking against recent medtech M&A activity.',
    ]},
  { id: 'cnn', tier: 'early', tags: ['engineering', 'ml'], catLabel: 'Engineering & ML', title: 'Facial Expression Detection using Convolutional Neural Networks', org: 'Thadomal Shahani Engineering College · Aug 2019 – Oct 2020',
    summary: 'CNN model reaching 97% accuracy on CK+ for emotion recognition, with strong generalization across FERG-DB and FER2013.',
    stat: { value: '97%', label: 'accuracy on the CK+ benchmark' },
    bullets: [
      'Developed and optimized a CNN-based facial expression detection model, achieving 97% accuracy on CK+ and 90%+ on FERG-DB and FER2013.',
      'Improved generalization via data augmentation (rotation, flipping, noise injection) and transfer learning, yielding a 30% accuracy gain and 95% real-time detection accuracy.',
      'Refined architectures and hyperparameters across 2,600 CK+ and 21,000 FERG-DB images.',
      'Improved pre-processing pipelines for robustness against lighting, occlusion, and angle variation.',
    ]},
  { id: 'humidity', tier: 'early', tags: ['engineering'], catLabel: 'Engineering & ML', title: 'Humidity Sensor using 8051 Microcontroller', org: 'Thadomal Shahani Engineering College · Jul 2018 – Nov 2018',
    summary: 'Real-time relative humidity monitoring system built on an 8051 microcontroller with ADC-based signal processing.',
    bullets: [
      'Designed a humidity-sensor system for weather forecasting, HVAC control, and hygrometer applications.',
      'Connected sensor analog output to an ADC, calibrated with a 1.5V reference for signal accuracy.',
      'Processed digital output through a microcontroller to compute relative humidity %, with noise-filtering for reliability.',
      'Programmed real-time humidity visualization on an LCD display.',
      'Explored IoT integration for cloud-based remote monitoring and predictive climate control.',
    ]},
];

function initProjects() {
  const filterBar = document.getElementById('projectFilters');
  const grid = document.getElementById('projectGrid');

  filterBar.innerHTML = PROJECT_FILTERS.map((f, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-key="${f.key}">${f.label}</button>`).join('');

  const cardHtml = (p, i) => `
    <div class="project-card" data-id="${p.id}" data-tags="${p.tags.join(',')}" style="--d:${(i % 6) * 0.06}s">
      <span class="p-cat">${p.catLabel}</span>
      <h3>${p.title}</h3>
      <span class="p-org">${p.org}</span>
      ${p.stat ? `<div class="p-stat"><b>${p.stat.value}</b><span>${p.stat.label}</span></div>` : ''}
      <p>${p.summary}</p>
      <div class="p-details"><ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul></div>
      <span class="p-more">View case study <i class="fa-solid fa-chevron-down"></i></span>
    </div>`;

  // Group into two tiers so grad/industry research visually leads, and earlier
  // undergrad engineering work reads as "earlier work" rather than an equal peer.
  const researchHtml = PROJECTS.filter(p => p.tier !== 'early').map(cardHtml).join('');
  const earlyHtml = PROJECTS.filter(p => p.tier === 'early').map(cardHtml).join('');

  grid.innerHTML = researchHtml
    + `<div class="tier-divider" id="tierDivider"><span>Earlier engineering work (undergrad)</span></div>`
    + earlyHtml;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    const key = btn.dataset.key;
    grid.querySelectorAll('.project-card').forEach(card => {
      const tags = card.dataset.tags.split(',');
      card.classList.toggle('hidden', key !== 'all' && !tags.includes(key));
    });
    const divider = document.getElementById('tierDivider');
    if (divider) divider.style.display = key === 'all' ? '' : 'none';
  });

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    card.classList.toggle('open');
  });
}

/* ---------------- Blogs ---------------- */
const BLOGS = [
  { title: 'Microbiome Biobanks – Challenges and Opportunities', desc: 'Microbiomes are dynamic ecosystems, often preserved as isolated snapshots instead of a bigger picture.', url: 'https://www.openspecimen.org/microbiome-biobanks-challenges-and-opportunities/' },
  { title: 'Future of Biobanking', desc: 'Disease-oriented vs. population-based biobanking, and where the field is headed.', url: 'https://www.openspecimen.org/future-of-biobanking/' },
  { title: 'Automation of Biobanking Activities', desc: 'How automation drives economies of scale and efficiency for growing biobank operations.', url: 'https://www.openspecimen.org/automation-of-biobanking-activities/' },
  { title: 'Ethical Challenges in COVID-19 Biospecimen Research', desc: 'Balancing rapid biospecimen research with fairness and ethical treatment development.', url: 'https://www.openspecimen.org/ethical-challenges-in-covid-19-biospecimen-research/' },
];
function initBlogs() {
  document.getElementById('blogGrid').innerHTML = BLOGS.map(b => `
    <a class="blog-card" href="${b.url}" target="_blank" rel="noopener">
      <h4>${b.title}</h4>
      <p>${b.desc}</p>
      <span class="blog-read">Read on OpenSpecimen <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
    </a>`).join('');
}

/* ---------------- Publications evidence links ---------------- */
function initPublications() {
  const grid = document.querySelector('#publications .pub-grid');
  if (!grid) return;
  grid.addEventListener('click', (e) => {
    const chip = e.target.closest('.evidence-chip');
    if (!chip) return;
    e.preventDefault();
    jumpToEvidence(chip.dataset.type, chip.dataset.target);
  });
}

/* ---------------- Certifications ---------------- */
const CERTS = [
  { title: 'Aerosol Transmissible Disease Pathogens Refresher' },
  { title: 'Annual Laboratory Hazards Training' },
  { title: 'Biosafety: Bloodborne Pathogens Training & Annual Refresher' },
  { title: 'Laboratory Safety Refresher' },
  { title: 'HIPAA Professional (HIPAAP)' },
  { title: 'Medical Device Development', url: 'https://www.udemy.com/certificate/UC-0631ebec-3c38-46b8-b511-7bd0bc953863/' },
  { title: 'SOLIDWORKS', url: 'https://www.udemy.com/certificate/UC-0b13913d-347b-46f0-ac18-18953d0bd237/' },
  { title: 'Good Clinical Practices (GCP)', url: 'https://www.linkedin.com/in/divya-prabhu/details/certifications/' },
  { title: 'Drug Development (In Progress)' },
  { title: 'Understanding Research Methods', url: 'https://www.coursera.org/account/accomplishments/certificate/4GKWM29FP4TK' },
  { title: 'Navigating AI for Your Research: Tools, Tips, and Pitfalls', url: 'https://www.linkedin.com/in/divya-prabhu/details/certifications/' },
  { title: 'Introduction to R Data Analysis', url: 'https://www.linkedin.com/in/divya-prabhu/details/certifications/' },
  { title: 'Preventing Workplace Harassment 2025 - Extended Office (CPE/CLE)', url: 'https://www.linkedin.com/in/divya-prabhu/details/certifications/' },
  { title: 'Introduction to Unix Command Line', url: 'https://www.linkedin.com/in/divya-prabhu/details/certifications/' },
  { title: 'edX Verified Certificate for Data Science: Wrangling', url: 'https://courses.edx.org/certificates/d680328d36c049d0916be0f9b8885942' },
  { title: 'Image Data Augmentation with Keras', url: 'https://www.coursera.org/account/accomplishments/verify/P4EWN6ES4RWF' },
  { title: 'Data Science', url: 'https://trainings.internshala.com/verify-certificate/' },
  { title: 'Image Classification with CNNs using Keras', url: 'https://www.coursera.org/account/accomplishments/certificate/N6AZSLDDKSBZ' },
];
function initCertifications() {
  document.getElementById('certGrid').innerHTML = CERTS.map(c => c.url
    ? `<a class="cert-pill" href="${c.url}" target="_blank" rel="noopener"><i class="fa-solid fa-certificate"></i>${c.title}<i class="fa-solid fa-arrow-up-right-from-square cert-ext"></i></a>`
    : `<span class="cert-pill"><i class="fa-solid fa-certificate"></i>${c.title}</span>`
  ).join('');
}

/* ---------------- Achievements ---------------- */
const ACHIEVEMENTS = [
  { icon: 'fa-award', color: 'var(--accent)', title: 'UC San Diego Research Expo',
    stat: { value: '43rd', label: 'Annual Research Expo' },
    desc: 'Presented "Integrating Calcium Dynamics and Metabolic Shifts Using First Responder Analysis and FLIM" at the 43rd Annual Research Expo, Jacobs School of Engineering.' },
  { icon: 'fa-chalkboard-user', color: 'var(--accent-3)', title: 'Teaching Assistant, UC San Diego',
    stat: { value: '7 of 8', label: 'quarters as TA' },
    desc: 'TA (50%) for 7 of 8 quarters during the Master’s program, covering lectures, lab sessions, and one-on-one mentorship.' },
  { icon: 'fa-lightbulb', color: 'var(--accent-4)', title: 'Co-founder, TSEC Incubation Center',
    stat: { value: '1st', label: 'startup incubator at TSEC' },
    desc: 'Co-founded the first startup incubation center at Thadomal Shahani Engineering College, providing mentorship and funding access to student entrepreneurs.' },
];
function initAchievements() {
  document.getElementById('achieveGrid').innerHTML = ACHIEVEMENTS.map((a, i) => `
    <div class="achieve-card" style="--d:${i * 0.1}s; --card-accent:${a.color}">
      <i class="fa-solid ${a.icon}"></i>
      <h3>${a.title}</h3>
      <div class="achieve-stat"><b>${a.stat.value}</b><span>${a.stat.label}</span></div>
      <p>${a.desc}</p>
    </div>`).join('');
}

/* ---------------- Testimonials ---------------- */
const TESTIMONIALS = [
  { initials: 'NL', color: 'var(--accent)',
    quote: 'Divya is a knowledgeable, methodological, and efficient scientist and I have learned a great deal from her expertise and skills. I highly recommend her as a professional.', name: 'Dr. Nantia Lakovidou', role: 'Senior Researcher, Khalifa University' },
  { initials: 'IO', color: 'var(--accent-2)',
    quote: 'I had the privilege of working with Divya on implementing the biorepository system for the International Livestock Research Institute under the BUILD project. I would without reservation recommend her.', name: 'Innocent Obilil', role: 'Data Systems Information Specialist, ILRI' },
  { initials: 'JM', color: 'var(--accent-3)',
    quote: 'During the intensive implementation of the new OpenSpecimen Workflow plug-in, Divya provided us product support in a professional manner, always fast and solution-oriented. Thanks Divya!', name: 'Jaap van Minnen', role: 'Project Manager, UMC Utrecht' },
  { initials: 'SA', color: 'var(--accent-4)',
    quote: 'Divya is delightful to work with. She gets the pulse of the customer very quickly and understands the capabilities of the product. I’d jump at the opportunity to work with her again.', name: 'Sunil Ayalasomayajula', role: 'Senior Consultant, Coppei (now Exadel)' },
  { initials: 'AD', color: 'var(--accent)',
    quote: 'Divya is very diligent, sincere, hard working, and focused on the projects at hand, with a proactive attitude to learn and strong communication skills.', name: 'Amit Das', role: 'Co-Founder & Director, Med-Cubator Innovations' },
  { initials: 'PS', color: 'var(--accent-2)',
    quote: 'I taught Divya Applied Mathematics, Biostatistics, and Operations Research. She is very diligent, sincere, and hard working.', name: 'Dr. Poonam Soni', role: 'Associate Professor & HoD Mathematics, TSEC' },
  { initials: 'BK', color: 'var(--accent-3)',
    quote: 'I know Divya from the CIBIOD attachment programme, where she showed good initiative researching life sciences. Her domain knowledge helped us in our research and she shed light during a crucial part of the project.', name: 'Bikram Kalsi', role: 'Founder & Director, Technology & Transitions' },
  { initials: 'SN', color: 'var(--accent-4)',
    quote: 'I know Divya as a sincere, attentive, and honest student with a focused mindset to achieve her goals, who always stood ahead of her peers. She believed in hard work and persistence in everything she did, and was involved in social outreach through NSS and NGOs on her own. I am confident about her sincerity and talent, and proud of her as my student.', name: 'Sachit Nalaskar', role: 'Associate Professor & NSS Advisor, TSEC' },
];

function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const wrap = document.querySelector('.testimonial-track-wrap');
  const dotsWrap = document.getElementById('carouselDots');
  const carousel = document.querySelector('.testimonial-carousel');
  const AUTOPLAY_MS = 6000;
  let index = 0;
  let autoplay = null;
  let autoplayOn = true;

  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-slide"><div class="testimonial-card">
      <i class="fa-solid fa-quote-left"></i><p>${t.quote}</p>
      <div class="testimonial-person">
        <span class="t-avatar" style="--card-accent:${t.color}">${t.initials}</span>
        <div class="t-person-text">
          <strong>${t.name}</strong><span class="role">${t.role}</span>
        </div>
      </div>
    </div></div>`).join('');
  dotsWrap.innerHTML = TESTIMONIALS.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}"><span class="dot-fill"></span></button>`).join('');

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('active', bi === index));
  }

  function stopAutoplay() {
    autoplayOn = false;
    carousel.classList.add('autoplay-paused');
    if (autoplay) clearInterval(autoplay);
  }
  function startAutoplay() {
    if (!autoplayOn) return;
    carousel.classList.remove('autoplay-paused');
    autoplay = setInterval(() => goTo(index + 1, false), AUTOPLAY_MS);
  }
  function goTo(i, manual = true) {
    index = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    render();
    if (manual) { stopAutoplay(); }
  }

  document.getElementById('tPrev').addEventListener('click', () => goTo(index - 1));
  document.getElementById('tNext').addEventListener('click', () => goTo(index + 1));
  dotsWrap.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) goTo(parseInt(b.dataset.i, 10)); });

  // Pause on hover (desktop) without permanently killing autoplay.
  carousel.addEventListener('mouseenter', () => { if (autoplay) clearInterval(autoplay); });
  carousel.addEventListener('mouseleave', () => { if (autoplayOn) startAutoplay(); });

  // Keyboard navigation when the carousel is in view.
  function inView() {
    const r = carousel.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }
  document.addEventListener('keydown', (e) => {
    if (!inView()) return;
    if (e.key === 'ArrowLeft') goTo(index - 1);
    else if (e.key === 'ArrowRight') goTo(index + 1);
  });

  // Swipe / drag support.
  let dragging = false, startX = 0, dragged = 0;
  wrap.style.touchAction = 'pan-y';
  wrap.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.evidence-chip')) return;
    dragging = true; dragged = 0; startX = e.clientX;
    track.style.transition = 'none';
    if (autoplay) clearInterval(autoplay);
  });
  wrap.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dragged = e.clientX - startX;
    track.style.transform = `translateX(calc(-${index * 100}% + ${dragged}px))`;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (Math.abs(dragged) > 60) {
      goTo(index + (dragged < 0 ? 1 : -1));
    } else {
      render();
      if (autoplayOn) startAutoplay();
    }
    dragged = 0;
  }
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointerleave', endDrag);
  wrap.addEventListener('pointercancel', endDrag);

  render();
  startAutoplay();
}

/* ---------------- Scroll progress ring ---------------- */
function initScrollRing() {
  const ringFg = document.getElementById('ringFg');
  if (!ringFg) return;
  const R = 19, C = 2 * Math.PI * R;
  ringFg.style.strokeDasharray = C;
  document.getElementById('scrollRing').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    ringFg.style.strokeDashoffset = C - pct * C;
  });
}

/* ---------------- Contact (copy-to-clipboard) ---------------- */
function initContact() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    const tip = btn.querySelector('.copy-tip');
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (err2) { /* clipboard unavailable */ }
        document.body.removeChild(ta);
      }
      btn.classList.add('copied');
      if (tip) tip.textContent = 'Copied!';
      clearTimeout(btn._copyTimeout);
      btn._copyTimeout = setTimeout(() => {
        btn.classList.remove('copied');
        if (tip) tip.textContent = 'Copy';
      }, 1500);
    });
  });
}
