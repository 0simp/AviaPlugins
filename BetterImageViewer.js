/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/BetterImageViewer.js
  @VERSION: 1.0
*/

(function () {
  if (window.__BETTER_IMAGE_VIEWER__) return;
  window.__BETTER_IMAGE_VIEWER__ = true;

  async function betterImageViewer(){
    const bar = [...document.querySelectorAll(`div:has(>button>span)`)].find(e=>e.querySelector('button').querySelector('span')?.textContent=='zoom_out')
    if(!bar) return;
    if(bar.offsetLeft+bar.clientWidth>window.innerWidth){
        bar.style.position='fixed'
        bar.style.top='130px'
    }

    const children = [...bar.children]
    const openbutton = document.getElementById('open_in_new')
    if(!openbutton){
        const zoomoutspan = [...document.querySelectorAll("span.material-symbols-outlined")]
        .find(s => s.textContent.trim() === "zoom_out");
        const zoomoutbutton = zoomoutspan.closest('button')

        const openbutton2 = zoomoutbutton.cloneNode(true)
        openbutton2.querySelector('span').textContent='open_in_new'
        openbutton2.id='open_in_new'
        openbutton2.onclick = function(){
          let url=bar.parentElement.parentElement.parentElement.children[1].src
          if(url.includes('cdn.stoatusercontent.com')&&url.endsWith('/original')){
            url=url.replace('/original','')
          }
          open(url)
        }

        bar.insertBefore(openbutton2,bar.children[2])
    }
  }

  const observer = new MutationObserver(() => {
    betterImageViewer();
  });

  function init() {
    betterImageViewer();
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