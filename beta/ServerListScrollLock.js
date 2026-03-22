(function () {
  'use strict';

  let scrollLockEnabled = false;
  let overlay = null;

  function createOverlay() {
    const serverList = document.querySelector('[aria-disabled][role="list"]');
    if (!serverList) return;

    const parent = serverList.parentElement;
    const rect   = serverList.getBoundingClientRect();

    overlay = document.createElement('div');
    overlay.id = 'revolt-scroll-lock-overlay';

    Object.assign(overlay.style, {
      position:       'absolute',
      top:            serverList.offsetTop + 'px',
      left:           serverList.offsetLeft + 'px',
      width:          serverList.offsetWidth + 'px',
      height:         serverList.offsetHeight + 'px',
      zIndex:         '9999',
      background:     'transparent',
      touchAction:    'pan-y',
      pointerEvents:  'all',
      cursor:         'default',
    });

    overlay.addEventListener('touchmove', (e) => {
      const scrollable = serverList.closest('.will-change_transform') || serverList.parentElement;
      if (scrollable) {
        scrollable.scrollTop += e.touches[0]?.clientY
          ? 0
          : 0; 
      }
    }, { passive: true });

    overlay.addEventListener('pointerdown', (e) => e.stopPropagation());
    overlay.addEventListener('mousedown',   (e) => e.stopPropagation());

    const computedPos = getComputedStyle(parent).position;
    if (computedPos === 'static') parent.style.position = 'relative';

    parent.appendChild(overlay);
  }

  function removeOverlay() {
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
  }

  function updateButtonIcon(span) {
    span.textContent = scrollLockEnabled ? 'check' : 'history';

    Object.assign(span.style, {
      color: scrollLockEnabled
        ? 'var(--md-sys-color-primary, #80cbc4)'
        : '',
    });
  }

  function toggle(span) {
    scrollLockEnabled = !scrollLockEnabled;

    if (scrollLockEnabled) {
      createOverlay();
    } else {
      removeOverlay();
    }

    updateButtonIcon(span);
  }

  function inject() {
    const wrapper = document.querySelector('[aria-label="Switch back to legacy app"]');
    if (!wrapper || wrapper.dataset.scrollLockPatched) return;

    wrapper.dataset.scrollLockPatched = 'true';

    wrapper.setAttribute('aria-label', 'Toggle server list scroll lock');

    const link = wrapper.querySelector('a');
    const span = wrapper.querySelector('span.material-symbols-outlined');
    if (!link || !span) return;

    link.removeAttribute('href');
    link.style.cursor = 'pointer';
    updateButtonIcon(span);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle(span);
    });

    window.addEventListener('resize', () => {
      if (scrollLockEnabled) {
        removeOverlay();
        createOverlay();
      }
    });
  }

  const observer = new MutationObserver(() => {
    const target = document.querySelector('[aria-label="Switch back to legacy app"]');
    if (target && !target.dataset.scrollLockPatched) {
      inject();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also try immediately in case page already loaded
  inject();

})();
