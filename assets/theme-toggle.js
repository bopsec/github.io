(function () {
  const storageKey = 'bopsec-theme-mode';
  const body = document.body;
  const toggle = document.querySelector('[data-mode-toggle]');

  if (!toggle || !body) {
    return;
  }

  const applyMode = (mode) => {
    const targetMode = mode === 'modern' ? 'mode-modern' : 'mode-retro';
    body.classList.remove('mode-retro', 'mode-modern');
    body.classList.add(targetMode);
    localStorage.setItem(storageKey, targetMode);
    updateButton();
  };

  const updateButton = () => {
    const isModern = body.classList.contains('mode-modern');
    toggle.textContent = isModern ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', String(isModern));
  };

  const saved = localStorage.getItem(storageKey);
  if (saved === 'mode-modern' || saved === 'mode-retro') {
    applyMode(saved === 'mode-modern' ? 'modern' : 'retro');
  } else {
    updateButton();
  }

  toggle.addEventListener('click', () => {
    const isModern = body.classList.contains('mode-modern');
    applyMode(isModern ? 'retro' : 'modern');
  });
})();
