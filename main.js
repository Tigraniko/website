// ============================
// FALLOUT TERMINAL — MAIN.JS
// ============================

(function () {
  'use strict';

  // ---- BOOT SEQUENCE ----
  const bootLines = [
    'bl1', 'bl2', 'bl3', 'bl4', 'bl5',
    'bl6', 'bl7', 'bl8', 'bl9', 'bl10', 'bl11'
  ];

  const delays = [100, 500, 900, 1400, 1800, 2200, 2700, 3100, 3500, 3900, 4200];

  bootLines.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('visible');
    }, delays[i]);
  });

  // Progress bar
  setTimeout(() => {
    const wrapper = document.getElementById('boot-bar-wrapper');
    if (wrapper) wrapper.classList.add('visible');

    let pct = 0;
    const bar = document.getElementById('boot-bar-inner');
    const pctEl = document.getElementById('boot-pct');
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 4) + 2;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        showFinalBootLine();
      }
      if (bar) bar.style.width = pct + '%';
      if (pctEl) pctEl.textContent = pct + '%';
    }, 55);
  }, 4500);

  function showFinalBootLine() {
    const el = document.getElementById('bl12');
    if (el) {
      el.style.display = 'block';
      el.classList.add('visible');
    }
    // Auto-enter after 2s or on keypress/click
    const enter = () => enterSite();
    document.addEventListener('keydown', enter, { once: true });
    document.addEventListener('click', enter, { once: true });
    setTimeout(enter, 2000);
  }

  let entered = false;
  function enterSite() {
    if (entered) return;
    entered = true;
    const boot = document.getElementById('boot-screen');
    const main = document.getElementById('main-site');
    if (!boot || !main) return;

    boot.style.transition = 'opacity 0.6s';
    boot.style.opacity = '0';
    setTimeout(() => {
      boot.style.display = 'none';
      main.style.display = 'block';
      startClock();
      addFlicker();
    }, 600);
  }

  // ---- CLOCK ----
  function startClock() {
    function tick() {
      const el = document.getElementById('live-clock');
      if (!el) return;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = `${h}:${m}:${s}`;
    }
    tick();
    setInterval(tick, 1000);
  }

  // ---- TAB NAVIGATION ----
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const section = document.getElementById('tab-' + target);
      if (section) section.classList.add('active');
    });
  });

  // ---- SUBTLE SCREEN FLICKER ----
  function addFlicker() {
    setInterval(() => {
      if (Math.random() > 0.97) {
        document.body.style.opacity = '0.93';
        setTimeout(() => { document.body.style.opacity = '1'; }, 60);
      }
    }, 1500);
  }

})();
