(function () {
  'use strict';

  if (window.__NO_ANNOYING_TOOLTIPS__) return;
  window.__NO_ANNOYING_TOOLTIPS__ = true;

  const TARGET_CLASS = 'c_white bg_black p_var(--gap-md) bdr_var(--borderRadius-md) lh_0.875rem fs_0.6875rem ls_0.03125rem fw_500';

  function removeTooltip() {
    document.querySelectorAll('div.c_white.bg_black').forEach(el => {
      if (el.className === TARGET_CLASS && el.textContent){
        if(!el.firstChild?.firstChild?.outerHTML?.includes('emoji-size')&&!el.style?.color&&!el.firstChild?.style?.color //make emoji and avia badge tooltips show
        &&el.parentElement?.parentElement?.parentElement?.firstChild?.firstChild?.firstChild?.className!=='will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high) bx-sh_0_0_3px_var(--md-sys-color-shadow) w_340px h_400px bdr_var(--borderRadius-xl)' //make default badge tooltips show (in small user popup)
        &&el.parentElement?.parentElement?.parentElement?.parentElement?.lastChild?.firstChild?.firstChild?.firstChild.className!=='p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)' //make default badge tooltips show (in big user popup)
        ||el.parentElement?.parentElement?.firstChild?.firstChild?.firstChild?.firstChild?.lastChild.tagName=='TIME'){ //make sent at tooltips not show when small user popup is open
          el.remove()
        }
      }
    });
  }

  removeTooltip();

  const observer = new MutationObserver(() => removeTooltip());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();