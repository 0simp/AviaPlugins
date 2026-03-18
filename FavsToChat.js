(function () {
  if (window.__FAVS_TO_CHAT__) return;
  window.__FAVS_TO_CHAT__ = true;

  function apply() {
    const panel = document.getElementById('avia-favorites-panel')
    if(panel){
      for(const child of panel.children[2].children){
        child.onclick=()=>{
          let textinput = document.getElementsByClassName('md-text').item(0)
          if(textinput){
            textinput.innerText=textinput.innerText+` ${child.children[1].src}`
          }else{
            const editor = document.getElementsByClassName('cm-editor ͼ1 ͼ2 ͼ5 ͼ4 ͼ8 ͼ6 ͼ7').item(0)
            textinput = document.createElement('span')
            textinput.className='md-text'
            textinput.innerText=`${child.children[1].src}`
            editor.children[1].children[0].children[0].appendChild(textinput)
          }
        }
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
})();