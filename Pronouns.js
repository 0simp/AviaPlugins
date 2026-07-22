/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/Pronouns.js
  @VERSION: 1.1
*/

(function () {
  if (window.__PRONOUNS__) return;
  window.__PRONOUNS__ = true;

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
              if(userpopup&&!document.getElementById(('aviapronouns'))){
                const usernameparent = userpopup.querySelector(`div[class='ov-wrap_anywhere lh_1em fs_0.875rem ls_0.015625rem fw_400 d_flex gap_var(--gap-xs) flex-d_column']`)
                const pronounselement = document.createElement('div')
                pronounselement.textContent=json.pronouns
                pronounselement.id='aviapronouns'
                usernameparent.appendChild(pronounselement)

                const pronounscard = [...document.querySelectorAll(`div[class='pos_relative min-w_0 h_100% w_100% us_none c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-low) p_var(--gap-lg) bdr_var(--borderRadius-lg) d_flex gap_var(--gap-sm) flex-d_column ov_hidden asp_1/1']`)]
                .find(e=>e.textContent.includes(`${json.pronouns}`))
                if(pronounscard) pronounscard.style.display='none'
              }
            }else if (document.baseURI.includes('server')){
              const res = await fetch(`https://stoat.chat/api/users/${id}`,config)
              if(res.ok){
                const json = await res.json()
                if(json.pronouns){
                  const userpopup = document.querySelector(`div[class='will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high) bx-sh_0_0_3px_var(--md-sys-color-shadow) w_340px h_400px bdr_var(--borderRadius-xl)'],div[class='p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)']`)
                  if(userpopup&&!document.getElementById(('aviapronouns'))){
                    const usernameparent = userpopup.querySelector(`div[class='ov-wrap_anywhere lh_1em fs_0.875rem ls_0.015625rem fw_400 d_flex gap_var(--gap-xs) flex-d_column']`)
                    const pronounselement = document.createElement('div')
                    pronounselement.textContent=json.pronouns
                    pronounselement.id='aviapronouns'
                    usernameparent.appendChild(pronounselement)

                    const pronounscard = [...document.querySelectorAll(`div[class='pos_relative min-w_0 h_100% w_100% us_none c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-low) p_var(--gap-lg) bdr_var(--borderRadius-lg) d_flex gap_var(--gap-sm) flex-d_column ov_hidden asp_1/1']`)]
                  .find(e=>e.textContent.includes(`${json.pronouns}`))
                  if(pronounscard) pronounscard.style.display='none'
                  }
                }
              }
            }
          }
        }
    } catch (e) { console.log(e); }
    return originalFetch(resource, config)
  };

  async function pronouns() {
    const messagepronounspans = document.querySelectorAll(`span[class='c_var(--md-sys-color-outline) ov-wrap_anywhere lh_1rem fs_0.75rem ls_0.025rem fw_400']`)
    messagepronounspans.forEach(span=>{
      if(span.style?.display!='none'){
        span.style.display='none'
        span.nextSibling.style.display='none'
      }
    });
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
  }

  if (document.body) {
    init();
  } else {
    requestAnimationFrame(init);
  }
})();