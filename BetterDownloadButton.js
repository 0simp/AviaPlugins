(function () {
  if (window.__BETTER_DOWNLOAD_BUTTON__) return;
  window.__BETTER_DOWNLOAD_BUTTON__ = true;

  function BetterDownoladButton() {
    const downloadbuttons = document.querySelectorAll('a[download]')
    downloadbuttons.forEach(button=>{
        if(typeof window.showSaveFilePicker!='function'){
          button.setAttribute('target','_self')
        }else{
          button.setAttribute('target','_self')
          const url = button.getAttribute('href')
          const download = button.getAttribute('download')
          
          button.firstChild.$$click = async function(){
            try {
              const filepicker = await window.showSaveFilePicker({
                suggestedName:download,
              });

              const writable = await filepicker.createWritable()
              const res = await fetch(url)
              await res.body.pipeTo(writable)
            } catch (error) {
              if (error.name !== 'AbortError') {
                console.log(error);        
              }
            }
          }
        }
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