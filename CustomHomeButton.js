/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/CustomHomeButton.js
  @VERSION: 1.0
*/

(function () {
  if (window.__CUSTOM_HOME_BUTTON__) return;
  window.__CUSTOM_HOME_BUTTON__ = true;

  function apply() {
    if(!document.getElementsByClassName('homebutton').item(0)){
        const homebuttonelement = document.querySelector(`path[d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z']`)?.parentElement.parentElement
        if(homebuttonelement){
            homebuttonelement.removeChild(homebuttonelement.firstChild)
            homebuttonelement.setAttribute('class','homebutton')  
        } 
    }
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
})()