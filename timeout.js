(function () {
  if (window.__TIMEOUT__) return;
  window.__TIMEOUT__ = true;
  let value = null;

  let capturedToken = null;
  let fetchedUsers = [];
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

  async function apiReq(url, method, body) {
    if(!capturedToken) return;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "X-Session-Token": capturedToken },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => "");
    try { return { ok: res.ok, body: JSON.parse(text) }; }
    catch { return { ok: res.ok, body: text }; }
  }

  async function timeout() {
    capturedToken = await getToken()
    if(!capturedToken) return;
    if(!document.baseURI.includes('/server')) return;

    const contextMenu = document.getElementsByClassName('d_flex flex-d_column p_var(--gap-md)_0 ov_hidden bdr_var(--borderRadius-xs) bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bx-sh_0_0_3px_var(--md-sys-color-shadow) us_none UserContextMenu')
    .item(0)
    if(!contextMenu){
      if(document.body.style.getPropertyValue('overflow')){
        document.body.style.removeProperty('overflow')
      }
      return;
    } 
    document.body.style.overflow='hidden'

    const kickmembersvg = contextMenu.querySelector(`path[d='M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4m-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2M2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4m2 0c.2-.71 3.3-2 6-2 2.69 0 5.77 1.28 6 2zm13-8h6v2h-6z']`)
    const banmembersvg = contextMenu.querySelector(`path[d='M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8']`)

    if(((kickmembersvg&&kickmembersvg.parentElement.parentElement.nextSibling.firstChild.firstChild.getAttribute('d')!='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.9 7.9 0 0 1 4 12m8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.9 7.9 0 0 1 20 12c0 4.42-3.58 8-8 8')
    ||banmembersvg)&&!document.getElementById('timeout')){
        const timeoutButton = document.createElement('a')
        timeoutButton.id='timeout'
        timeoutButton.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer fill_var(--md-sys-color-error) c_var(--md-sys-color-error) tt_capitalize'
        
        const icon = document.createElement('span')
        icon.className='material-symbols-outlined fs_inherit fw_undefined!'
        icon.style='display: block; font-size:16px; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
        icon.textContent='alarm'

        const text = document.createElement('span')
        text.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
        text.textContent='Timeout member'

        timeoutButton.appendChild(icon)
        timeoutButton.appendChild(text)

        timeoutButton.onclick = async function(){
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
                  span.textContent='Timeout Member'

                  const div = document.createElement('div')
                  div.className='c_var(--md-sys-color-on-surface-variant) lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'

                  const divchild = document.createElement('div')
                  divchild.className='d_flex flex-d_column flex-g_initial m_0 ai_center jc_initial gap_var(--gap-md)'

                  const svg = document.createElement('svg')
                  svg.setAttribute('viewBox','0 0 32 32')
                  svg.className='flex-sh_0 us_none cursor_inherit'
                  svg.style='width: 64px; height: 64px;'
                  svg.innerHTML=`<g><foreignObject x="0" y="0" width="32" height="32" class="trs_var(--transitions-fast)_filter"><div class="ov_hidden w_100% h_100% bdr_var(--borderRadius-circle)"><img src="https://cdn.stoatusercontent.com/avatars/${user.avatar._id}/original" draggable="false" class="w_100% h_100% obj-f_cover"></div></foreignObject></g>`

                  const span2 = document.createElement('span')
                  span2.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
                  span2.textContent=`You are about to timeout ${user.username}`

                  const durationbutton = document.createElement('button')
                  durationbutton.className='d_flex ai_center jc_space-between w_100% min-h_56px p_8px_16px bdr_4px_4px_0_0 bd_none bd-b_1px_solid_var(--md-sys-color-outline) bg_var(--md-sys-color-surface-container-highest) c_var(--md-sys-color-on-surface) cursor_pointer pos_relative ta_left fs_16px ff_inherit trs_border-color_0.2s [&:hover]:bd-b-c_var(--md-sys-color-on-surface) [&:focus]:ring_none [&:focus]:bd-b-c_var(--md-sys-color-primary) [&:focus]:bd-b-w_2px'

                  const durationlabel = document.createElement('label')
                  durationlabel.className='pos_absolute trs_ease-in-out_0.2s left_16px c_var(--md-sys-color-on-surface-variant) pointer-events_none trf-o_left_top top_8px fs_12px trf_translateY(0)'
                  durationlabel.textContent='Duration'
                  durationbutton.appendChild(durationlabel)

                  const durationspan = document.createElement('span')
                  durationspan.className='flex_1 ov_hidden tov_ellipsis white-space_nowrap pt_16px'
                  durationspan.textContent='1 hour'
                  durationbutton.appendChild(durationspan)

                  const durationbuttonmdripple = document.createElement('md-ripple')
                  durationbuttonmdripple.ariaHidden=true
                  durationbutton.appendChild(durationbuttonmdripple)

                  const durationbuttonspan = document.createElement('span')
                  durationbuttonspan.className='material-symbols-outlined fs_inherit fw_undefined!'
                  durationbuttonspan.style='display: block; font-size: 16px;'
                  durationbuttonspan.textContent='arrow_drop_down'
                  durationbutton.appendChild(durationbuttonspan)

                  let menuopen = false;
                  function toggleMenu(){
                    const rect = durationbutton.getBoundingClientRect()
                    const x = Number(rect.x.toFixed(3))
                    const y = Number(rect.y.toFixed(3))

                    const style = document.createElement('div')
                    style.style=`position: absolute; top: ${y+60}px; left: ${x}px; z-index: 1000; opacity: 1; --motion-translateY: 0px; transform: translateY(var(--motion-translateY)); min-width: 266px;`

                    const selectmenu = document.createElement('div')
                    selectmenu.className='d_flex flex-d_column max-h_40vh ov-y_auto scr-bar-w_none bdr_4px bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface) bx-sh_0_2px_8px_rgba(0,_0,_0,_0.2) p_8px_0 [&_mdui-menu-item]:cursor_pointer [&_mdui-menu-item]:p_0px_1.5rem [&_mdui-menu-item]:trs_background_0.2s [&_mdui-menu-item]:h_3rem [&_mdui-menu-item]:[&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent)'

                    const oneminute = document.createElement('mdui-menu-item')
                    oneminute.value=60000
                    oneminute.textContent='1 minute'
                    oneminute.onclick = function(){
                      durationspan.textContent=`1 minute`
                      value = new Date(Date.now()+60000).toISOString()
                      span2.textContent=`You are about to timeout ${user.username}`
                      timeoutbutton.textContent=`Timeout`
                      toggleMenu()
                    }

                    const fiveminutes = document.createElement('mdui-menu-item')
                    fiveminutes.value=300000
                    fiveminutes.textContent='5 minutes'
                    fiveminutes.onclick = function(){
                      durationspan.textContent=`5 minutes`
                      value = new Date(Date.now()+300000).toISOString()
                      span2.textContent=`You are about to timeout ${user.username}`
                      timeoutbutton.textContent=`Timeout`
                      toggleMenu()
                    }

                    const tenminutes = document.createElement('mdui-menu-item')
                    tenminutes.value=600000
                    tenminutes.textContent='10 minutes'
                    tenminutes.onclick = function(){
                      durationspan.textContent=`10 minutes`
                      value = new Date(Date.now()+600000).toISOString()
                      span2.textContent=`You are about to timeout ${user.username}`
                      timeoutbutton.textContent=`Timeout`
                      toggleMenu()
                    }

                    const onehour = document.createElement('mdui-menu-item')
                    onehour.value=3600000
                    onehour.textContent='1 hour'
                    onehour.onclick = function(){
                      durationspan.textContent=`1 hour`
                      value = new Date(Date.now()+3600000).toISOString()
                      span2.textContent=`You are about to timeout ${user.username}`
                      timeoutbutton.textContent=`Timeout`
                      toggleMenu()
                    }

                    const oneday = document.createElement('mdui-menu-item')
                    oneday.value=86400000
                    oneday.textContent='1 day'
                    oneday.onclick = function(){
                      durationspan.textContent=`1 day`
                      value = new Date(Date.now()+86400000).toISOString()
                      span2.textContent=`You are about to timeout ${user.username}`
                      timeoutbutton.textContent=`Timeout`
                      toggleMenu()
                    }

                    const oneweek = document.createElement('mdui-menu-item')
                    oneweek.value=604800000
                    oneweek.textContent='1 week'
                    oneweek.onclick = function(){
                      durationspan.textContent=`1 week`
                      value = new Date(Date.now()+604800000).toISOString()
                      span2.textContent=`You are about to timeout ${user.username}`
                      timeoutbutton.textContent=`Timeout`
                      toggleMenu()
                    }

                    const remove = document.createElement('mdui-menu-item')
                    remove.value=0
                    remove.textContent='Remove'
                    remove.onclick = function(){
                      durationspan.textContent=`Remove`
                      value = new Date(Date.now()).toISOString()
                      span2.textContent=`You are about to remove ${user.username}'s timeout`
                      timeoutbutton.textContent=`Remove timeout`
                      toggleMenu()
                    }

                    selectmenu.appendChild(oneminute)
                    selectmenu.appendChild(fiveminutes)
                    selectmenu.appendChild(tenminutes)
                    selectmenu.appendChild(onehour)
                    selectmenu.appendChild(oneday)
                    selectmenu.appendChild(oneweek)
                    selectmenu.appendChild(remove)
                    style.appendChild(selectmenu)
                    if(!menuopen){
                      const floating = document.getElementById('floating')
                      floating.lastChild.appendChild(style)
                      menuopen = true
                      durationbuttonspan.textContent='arrow_drop_up'
                    }else{
                      floating.lastChild.lastChild.remove()
                      menuopen = false
                      durationbuttonspan.textContent='arrow_drop_down'
                    }
                  }

                  durationbutton.onclick = function(){
                      toggleMenu()
                  }

                  const custom = document.createElement('mdui-text-field')
                  custom.id='customtimeoutduration'
                  custom.variant='filled'
                  custom.type='text'
                  custom.name='customValue'
                  custom.label='Enter a custom value (in seconds)'
                  custom.placeholder='0-604800'
                  custom.maxlength=6

                  custom.oninput = function(){
                    if(isNaN(Number(custom.value))||!(Number(custom.value)>=0)||!(Number(custom.value)<=604800)||custom.value.includes('.')){
                        custom.label=`Enter a custom value (in seconds) - invalid input`
                        custom.value=''
                        setTimeout(() => {
                          custom.label='Enter a custom value (in seconds)'
                        }, 3000);
                      }
                  }

                  const buttons = document.createElement('div')
                  buttons.className='gap_8px d_flex jc_end mbs_24px'

                  const cancelbutton = document.createElement('button')
                  cancelbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 pos_relative px_16px flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'
                  cancelbutton.innerHTML=`<md-ripple aria-hidden="true"></md-ripple>Cancel`
                
                  const timeoutbutton = document.createElement('button')
                  timeoutbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 pos_relative px_16px flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'
                  timeoutbutton.innerHTML=`<md-ripple aria-hidden="true"></md-ripple>Timeout`
                  timeoutbutton.onclick = async function(){
                    if(document.getElementById('customtimeoutduration').value){
                      value = new Date(Date.now()+Number(document.getElementById('customtimeoutduration').value*1000)).toISOString()
                    }
                    
                    const serverid = document.baseURI.substring(document.baseURI.indexOf('server/')+7,document.baseURI.indexOf('/channel'))
                    const res = await apiReq(`https://stoat.chat/api/servers/${serverid}/members/${user._id}`,'PATCH',{
                      timeout:value
                    })

                    if(!res.ok){
                      let text;
                      if(res.body?.type=='MissingPermission'){
                        text = `You don't have permission to do this`
                      }else{
                        text = `An error occured while timing out ${user.username}. See console for more info`
                        console.log(res)
                      }

                      const textelement = document.createElement('text')
                      textelement.style.color='red'
                      textelement.textContent=text

                      popup.insertBefore(textelement,buttons)

                      setTimeout(() => {
                          textelement.remove()
                      }, 3000);
                      return;
                    }
            
                    cancelbutton.click()
                  }

                  style.appendChild(popup)
                  popup.appendChild(span)
                  popup.appendChild(div)
                  div.appendChild(divchild)
                  divchild.appendChild(svg)
                  divchild.appendChild(span2)
                  divchild.appendChild(durationbutton)
                  divchild.appendChild(custom)
                  popup.appendChild(buttons)
                  buttons.appendChild(cancelbutton)
                  buttons.appendChild(timeoutbutton)

                  const floating = document.getElementById('floating')
                  const thing = document.createElement('div')
                  thing.className='top_0 left_0 right_0 bottom_0 pos_fixed z_100 max-h_100% d_grid us_none place-items_center pointer-events_all anim-n_scrimFadeIn anim-dur_0.1s anim-fm_forwards trs_var(--transitions-medium)_all p_80px ov-y_auto --background_rgba(0,_0,_0,_0.6)'
                  thing.style='--background: rgba(0, 0, 0, 0.6);'
                  floating.lastChild.appendChild(thing)
                  thing.appendChild(style)
                  thing.onclick = function(e){
                    if(e.target==thing){
                      if(menuopen) toggleMenu()
                      thing.remove()
                    }
                  }

                  cancelbutton.onclick = function(){
                    thing.remove()
                  }
              })
          }
      }

      if(kickmembersvg){
          contextMenu.insertBefore(timeoutButton,kickmembersvg.parentElement.parentElement)
      }else{
          contextMenu.insertBefore(timeoutButton,banmembersvg.parentElement.parentElement)
      }
    }
  }

  const observer = new MutationObserver(() => {
    timeout();
  });

  function init() {
    timeout();
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