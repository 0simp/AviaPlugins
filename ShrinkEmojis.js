/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/ShrinkEmojis.js
  @VERSION: 1.1
*/

(function () {
  if (window.__SHRINK_EMOJIS__) return;
  window.__SHRINK_EMOJIS__ = true;

  function apply() {
    const emojis = document.querySelectorAll('img[alt]')
    emojis.forEach(emoji=>{
      if(emoji.width>40&&emoji.width==emoji.height){
        emoji.style.setProperty('height','40px')
        emoji.style.setProperty('width','40px')
      }
    })
  }

  const observer = new MutationObserver(() => {
    apply();
  });

  function init() {
    apply();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.body) {
    init();
  } else {
    requestAnimationFrame(init);
  }
})();