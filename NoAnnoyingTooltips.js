/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/NoAnnoyingTooltips.js
  @VERSION: 1.0
*/

(function () {
  'use strict';

  if (window.__NO_ANNOYING_TOOLTIPS__) return;
  window.__NO_ANNOYING_TOOLTIPS__ = true;

  function removeTooltip() {
    const homebutton = document.querySelector(`a[href='/app']`)
    if(!homebutton) return;
    const username = homebutton.nextSibling.ariaLabel
    const regex = /[0-9][0-9]\/[0-9][0-9]/;
    [...document.querySelectorAll(`div[style*='z-index: 999;']`)]
    .filter(el=>document.querySelector(`[aria-label='${el.textContent.trim()}']`)
    ||!el.firstChild.firstChild.tagName
    ||el.firstChild.firstChild.alt
    ||regex.test(el.textContent)
    ||el.textContent.includes(username)).forEach(el=>{
      el.remove()
    });
  }

  removeTooltip();

  const observer = new MutationObserver(() => removeTooltip());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();