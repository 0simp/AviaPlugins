/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/CopyFileContents.js
  @VERSION: 1.0
*/

(function () {
  if (window.__COPY_FILE_CONTENTS__) return;
  window.__COPY_FILE_CONTENTS__ = true;

  function addContextMenuButton(replybutton,svg){
    if(!replybutton||!svg) return;
    document.body.style.overflow='hidden'
    const divider = [...replybutton.parentElement.children].find(e=>!e.firstChild).cloneNode()

    const copytextbutton = replybutton.cloneNode(true)
    copytextbutton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e3e3e3"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg><span class="fzuZQP hZMpMu VJSWr ieGCzW jRYfTR">Copy file contents</span>`
    copytextbutton.onclick = function(){
      if(svg.parentElement.parentElement.nextSibling.querySelector('button')) return;
      navigator.clipboard.writeText(`${svg.parentElement.parentElement.nextSibling.textContent}`).catch(err=>{});
    }

    const copylinkbutton = document.querySelector(`a:has(svg>path[d='M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5m-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4zm-3-4h8v2H8z'])`)
    if(copylinkbutton){
      replybutton.parentElement.insertBefore(copytextbutton,copylinkbutton.nextSibling)
    }else{
      replybutton.parentElement.insertBefore(divider,replybutton)
      replybutton.parentElement.insertBefore(copytextbutton,divider)
    }
  }

  function copyFileContents() {
    const textfilesvgs = document.querySelectorAll(`path[d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.998 14.768H8.895v3.274h-.917v-3.274H6.893V14h3.105v.768zm2.725 3.274-.365-.731c-.15-.282-.246-.492-.359-.726h-.013c-.083.233-.185.443-.312.726l-.335.731h-1.045l1.171-2.045L10.336 14h1.05l.354.738c.121.245.21.443.306.671h.013c.096-.258.174-.438.276-.671l.341-.738h1.043l-1.139 1.973 1.198 2.069h-1.055zm4.384-3.274h-1.104v3.274h-.917v-3.274h-1.085V14h3.105v.768zM14 9h-1V4l5 5h-4z']`)
    textfilesvgs.forEach(svg=>{
       if(svg.parentElement.parentElement.querySelector(`[aria-label='Copy file contents']`)) return;
        const downloadbutton = svg.parentElement.parentElement.querySelector(`a[href]`).firstChild
       const copytextbutton = downloadbutton.cloneNode(true)
       copytextbutton.lastChild.textContent='content_copy'
       copytextbutton.ariaLabel='Copy file contents'
       copytextbutton.onclick = function(e){
        if(svg.parentElement.parentElement.nextSibling.querySelector('button')) return;
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

            navigator.clipboard.writeText(`${svg.parentElement.parentElement.nextSibling.textContent}`).catch(err=>{
              toast.textContent='Failed to copy'
              toast.style.color='red'
            });
            copytextbutton.parentElement.appendChild(toast);
            requestAnimationFrame(() => toast.style.opacity = "1");
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 200);
            }, 2000);
       }

       svg.parentElement.parentElement.appendChild(copytextbutton)
       svg.parentElement.parentElement.parentElement.addEventListener('contextmenu',(e)=>{
          const replybutton = document.querySelector(`a:has(svg>path[d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11'])`)
          if(replybutton){
            addContextMenuButton(replybutton,svg)
          }else{
            const interval = setInterval(() => {
              const replybutton = document.querySelector(`a:has(svg>path[d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11'])`)
              if(replybutton){
                addContextMenuButton(replybutton,svg)
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
    copyFileContents();
  });

  function init() {
    copyFileContents();
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