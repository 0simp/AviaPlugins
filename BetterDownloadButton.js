(function () {
  if (window.__BETTER_DOWNLOAD_BUTTON__) return;
  window.__BETTER_DOWNLOAD_BUTTON__ = true;

  function BetterDownoladButton() {
    const downloadbuttons = document.querySelectorAll('a[download]')
    downloadbuttons.forEach(button=>{
        button.setAttribute('target','_self')
    });
  }

  const observer = new MutationObserver(() => {
    BetterDownoladButton();
  });

  function init() {
    BetterDownoladButton();
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