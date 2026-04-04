(function () {
  if (window.__GIF_FIX__) return;
  window.__GIF_FIX__ = true;

  function GifFix() {
    const images = document.querySelectorAll('img[src]')
    images.forEach(image=>{
        fetch(image.src+'/original').then(res=>{
          if(res.ok&&!image.src.includes('/original')){
            image.src=image.src+'/original'
            console.log(image)
          }
        }).catch(e=>{

        })
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