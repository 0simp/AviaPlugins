(function () {
  if (window.__TIMEOUT__) return;
  window.__TIMEOUT__ = true;
  let value = null;

  let capturedToken = null;
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
    } catch (_) {}
    return originalFetch(resource,config);
  };

  async function apiReq(url, method, body) {
    if(!capturedToken) return;
    const res = await originalFetch(url, {
      method,
      headers: { "Content-Type": "application/json", "X-Session-Token": capturedToken },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => "");
    try { return { ok: res.ok, body: JSON.parse(text) }; }
    catch { return { ok: res.ok, body: text }; }
  }

  async function timeout() {
    if(!capturedToken) return;
    if(!document.baseURI.includes('/server')) return;

    const contextMenu = document.getElementsByClassName('d_flex flex-d_column p_var(--gap-md)_0 ov_hidden bdr_var(--borderRadius-xs) bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bx-sh_0_0_3px_var(--md-sys-color-shadow) us_none UserContextMenu')
    .item(0)
    if(!contextMenu) return;

    const kickmembersvg = contextMenu.querySelector(`path[d='M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4m-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2M2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4m2 0c.2-.71 3.3-2 6-2 2.69 0 5.77 1.28 6 2zm13-8h6v2h-6z']`)
    const banmembersvg = contextMenu.querySelector(`path[d='M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8']`)

    if(((kickmembersvg&&kickmembersvg.parentElement.parentElement.nextSibling.firstChild.firstChild.getAttribute('d')!='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.9 7.9 0 0 1 4 12m8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.9 7.9 0 0 1 20 12c0 4.42-3.58 8-8 8')
    ||banmembersvg)&&!document.getElementById('timeout')){
        const timeoutButton = document.createElement('a')
        timeoutButton.id='timeout'
        timeoutButton.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer fill_var(--md-sys-color-error) c_var(--md-sys-color-error) tt_capitalize'
        
        const mdripple = document.createElement('md-ripple')
        mdripple.ariaHidden=true

        const icon = document.createElement('span')
        icon.className='material-symbols-outlined fs_inherit fw_undefined!'
        icon.style='display: block; font-size:16px; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
        icon.textContent='alarm'

        const text = document.createElement('span')
        text.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
        text.textContent='Timeout member'

        timeoutButton.appendChild(mdripple)
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

                    const span2 = document.createElement('span')
                    span2.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
                    span2.textContent=`You are about to timeout ${user.username}`

                    const durationdiv = document.createElement('div')
                    durationdiv.style='display: flex; flex-direction: column; gap: 8px;'

                    const durationdiv2 = document.createElement('div')
                    durationdiv2.style='display: flex; gap: 6px; align-items: center;'

                    const durationspan = document.createElement('span')
                    durationspan.style='font-size: 0.75rem; letter-spacing: 0.025rem; color: var(--md-sys-color-on-surface-variant); margin-right: 4px;'
                    durationspan.textContent='Duration'

                    durationdiv2.appendChild(durationspan)
                    durationdiv.appendChild(durationdiv2)

                    const durationdiv3 = document.createElement('div')
                    durationdiv3.style='display: flex; flex-wrap: wrap; gap: 6px;'

                    const button1minute = document.createElement('button')
                    button1minute.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                    button1minute.textContent='1 minute'
                    button1minute.setAttribute('value',60000)
                    button1minute.onclick = function(e){
                      e.preventDefault()
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                      if(!button1minute.getAttribute('clicked')){
                          [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button1minute).forEach(button=>{
                            button.removeAttribute('clicked')
                            button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          })
                          button1minute.setAttribute('clicked',true)
                          button1minute.style.background='black'
                          document.getElementById('customtimeoutduration').disabled=true
                          document.getElementById('customtimeoutduration').value=''
                          span.textContent=`Timeout member`
                          span2.textContent=`You are about to timeout ${user.username}`
                          timeoutbutton.textContent='Timeout'
                          value = new Date(Date.now()+Number(button1minute.getAttribute('value'))).toISOString()
                      }else{
                          button1minute.removeAttribute('clicked')
                          button1minute.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          document.getElementById('customtimeoutduration').disabled=false
                      }
                  }

                    const button5minutes = document.createElement('button')
                    button5minutes.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                    button5minutes.textContent='5 minutes'
                    button5minutes.setAttribute('value',300000)
                    button5minutes.onclick = function(e){
                      e.preventDefault()
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                      if(!button5minutes.getAttribute('clicked')){
                          [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button5minutes).forEach(button=>{
                            button.removeAttribute('clicked')
                            button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          })
                          button5minutes.setAttribute('clicked',true)
                          button5minutes.style.background='black'
                          document.getElementById('customtimeoutduration').disabled=true
                          document.getElementById('customtimeoutduration').value=''
                          span.textContent=`Timeout member`
                          span2.textContent=`You are about to timeout ${user.username}`
                          timeoutbutton.textContent='Timeout'
                          value = new Date(Date.now()+Number(button5minutes.getAttribute('value'))).toISOString()
                      }else{
                          button5minutes.removeAttribute('clicked')
                          button5minutes.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          document.getElementById('customtimeoutduration').disabled=false
                      }
                  }

                    const button10minutes = document.createElement('button')
                    button10minutes.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                    button10minutes.textContent='10 minutes'
                    button10minutes.setAttribute('value',600000)
                    button10minutes.onclick = function(e){
                      e.preventDefault()
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                      if(!button10minutes.getAttribute('clicked')){
                          [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button10minutes).forEach(button=>{
                            button.removeAttribute('clicked')
                            button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          })
                          button10minutes.setAttribute('clicked',true)
                          button10minutes.style.background='black'
                          document.getElementById('customtimeoutduration').disabled=true
                          document.getElementById('customtimeoutduration').value=''
                          span.textContent=`Timeout member`
                          span2.textContent=`You are about to timeout ${user.username}`
                          timeoutbutton.textContent='Timeout'
                          value = new Date(Date.now()+Number(button10minutes.getAttribute('value'))).toISOString()
                      }else{
                          button10minutes.removeAttribute('clicked')
                          button10minutes.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          document.getElementById('customtimeoutduration').disabled=false
                      }
                  }

                    const button1hour = document.createElement('button')
                    button1hour.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                    button1hour.textContent='1 hour'
                    button1hour.setAttribute('value',3600000)
                    button1hour.onclick = function(e){
                      e.preventDefault()
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                      if(!button1hour.getAttribute('clicked')){
                          [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button1hour).forEach(button=>{
                            button.removeAttribute('clicked')
                            button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          })
                          button1hour.setAttribute('clicked',true)
                          button1hour.style.background='black'
                          document.getElementById('customtimeoutduration').disabled=true
                          document.getElementById('customtimeoutduration').value=''
                          span.textContent=`Timeout member`
                          span2.textContent=`You are about to timeout ${user.username}`
                          timeoutbutton.textContent='Timeout'
                          value = new Date(Date.now()+Number(button1hour.getAttribute('value'))).toISOString()
                      }else{
                          button1hour.removeAttribute('clicked')
                          button1hour.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          document.getElementById('customtimeoutduration').disabled=false
                      }
                  }

                  const button1day = document.createElement('button')
                  button1day.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                  button1day.textContent='1 day'
                  button1day.setAttribute('value',86400000)
                  button1day.onclick = function(e){
                    e.preventDefault()
                    e.stopPropagation()
                    e.stopImmediatePropagation()
                    if(!button1day.getAttribute('clicked')){
                        [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button1day).forEach(button=>{
                          button.removeAttribute('clicked')
                          button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                        })
                        button1day.setAttribute('clicked',true)
                        button1day.style.background='black'
                        document.getElementById('customtimeoutduration').disabled=true
                        document.getElementById('customtimeoutduration').value=''
                        span.textContent=`Timeout member`
                        span2.textContent=`You are about to timeout ${user.username}`
                        timeoutbutton.textContent='Timeout'
                        value = new Date(Date.now()+Number(button1day.getAttribute('value'))).toISOString()
                    }else{
                        button1day.removeAttribute('clicked')
                        button1day.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                        document.getElementById('customtimeoutduration').disabled=false
                    }
                }

                  const button1week = document.createElement('button')
                  button1week.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                  button1week.textContent='1 week'
                  button1week.setAttribute('value',604800000)
                  button1week.setAttribute('value',604800000)
                  button1week.onclick = function(e){
                      e.preventDefault()
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                      if(!button1week.getAttribute('clicked')){
                          [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button1week).forEach(button=>{
                            button.removeAttribute('clicked')
                            button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          })
                          button1week.setAttribute('clicked',true)
                          button1week.style.background='black'
                          document.getElementById('customtimeoutduration').disabled=true
                          document.getElementById('customtimeoutduration').value=''
                          span.textContent=`Timeout member`
                          span2.textContent=`You are about to timeout ${user.username}`
                          timeoutbutton.textContent='Timeout'
                          value = new Date(Date.now()+Number(button1week.getAttribute('value'))).toISOString()
                      }else{
                          button1week.removeAttribute('clicked')
                          button1week.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          document.getElementById('customtimeoutduration').disabled=false
                      }
                  }

                  const buttonremove = document.createElement('button')
                  buttonremove.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
                  buttonremove.textContent='Remove'
                  buttonremove.setAttribute('value',0)
                  buttonremove.setAttribute('value',0)
                  buttonremove.onclick = function(e){
                      e.preventDefault()
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                      if(!buttonremove.getAttribute('clicked')){
                          [...document.querySelectorAll`button[clicked]`].filter(e=>e!=buttonremove).forEach(button=>{
                            button.removeAttribute('clicked')
                            button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          })
                          buttonremove.setAttribute('clicked',true)
                          buttonremove.style.background='black'
                          document.getElementById('customtimeoutduration').disabled=true
                          document.getElementById('customtimeoutduration').value=''
                          span.textContent='Remove timeout'
                          span2.textContent=`You are about to remove ${user.username}\'s timeout`
                          timeoutbutton.textContent='Remove timeout'
                          value = new Date(Date.now()+Number(buttonremove.getAttribute('value'))).toISOString()
                      }else{
                          buttonremove.removeAttribute('clicked')
                          buttonremove.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                          document.getElementById('customtimeoutduration').disabled=false
                          span.textContent=`Timeout member`
                          span2.textContent=`You are about to timeout ${user.username}`
                          timeoutbutton.textContent='Timeout'
                      }
                  }

                  durationdiv3.appendChild(button1minute)
                  durationdiv3.appendChild(button5minutes)
                  durationdiv3.appendChild(button10minutes)
                  durationdiv3.appendChild(button1hour)
                  durationdiv3.appendChild(button1day)
                  durationdiv3.appendChild(button1week)
                  durationdiv3.appendChild(buttonremove)

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
                  divchild.appendChild(span2)
                  divchild.appendChild(durationdiv)
                  divchild.appendChild(durationdiv3)
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