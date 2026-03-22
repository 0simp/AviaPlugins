(function () {
  'use strict';

  if (window.__NO_TOGGLE_MAIN_SIDEBAR__) return;
  window.__NO_TOGGLE_MAIN_SIDEBAR__ = true;

  const TARGET_CLASS = 'c_white bg_black p_var(--gap-md) bdr_var(--borderRadius-md) lh_0.875rem fs_0.6875rem ls_0.03125rem fw_500';
  const TARGET_TEXT  = 'Toggle main sidebar';

  function removeTooltip() {
    document.querySelectorAll('div.c_white.bg_black').forEach(el => {
      if (el.className === TARGET_CLASS && el.textContent.trim() === TARGET_TEXT) {
        el.remove();
      }
    });
  }

  removeTooltip();

  const observer = new MutationObserver(() => removeTooltip());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
