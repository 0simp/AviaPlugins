/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/CopyAttachmentLink.js
  @VERSION: 1.0
*/

(function () {
  if (window.__COPY_ATTACHMENT_LINK__) return;
  window.__COPY_ATTACHMENT_LINK__ = true;

  function addContextMenuButtons(replybutton,svg){
    if(!replybutton||!svg) return;
    document.body.style.overflow='hidden'
    const divider = [...replybutton.parentElement.children].find(e=>!e.firstChild).cloneNode()

    const openfilebutton = replybutton.cloneNode(true)
    openfilebutton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"></path></svg><span class="fzuZQP hZMpMu VJSWr ieGCzW jRYfTR">Open file</span>`
    openfilebutton.onclick = function(){
      window.open(`${svg.parentElement.parentElement.querySelector(`a[href]`).href}`,'_blank')
    }

    const copylinkbutton = replybutton.cloneNode(true)
    copylinkbutton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5m-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4zm-3-4h8v2H8z"></path></svg><span class="fzuZQP hZMpMu VJSWr ieGCzW jRYfTR">Copy file link</span>`
    navigator.clipboard.writeText(`${svg.parentElement.parentElement.querySelector(`a[href]`).href}`).catch(err=>{});

    const download = svg.parentElement.parentElement.querySelector(`a[href]`).cloneNode()
    const savefilebutton = replybutton.cloneNode(true)
    savefilebutton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7zm-8 2V5h2v6h1.17L12 13.17 9.83 11zm-6 7h14v2H5z"></path></svg><span class="fzuZQP hZMpMu VJSWr ieGCzW jRYfTR">Save file</span>`
    download.appendChild(savefilebutton)

    replybutton.parentElement.insertBefore(divider,replybutton)
    replybutton.parentElement.insertBefore(download,divider)
    replybutton.parentElement.insertBefore(copylinkbutton,download)
    replybutton.parentElement.insertBefore(openfilebutton,copylinkbutton)
  }

  function apply() {
    const textfilesvgs = document.querySelectorAll(`path[d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.998 14.768H8.895v3.274h-.917v-3.274H6.893V14h3.105v.768zm2.725 3.274-.365-.731c-.15-.282-.246-.492-.359-.726h-.013c-.083.233-.185.443-.312.726l-.335.731h-1.045l1.171-2.045L10.336 14h1.05l.354.738c.121.245.21.443.306.671h.013c.096-.258.174-.438.276-.671l.341-.738h1.043l-1.139 1.973 1.198 2.069h-1.055zm4.384-3.274h-1.104v3.274h-.917v-3.274h-1.085V14h3.105v.768zM14 9h-1V4l5 5h-4z']`)
    textfilesvgs.forEach(svg=>{
      if(svg.parentElement.parentElement.querySelector(`[aria-label='Copy attachment link']`)) return;
      const copyLinkButton = svg.parentElement.parentElement.lastChild.firstChild.cloneNode(true)
      copyLinkButton.lastChild.textContent='link'
      copyLinkButton.ariaLabel='Copy attachment link'
      copyLinkButton.addEventListener('click',()=>{
            const toast = document.createElement('div')
            toast.textContent='Copied!'
            Object.assign(toast.style, {
                position: "absolute",
                bottom: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.85)",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "11px",
                opacity: "0",
                transition: "opacity 0.2s",
                pointerEvents: "none",
                color:"white"
            });
            copyLinkButton.parentElement.appendChild(toast);
            requestAnimationFrame(() => toast.style.opacity = "1");
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 200);
            }, 2000);

            navigator.clipboard.writeText(copyLinkButton.previousSibling.href)
        });
        svg.parentElement.parentElement.appendChild(copyLinkButton)
        svg.parentElement.parentElement.parentElement.addEventListener('contextmenu',(e)=>{
          const replybutton = document.querySelector(`a:has(svg>path[d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11'])`)
          if(replybutton){
            addContextMenuButtons(replybutton,svg)
          }else{
            const interval = setInterval(() => {
              const replybutton = document.querySelector(`a:has(svg>path[d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11'])`)
              if(replybutton){
                addContextMenuButtons(replybutton,svg)
                clearInterval(interval)
              }
            }, 1);
          }
        });
    });

    const replybutton = document.querySelector(`a:has(svg>path[d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11'])`)
    if(!replybutton&&document.body.style.getPropertyValue('overflow')){
      document.body.style.removeProperty('overflow')
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