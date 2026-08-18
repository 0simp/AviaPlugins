/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/timeout.js
  @VERSION: 1.0
*/

(function () {
  if (window.__TIMEOUT__) return;
  window.__TIMEOUT__ = true;
  let value = new Date(Date.now()+3600000).toISOString()

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

    const contextMenu = document.querySelector(`div[class*='UserContextMenu']`)
    if(!contextMenu){
      if(document.body.style.getPropertyValue('overflow')){
        document.body.style.removeProperty('overflow')
      }
      return;
    } 
    document.body.style.overflow='hidden'

    const kickmemberbutton = [...contextMenu.querySelectorAll(`a:has(>div>span)`)].find(e=>e.querySelector('span').textContent=='person_remove')
    const banmemberbutton = [...contextMenu.querySelectorAll('a:has(>div>span)')].find(e=>e.querySelector('span').textContent=='do_not_disturb_on')

    if(((kickmemberbutton&&kickmemberbutton.nextSibling.querySelector('span').textContent!='block')
    ||banmemberbutton)&&!document.getElementById('timeout')){
        let targetbutton;
        if(banmemberbutton){
          targetbutton = banmemberbutton
        }else{
          targetbutton = kickmemberbutton
        }

        const timeoutButton = targetbutton.cloneNode(true)
        timeoutButton.id='timeout'
        timeoutButton.firstChild.firstChild.textContent = 'alarm'
        timeoutButton.lastChild.textContent = 'Timeout member'

        timeoutButton.onclick = async function(){
          const copyidbutton = [...document.querySelectorAll(`a:has(>div>span)`)].find(e=>e.querySelector('span').textContent=='badge')
          if(copyidbutton){
              await copyidbutton.click()
              navigator.clipboard.readText().then(async text=>{
                  if(!fetchedUsers.find(user=>user._id==text)){
                      const user = await apiReq(`https://stoat.chat/api/users/${text}`,'GET')
                      fetchedUsers.push(user.body)
                  }
                  const user = fetchedUsers.find(user=>user._id==text)

                  const overlay = document.createElement('div')
                  Object.assign(overlay.style,{
                    background: 'rgba(0, 0, 0, 0.6);',
                    maxHeight: '100%',
                    right: '0rem',
                    left: '0rem',
                    top: '0rem',
                    bottom: '0rem',
                    paddingBottom: '0px',
                    zIndex: '998',
                    position: 'fixed',
                    animationDuration: '.1s',
                    animationName: 'scrimFadeIn',
                    zIndex: '998',
                    animationFillMode: 'forwards',
                    position: 'fixed',
                    transition: 'var(--transitions-medium) all'
                  })

                  const dialogparent = document.createElement('div')
                  Object.assign(dialogparent.style,{
                    height: '100%',
                    width: '100%',
                    overflowY: 'auto',
                    pointerEvents: 'all',
                    display: 'grid',
                    webkitUserSelect: 'none',
                    userSelect: 'none',
                    placeItems: 'center',
                    padding: '80px'
                  })

                  const dialog = document.createElement('div')
                  dialog.className = 'dialog'
                  dialog.style = 'opacity: 1; --motion-translateY: 0px; transform: translateY(var(--motion-translateY));'
                        
                  const popup = document.createElement('div')
                  Object.assign(popup.style,{
                    maxWidth: '560px',
                    minWidth: '280px',
                    color: 'var(--md-sys-color-on-surface)',
                    flexDirection: 'column',
                    display: 'flex',
                    borderRadius: '28px',
                    padding: '24px',
                    background: 'var(--md-sys-color-surface-container-high)'
                  })

                  const span = document.createElement('span')
                  Object.assign(span.style,{
                    fontSize: '1.5rem',
                    lineHeight: '2rem',
                    letterSpacing: '0px',
                    fontWeight: '400',
                    marginBlockEnd: '16px'
                  })
                  span.textContent='Timeout Member'

                  const div = document.createElement('div')
                  Object.assign(div.style,{
                    letterSpacing: '0.015625rem',
                    lineHeight: '1.25rem',
                    fontWeight: '400',
                    overflowWrap: 'anywhere',
                    fontSize: '0.875rem',
                    color: 'var(--md-sys-color-on-surface-variant)'
                  })

                  const form = document.createElement('form')

                  const formchild = document.createElement('div')
                  Object.assign(formchild.style,{
                    justifyContent: 'initial',
                    alignItems: 'center',
                    flexDirection: 'column',
                    display: 'flex',
                    gap: 'var(--gap-md)',
                    margin: '0rem'
                  })

                  const svg = document.createElement('svg')
                  svg.setAttribute('viewBox','0 0 32 32')
                  svg.className='flex-sh_0 us_none cursor_inherit'
                  Object.assign(svg.style,{
                    width: '64px',
                    height: '64px',
                    cursor: 'inherit',
                    flexShrink: '0',
                    webkitUserSelect: 'none',
                    userSelect: 'none',

                  })
                  formchild.appendChild(svg)
                 
                  const g = document.createElement('g')
                  svg.appendChild(g)

                  const foreignObject = document.createElement('foreignObject')
                  foreignObject.setAttribute('x','0')
                  foreignObject.setAttribute('y','0')
                  foreignObject.setAttribute('width','32')
                  foreignObject.setAttribute('height','32')
                  foreignObject.style = 'transition: var(--transitions-fast) filter;'
                  g.appendChild(foreignObject)

                  const imgparent = document.createElement('div')
                  Object.assign(imgparent.style,{
                    height: '100%',
                    width: '100%',
                    borderRadius: 'var(--borderRadius-circle)',
                    overflow: 'hidden'
                  })
                  foreignObject.appendChild(imgparent)

                  const img = document.createElement('img')
                  img.setAttribute('draggable','false')
                  Object.assign(img.style,{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  })
                  img.src = `https://cdn.stoatusercontent.com/avatars/${user.avatar._id}/original`
                  imgparent.appendChild(img)

                  const span2 = document.createElement('span')
                  Object.assign(span2.style,{
                    letterSpacing: '0.015625rem',
                    lineHeight: '1.25rem',
                    fontWeight: '400',
                    overflowWrap: 'anywhere',
                    fontSize: '0.875rem'
                  })
                  span2.textContent=`You are about to timeout ${user.username}`
                  formchild.appendChild(span2)

                  const durationbutton = document.createElement('div')
                  Object.assign(durationbutton.style,{
                    minHeight: '56px',
                    width: '100%',
                    fontSize: '16px',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    position: 'relative',
                    cursor: 'pointer',
                    color: 'var(--md-sys-color-on-surface)',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    transition: 'border-color 0.2s',
                    bordoerBottom: '1px solid var(--md-sys-color-outline)',
                    borderRadius: '4px 4px 0px 0px',
                    padding: '8px 16px',
                    background: 'var(--md-sys-color-surface-container-highest)',
                    border: 'none'
                  })
                  formchild.appendChild(durationbutton)

                  const durationlabel = document.createElement('label')
                  Object.assign(durationlabel.style,{
                    top: '8px',
                    left: '16px',
                    transform: 'translateY(0px)',
                    fontSize: '12px',
                    transformOrigin: 'left top',
                    position: 'absolute',
                    pointerEvents: 'none',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    transition: '0.2s ease-in-out'
                  });
                  durationlabel.textContent='Duration'
                  durationbutton.appendChild(durationlabel)

                  const durationspan = document.createElement('span')
                  Object.assign(durationspan.style,{
                    paddingTop: '16px',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    flex: '1 1 0%'
                  })
                  durationspan.textContent='1 hour'
                  durationbutton.appendChild(durationspan)

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
                    Object.assign(selectmenu.style,{
                      maxHeight: '40vh',
                      overflowY: 'auto',
                      boxShadow: '0 2px 8px #0003',
                      scrollbarWidth: 'none',
                      color: 'var(--md-sys-color-on-surface)',
                      flexDirection: 'column',
                      display: 'flex',
                      borderRadius: '4px',
                      padding: '8px 0',
                      background: 'var(--md-sys-color-surface-container)'
                    })

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

                  durationbutton.$$click = function(){
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
                  formchild.appendChild(custom)

                  const buttons = document.createElement('div')
                  Object.assign(buttons.style,{
                    marginBlockStart: '24px',
                    justifyContent: 'end',
                    display: 'flex',
                    gap: '8px'
                  })

                  const cancelbutton = document.createElement('button')
                  Object.assign(cancelbutton.style,{
                    height:' 40px',
                    letterSpacing: '0.015625rem',
                    lineHeight: '1.25rem',
                    fontWeight: '400',
                    fontFamily: 'inherit',
                    overflowWrap: 'anywhere',
                    fontSize: '0.875rem',
                    fill: 'var(--md-sys-color-primary)',
                    color: 'var(--md-sys-color-primary)',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: '0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    transition: 'var(--transitions-medium) all',
                    borderRadius: 'var(--borderRadius-full)',
                    paddingInline: '16px',
                    border: 'none' 
                  })
                  cancelbutton.innerHTML=`<md-ripple aria-hidden="true"></md-ripple>Cancel`
                  buttons.appendChild(cancelbutton)
                
                  const timeoutbutton = document.createElement('button')
                  Object.assign(timeoutbutton.style,{
                    height:' 40px',
                    letterSpacing: '0.015625rem',
                    lineHeight: '1.25rem',
                    fontWeight: '400',
                    fontFamily: 'inherit',
                    overflowWrap: 'anywhere',
                    fontSize: '0.875rem',
                    fill: 'var(--md-sys-color-primary)',
                    color: 'var(--md-sys-color-primary)',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: '0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    transition: 'var(--transitions-medium) all',
                    borderRadius: 'var(--borderRadius-full)',
                    paddingInline: '16px',
                    border: 'none' 
                  })
                  timeoutbutton.innerHTML=`<md-ripple aria-hidden="true"></md-ripple>Timeout`
                  buttons.appendChild(timeoutbutton)
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

                  overlay.appendChild(dialogparent)
                  dialogparent.appendChild(dialog)
                  dialog.appendChild(popup)
                  popup.appendChild(span)
                  popup.appendChild(div)
                  div.appendChild(form)
                  form.appendChild(formchild)
                  popup.appendChild(buttons)

                  const floating = document.getElementById('floating')
                  floating.lastChild.appendChild(overlay)

                  overlay.onclick = function(e){
                    if(e.target==overlay||e.target==dialogparent){
                      if(menuopen) toggleMenu()
                      overlay.remove()
                    }
                  }

                  cancelbutton.onclick = function(){
                    overlay.remove()
                  }
              })
          }
      }
      contextMenu.insertBefore(timeoutButton,targetbutton.nextSibling)
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