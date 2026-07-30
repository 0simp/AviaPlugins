/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/HideImageLinks.js
  @VERSION: 1.0
*/

(function () {
  if (window.__HIDE_IMAGE_LINKS__) return;
  window.__HIDE_IMAGE_LINKS__ = true;

  function hideImageLinks() {
    const messages = document.querySelectorAll(`div[class*='group'][id]`)

    for(const message of messages){
        const linkElement = message.querySelector(`a[title]`)
        const link = linkElement?.title
        const textElement = message.querySelector(`[key*='1-1-0'][node]`)
        const text = textElement?.textContent
        const image = message.querySelector(`img[src='${link}'],img[src*='${link?.replaceAll(':','%3A')
        .replaceAll('/','%2F')}']`)
        const video = message.querySelector(`video[src='${link}'],video[src*='${link?.replaceAll(':','%3A')
        .replaceAll('/','%2F')}']`)

        if((linkElement&&link==text&&image&&!linkElement.alt)||video&&!linkElement.alt){
          linkElement.style.display='none'
        }
    }
  }

  const observer = new MutationObserver(() => {
    hideImageLinks();
  });

  function init() {
    hideImageLinks();
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