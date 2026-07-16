(function () {
  if (window.__PRONOUNS__) return;
  window.__PRONOUNS__ = true;
  let capturedToken = null;
  let clickedServer = null;
  let myid = null;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async function (resource, config = {}) {
    try {
        const url = resource?.toString?.() || "";
        if((url.includes('/users')||url.includes('members'))&&config.method=='PATCH'){
            const pronounsfield = document.getElementById('pronouns')
            if(pronounsfield){
                const parsed = JSON.parse(config.body)
                if(parsed){
                    if(pronounsfield.value){
                      parsed.pronouns=`${pronounsfield.value}`
                    }else{
                      parsed.remove.push('Pronouns')
                    }
                    config = { ...config, body: JSON.stringify(parsed) };
                }
            }
        }

        if(url.includes('/profile')&&config.method=='GET'){
          const regex = /[A-Z0-9]{26}/;
          const id = regex.exec(url)[0]
          let endpoint = `https://stoat.chat/api/users/${id}`
          if(document.baseURI.includes('/server')){
            const serverid = regex.exec(document.baseURI)[0]
            endpoint = `https://stoat.chat/api/servers/${serverid}/members/${id}`
          }
          const res = await fetch(endpoint,config)
          if(res.ok){
            const json = await res.json()
            if(json.pronouns){
              const userpopup = document.querySelector(`div[class='will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high) bx-sh_0_0_3px_var(--md-sys-color-shadow) w_340px h_400px bdr_var(--borderRadius-xl)'],div[class='p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)']`)
              if(userpopup){
                const usernameparent = userpopup.querySelector(`div[class='ov-wrap_anywhere lh_1em fs_0.875rem ls_0.015625rem fw_400 d_flex gap_var(--gap-xs) flex-d_column']`)
                const pronounselement = document.createElement('div')
                pronounselement.textContent=json.pronouns
                usernameparent.appendChild(pronounselement)
              }
            }else if (document.baseURI.includes('server')){
              const res = await fetch(`https://stoat.chat/api/users/${id}`,config)
              if(res.ok){
                const json = await res.json()
                if(json.pronouns){
                  const userpopup = document.querySelector(`div[class='will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high) bx-sh_0_0_3px_var(--md-sys-color-shadow) w_340px h_400px bdr_var(--borderRadius-xl)'],div[class='p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)']`)
                  if(userpopup){
                    const usernameparent = userpopup.querySelector(`div[class='ov-wrap_anywhere lh_1em fs_0.875rem ls_0.015625rem fw_400 d_flex gap_var(--gap-xs) flex-d_column']`)
                    const pronounselement = document.createElement('div')
                    pronounselement.textContent=json.pronouns
                    usernameparent.appendChild(pronounselement)
                  }
                }
              }
            }
          }
        }
    } catch (e) { console.log(e); }
    return originalFetch(resource, config)
  };

  function openDB() {
    return new Promise((resolve, reject) => {
        const r = indexedDB.open("localforage");
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
    });
  }

  async function getToken(){
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const r = db.transaction("keyvaluepairs", "readonly")
            .objectStore("keyvaluepairs").get("auth");
            r.onsuccess = () => resolve(r.result?.session?.token || null);
            r.onerror = () => reject(r.error);
        });
    } catch { return null; }
  }

  async function getMyPronouns(){
    if(!capturedToken) return null;
    let pronouns = null;
    const res = await fetch('https://stoat.chat/api/users/@me',{
        method:"GET",
        headers:{
            "X-Session-Token":capturedToken
        }
    })

    if(res.ok){
      const json = await res.json()
      if(json.pronouns) pronouns=json.pronouns
    }

    return pronouns;
  }

  async function getMyServerPronouns(server){
    if(!capturedToken||!myid||!server||!clickedServer) return null;
    let pronouns = null;
    const res = await fetch(`https://stoat.chat/api/servers/${server}/members/${myid}`,{
        method:"GET",
        headers:{
            "X-Session-Token":capturedToken
        }
    })

    if(res.ok){
      const json = await res.json()
      if(json.pronouns) pronouns=json.pronouns
    }

    return pronouns;
  }

  async function getMyId(){
    if(!capturedToken) return null;
    let id = null;
    const res = await fetch('https://stoat.chat/api/users/@me',{
        method:"GET",
        headers:{
            "X-Session-Token":capturedToken
        }
    })

    if(res.ok){
      const json = await res.json()
      id = json._id
    }

    return id;
  }

  async function pronouns() {
    capturedToken = await getToken()
    if(!myid) myid = await getMyId()
    const displaynamefield = document.querySelector(`mdui-text-field[name='displayName']`)
    const resettokensvg = document.querySelector(`path[d='m21 7-9-5-9 5v10l9 5 9-5zm-9-2.71 5.91 3.28-3.01 1.67C14.17 8.48 13.14 8 12 8s-2.17.48-2.9 1.24L6.09 7.57zm-1 14.87-6-3.33V9.26L8.13 11c-.09.31-.13.65-.13 1 0 1.86 1.27 3.43 3 3.87zM10 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2m3 7.16v-3.28c1.73-.44 3-2.01 3-3.87 0-.35-.04-.69-.13-1.01L19 9.26v6.57z']`)
    const nicknamefield = document.querySelector(`mdui-text-field[name='nickname']`)
    if(displaynamefield&&!resettokensvg){
        const clone = displaynamefield.cloneNode(true)
        clone.name='Pronouns'
        clone.label='Pronouns'
        clone.maxlength='24'
        clone.id='pronouns'

        if(!document.getElementById('pronouns')){
            displaynamefield.parentElement.insertBefore(clone,displaynamefield.nextSibling)
            const pronouns = await getMyPronouns()
            if(pronouns) clone.value=pronouns
        }
    }

    if(nicknamefield){
      const clone = nicknamefield.cloneNode(true)
      clone.name='Pronouns'
      clone.label='Pronouns'
      clone.maxlength='24'
      clone.id='pronouns'

      if(!document.getElementById('pronouns')){
        nicknamefield.parentElement.appendChild(clone)
        const regex = /[A-Z0-9]{26}/;
        const serverid = regex.exec(clickedServer.href)[0]
        const pronouns = await getMyServerPronouns(serverid)
        if(pronouns) clone.value=pronouns
        clickedServer = null;
      }
    }

    if(!document.getElementsByClassName('will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll flex-g_1').item(0)) return;
    let servers;
    for(const child of document.getElementsByClassName('will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll flex-g_1').item(0).children){
      if(child.getAttribute('role')=='list'){
        servers = child;
      }
    }

    for(const server of servers.children){
      if(!server.dataset.contextmenulisteneradded){
        server.children[0].children[0].addEventListener('contextmenu',(e)=>{
          if(e.target.href.includes('/server')){
            clickedServer = e.target
          }
        });
        server.dataset.contextmenulisteneradded=true
      }
    }
  }

  const observer = new MutationObserver(() => {
    pronouns();
  });

  async function init() {
    pronouns();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    document.addEventListener('mousedown',(e)=>{
      if(e.which==3){
        if(e.target.className==`w_56px h_56px pos_relative d_grid flex-sh_0 place-items_center [&:before]:content_'_' [&:before]:pos_absolute [&:before]:w_12px [&:before]:h_8px [&:before]:trs_var(--transitions-fast)_all [&:before]:left_-8px [&:before]:bdr_4px [&:before]:bg_var(--md-sys-color-on-surface) [&:hover:before]:h_16px`){
          clickedServer = e.target.firstChild
        }

        if(e.target.className=='w_100% h_100% obj-f_cover'){
          if(e.target.closest(`a[href*='/server']`)) clickedServer = e.target.closest(`a[href*='/server']`)
        }
      }
    });
  }

  if (document.body) {
    init();
  } else {
    requestAnimationFrame(init);
  }
})();