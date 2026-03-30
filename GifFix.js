(function () {
  if (window.__FART_CLICK__) return;
  window.__FART_CLICK__ = true;

  function GifFix() {
    const images = document.querySelectorAll('img')
    images.forEach(image=>{
        if(!image.src.includes('original')&&!image.src.includes('default_avatar')&&!image.src.includes('cdn.jsdelivr.net')&&!image.includes('blob:')){
            image.src=image.src+'/original'
        }
    })
  }

  const observer = new MutationObserver(() => {
    GifFix();
  });

  function init() {
    GifFix();
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
