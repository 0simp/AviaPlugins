(function () {
  if (window.__KICK_MEMBERS_FROM_GC__) return;
  window.__KICK_MEMBERS_FROM_GC__ = true;

  let baseuris = [];
  let groups = []
  let capturedToken = null;
  let myId = null;
  let owendGcs = [];
  let fetchedUsers = [];
  const originalFetch = window.fetch.bind(window);
  window.fetch = async function (resource, config = {}) {
    try {
      const options = config;
      const headers = options?.headers;
      if (headers) {
        if (typeof headers.get === "function") {
          const t = headers.get("X-Session-Token") || headers.get("x-session-token");
          if (t) capturedToken = t;
        } else {
          const t = headers["X-Session-Token"] || headers["x-session-token"];
          if (t) capturedToken = t;
        }
      }

      if(resource.includes('/messages')&&config.method=='GET'){
        setTimeout(async() => {
            const channel = await originalFetch(`https://stoat.chat/api/channels/${document.baseURI.substring(document.baseURI.lastIndexOf('/')+1)}`,config)
            const json = await channel.json()
            if(json.channel_type=='Group'){
                groups.push(document.baseURI.substring(document.baseURI.lastIndexOf('/')+1))
                if(myId&&myId==json.owner&&!owendGcs.includes(document.baseURI.substring(document.baseURI.lastIndexOf('/')+1))){
                    owendGcs.push(document.baseURI.substring(document.baseURI.lastIndexOf('/')+1))
                }
            }
        }, 100);
      }
    } catch (_) {}
    return originalFetch(resource,config);
  };

  async function apiReq(url, method, body) {
    const res = await originalFetch(url, {
      method,
      headers: { "Content-Type": "application/json", "X-Session-Token": capturedToken },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => "");
    try { return { ok: res.ok, body: JSON.parse(text) }; }
    catch { return { ok: res.ok, body: text }; }
  }

  async function getMyId(){
    if(!capturedToken)return;
    if(!myId){
        const res = await apiReq('https://stoat.chat/api/users/@me','GET')
        if(res.body._id){
            myId = res.body._id
        }
    }
  }

  async function kickMembersFromGC() {
    if(!capturedToken)return;

    if(owendGcs.includes(document.baseURI.substring(document.baseURI.lastIndexOf('/')+1))){
        const contextMenu = document.getElementsByClassName('d_flex flex-d_column p_var(--gap-md)_0 ov_hidden bdr_var(--borderRadius-xs) bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bx-sh_0_0_3px_var(--md-sys-color-shadow) us_none UserContextMenu')
        .item(0)

        if(contextMenu&&!document.getElementById('kickmemberfromgc')){
            const kickButton = document.createElement('a')
            kickButton.id='kickmemberfromgc'
            kickButton.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer fill_var(--md-sys-color-error) c_var(--md-sys-color-error) tt_capitalize'
            kickButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4m-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2M2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4m2 0c.2-.71 3.3-2 6-2 2.69 0 5.77 1.28 6 2zm13-8h6v2h-6z"></path></svg><span class="lh_1.25rem fs_0.875rem ls_0.015625rem fw_400">Kick member</span>`
            kickButton.onclick = async function(){
                const copyidsvg = document.querySelector(`path[d='M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2m-9 0V4h2v5h-2zm9 13H4V9h5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2h5z']`)
                if(copyidsvg){
                    await copyidsvg.parentElement.parentElement.click()
                    navigator.clipboard.readText().then(async text=>{
                        if(!fetchedUsers.find(user=>user._id==text)){
                          const user = await apiReq(`https://stoat.chat/api/users/${text}`,'GET')
                          fetchedUsers.push(user.body)
                        }
                        const user = fetchedUsers.find(user=>user._id==text)

                        const style = document.createElement('div')
                        style.style='opacity: 1; --motion-translateY: 0px; transform: translateY(var(--motion-translateY));'
                        
                        const popup = document.createElement('div')
                        popup.className='p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)'

                        const span = document.createElement('span')
                        span.className='lh_2rem fs_1.5rem ls_0 fw_400 mbe_16px'
                        span.textContent='Kick Member'

                        const div = document.createElement('div')
                        div.className='c_var(--md-sys-color-on-surface-variant) lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'

                        const divchild = document.createElement('div')
                        divchild.className='d_flex flex-d_column flex-g_initial m_0 ai_center jc_initial gap_var(--gap-md)'

                        const kicktextspan = document.createElement('span')
                        kicktextspan.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
                        kicktextspan.textContent=`You are about to kick ${user.username}`

                        const buttons = document.createElement('div')
                        buttons.className='gap_8px d_flex jc_end mbs_24px'

                        const cancelbutton = document.createElement('button')
                        cancelbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 pos_relative px_16px flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'
                        cancelbutton.innerHTML=`<md-ripple aria-hidden="true"></md-ripple>Cancel`
                
                        const kickbutton = document.createElement('button')
                        kickbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 pos_relative px_16px flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'
                        kickbutton.innerHTML=`<md-ripple aria-hidden="true"></md-ripple>Kick`
                        kickbutton.onclick = async function(){
                          await apiReq(`https://stoat.chat/api/channels/${document.baseURI.substring(document.baseURI.lastIndexOf('/')+1)}/recipients/${user._id}`,'DELETE')
                          cancelbutton.click()
                        }

                        style.appendChild(popup)
                        popup.appendChild(span)
                        popup.appendChild(div)
                        div.appendChild(divchild)
                        divchild.appendChild(kicktextspan)
                        popup.appendChild(buttons)
                        buttons.appendChild(cancelbutton)
                        buttons.appendChild(kickbutton)

                        const floating = document.getElementById('floating')
                        const thing = document.createElement('div')
                        thing.className='top_0 left_0 right_0 bottom_0 pos_fixed z_100 max-h_100% d_grid us_none place-items_center pointer-events_all anim-n_scrimFadeIn anim-dur_0.1s anim-fm_forwards trs_var(--transitions-medium)_all p_80px ov-y_auto --background_rgba(0,_0,_0,_0.6)'
                        thing.style='--background: rgba(0, 0, 0, 0.6);'
                        floating.lastChild.appendChild(thing)
                        thing.appendChild(style)

                        cancelbutton.onclick = function(){
                          thing.remove()
                        }
                    })
                }
            }

            const reportSvg = document.querySelector(`path[d='M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z']`)
            if(reportSvg){
                contextMenu.insertBefore(kickButton,reportSvg.parentElement.parentElement)
            }
        }
    }
  }

  const observer = new MutationObserver(() => {
    if(baseuris[baseuris.length-1]!=document.baseURI){
      baseuris.push(document.baseURI)
      getMyId();
    }
    kickMembersFromGC();
  });

  function init() {
    kickMembersFromGC();
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