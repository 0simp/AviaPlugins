(function () {
  if (window.__BETTER_FAVOURITES__) return;
  window.__BETTER_FAVOURITES__ = true;
  let buttonelement = null;
  let imgurl = null;
  const STORAGE_KEY = "avia_favorites";
  const getFavorites = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const setFavorites = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  function extractYouTubeID(url) {
    const reg = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(reg);
    return match ? match[1] : null;
  }

  function updateBadge() {
    const badge = document.getElementById("avia-favorites-badge");
    if (!badge) return;
    const count = getFavorites().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }

  function tryToAdd(button,url,balls){
    const toast = document.createElement('div')
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
    });

    if(localStorage.getItem('avia_favorites')){ //if image is already in favourites
      let favourites = JSON.parse(localStorage.getItem('avia_favorites'))
      if(favourites.find(fav=>fav.url==url)){
        favourites = favourites.filter(f => f.url!==url)
        localStorage.setItem('avia_favorites',JSON.stringify(favourites))
        updateBadge()
        button.style.color=getFavorites().some(f=>f.url==url)? "#f5c518" : "#fff"
        if(!balls){
          toast.textContent = 'Removed from favourites'
          button.appendChild(toast);
          requestAnimationFrame(() => toast.style.opacity = "1");
          setTimeout(() => {
              toast.style.opacity = "0";
              setTimeout(() => toast.remove(), 200);
          }, 2000);
        }
        return;
      }
      //if favourites storage key exists, but image is not in it
      favourites.push({
        'url':`${url}`,
        'title':``,
        'addedAt':Date.now()
      })
      localStorage.setItem('avia_favorites',JSON.stringify(favourites))
      updateBadge()
      button.style.color=getFavorites().some(f=>f.url==url)? "#f5c518" : "#fff"
    }else{ //if favourites storage key doesn't exist
      let favourites = [];
      favourites.push({
        'url':`${url}`,
        'title':``,
        'addedAt':Date.now()
      })
      localStorage.setItem('avia_favorites',JSON.stringify(favourites))
      updateBadge()
      button.style.color=getFavorites().some(f=>f.url==url)? "#f5c518" : "#fff"
    }
    if(!balls){
      toast.textContent = 'Added to favourites'
      button.appendChild(toast);
      requestAnimationFrame(() => toast.style.opacity = "1");
          setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 200);
        }, 2000);
    }
  }

  function apply() {
    document.querySelectorAll('img.cursor_pointer').forEach(img=>{ //add favourites button to images in chat
      let message = img.parentElement.parentElement.parentElement.parentElement.parentElement
      if(!message.id){
        message= img.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
      }
      
      const card = document.createElement('div')
      card.className='fuckshit'
      card.id=`fuckshit${message.id}`
       Object.assign(card.style, {
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
            flexShrink: "0",
            boxSizing: "border-box",
            transition: "transform 0.15s ease, border-color 0.15s ease",
      });

      const starBtn = document.createElement("span");
        starBtn.className = "material-symbols-outlined fs_inherit fw_undefined!";
        starBtn.textContent = "star" ;
        Object.assign(starBtn.style, {
            position: "absolute",
            top: "4px",
            right: "4px",
            color:getFavorites().some(f=>f.url==img.src)? "#f5c518" : "#fff",
            cursor: "pointer",
            zIndex: "3",
            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
            transition: "color 0.15s, transform 0.1s",
            lineHeight: "1"
        });

        starBtn.onclick = function(e){
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          tryToAdd(starBtn,starBtn.previousSibling.src,true)
        }

        const clone = img.cloneNode()
        Object.assign(clone.style, {
            position: "absolute",
            top: "0", left: "0",
            width: "100%", height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
            zIndex: "1"
        });

      if(img.onclick){
        card.onclick = async function(){
          buttonelement = card.lastChild
          imgurl = card.firstChild.src
          setTimeout(() => {
            img.onclick()
          }, 100);
        }
      }else{
        card.$$click = async function(){
          buttonelement = card.lastChild
          imgurl = card.firstChild.src
          setTimeout(() => {
            img.$$click()
          }, 100);
        }
      }

      card.appendChild(clone)
      card.appendChild(starBtn)

      if(!document.getElementById(`fuckshit${message.id}`)){
        img.parentElement.replaceChild(card,img)
      }
    });

    document.querySelectorAll('div[class=\'z_999 d_flex gap_var(--gap-md) p_var(--gap-md) bdr_var(--borderRadius-lg) bg_var(--md-sys-color-surface) c_var(--md-sys-color-on-surface)\']').forEach(element=>{ //add favourites button to image viewer toolbar
      if(element.childElementCount===4&&element.parentElement.parentElement.parentElement.children[1].tagName==='IMG'){
        const favouriteButton = document.createElement('button')
        favouriteButton.setAttribute('class','lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px')
        favouriteButton.innerHTML = `
            <md-ripple aria-hidden="true"></md-ripple>
            <span aria-hidden="true" class="material-symbols-outlined fs_inherit fw_undefined!" style="display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;">star</span>
        `
        favouriteButton.style.color=getFavorites().some(f=>f.url==imgurl)? "#f5c518" : "#fff"

        favouriteButton.onclick = async function(e){
          await tryToAdd(favouriteButton,`${imgurl}`)
          if(buttonelement){
            buttonelement.style.color=getFavorites().some(f=>f.url==imgurl)? "#f5c518" : "#fff"
          }
        } 
        element.appendChild(favouriteButton)
      }
    })

    const panel = document.getElementById('avia-favorites-panel')
    if(panel){
      const header = panel.children[0]
      const grid = panel.children[2]
      function render() {

        grid.innerHTML = "";
        const favorites = getFavorites();

        favorites.forEach(item => {

            const card = document.createElement("div");
            Object.assign(card.style, {
                position: "relative",
                width: "120px",
                height: "120px",
                borderRadius: "14px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            });

            const remove = document.createElement("div");
            remove.textContent = "✕";
            Object.assign(remove.style, {
                position: "absolute",
                top: "6px",
                right: "8px",
                fontSize: "12px",
                cursor: "pointer",
                background: "rgba(0,0,0,0.6)",
                padding: "2px 6px",
                borderRadius: "6px",
                zIndex: 2
            });

            remove.onclick = (e) => {
                e.stopPropagation();
                setFavorites(favorites.filter(f => f.url !== item.url));
                render();
            };

            card.appendChild(remove);

            let mediaAdded = false;

            const ytID = extractYouTubeID(item.url);
            if (ytID) {
                const img = new Image();
                img.src = `https://img.youtube.com/vi/${ytID}/hqdefault.jpg`;
                Object.assign(img.style, { width:"100%", height:"100%", objectFit:"cover" });
                card.appendChild(img);
                mediaAdded = true;
            }

            if (!mediaAdded) {
                const ext = item.url.split(".").pop().split("?")[0].toLowerCase();
                const isVideo = ["mp4","webm","mov","gifv"].includes(ext);

                if (isVideo) {
                    const video = document.createElement("video");
                    video.src = item.url.replace(".gifv",".mp4");
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    Object.assign(video.style, { width:"100%", height:"100%", objectFit:"cover" });
                    video.onerror = fallback;
                    card.appendChild(video);
                } else {
                    const img = new Image();
                    img.src = item.url;
                    Object.assign(img.style, { width:"100%", height:"100%", objectFit:"cover" });
                    img.onerror = fallback;
                    card.appendChild(img);
                }
            }

            function fallback() {
                card.innerHTML = "";
                card.appendChild(remove);
                const text = document.createElement("div");
                text.textContent = item.title || item.url;
                Object.assign(text.style, {
                    padding:"8px",
                    fontSize:"11px",
                    textAlign:"center",
                    wordBreak:"break-word"
                });
                card.appendChild(text);
            }

            if (item.title) {
                const titleOverlay = document.createElement("div");
                titleOverlay.textContent = item.title;
                Object.assign(titleOverlay.style, {
                    position:"absolute",
                    bottom:"0",
                    width:"100%",
                    background:"rgba(0,0,0,0.6)",
                    fontSize:"11px",
                    padding:"4px",
                    textAlign:"center",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                });
                card.appendChild(titleOverlay);
            }

            card.onclick = () => {
                const doToast = () => showToast(card);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(item.url)
                        .then(doToast)
                        .catch(() => {
                            fallbackCopy(item.url);
                            doToast();
                        });
                } else {
                    fallbackCopy(item.url);
                    doToast();
                }
            };

            grid.appendChild(card);
        });
      }
      
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

      const refreshButton = document.createElement('div')
      refreshButton.textContent='↺'
      refreshButton.id='favsrefresh'
      Object.assign(refreshButton.style,{
          position:'absolute',
          right:'36px',
          top:'16px',
          cursor:'pointer'
      });

      refreshButton.onclick=()=>{
        render()
      };

      if(!document.getElementById('favsrefresh')){
        header.appendChild(refreshButton)
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