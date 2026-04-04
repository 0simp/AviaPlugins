(function () {
  if (window.__GIF_FIX__) return;
  window.__GIF_FIX__ = true;

  function GifFix() {
    const images = document.querySelectorAll('img')
    images.forEach(image=>{
        if(!image.src.includes('original')&&!image.src.includes('default_avatar')&&!image.src.includes('cdn.jsdelivr.net')&&!image.src.includes('blob:')&&!image.src.includes('proxy.stoatusercontent.com')){
            if(image.parentElement.parentElement.parentElement.parentElement.parentElement.id=='avia-masq-panel') return;
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