/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/Pronouns.js
  @VERSION: 1.3
*/

(function () {
  if (window.__PRONOUNS__) return;
  window.__PRONOUNS__ = true;
  let registered = false;
  let icon = '';

  function rgbToHex(r, g, b) {
   return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  if(!localStorage.getItem('avia-hidepronouns')){
    localStorage.setItem('avia-hidepronouns','true')
  }
  let hidepronouns = localStorage.getItem('avia-hidepronouns')=='true'
  if(hidepronouns) icon = 'check'
  else icon = 'close'

  function setHidePronouns(){
    localStorage.setItem('avia-hidepronouns',`${!hidepronouns}`)
    hidepronouns = !hidepronouns
    if(hidepronouns) icon = 'check'
    else icon = 'close'

    window.AviaMenu.updatesubmenu({parent:'avia-hidepronouns-toggle-parent',id:'avia-hidepronouns-toggle',icon:icon})
    pronouns()
  }

  function registerWithAviaMenu() {
    if(registered) return;
    if (window.AviaMenu) {
      window.AviaMenu.submenuregister({id:'avia-hidepronouns-toggle-parent',name:'Pronouns'})
      window.AviaMenu.submenu({parent:'avia-hidepronouns-toggle-parent', id: "avia-hidepronouns-toggle", name: "Hide pronouns in chat", icon: icon, onClick: setHidePronouns });
      registered=true
    } else {
      const interval = setInterval(() => {
        if (window.AviaMenu) {
          clearInterval(interval);
          window.AviaMenu.submenuregister({id:'avia-hidepronouns-toggle-parent',name:''})
          window.AviaMenu.submenu({parent:'avia-hidepronouns-toggle-parent', id: "avia-hidepronouns-toggle", name: "Hide pronouns in chat", icon: icon, onClick: setHidePronouns });
          registered=true
        }
      }, 100);
    }
  }

  function pronouns() {
    const messages = document.querySelectorAll(`div[class*='group'][id]`)
    messages.forEach(message=>{
      if(hidepronouns){
        const time = message.querySelector('time')
        if(!time) return;
        const target = time.closest('div').previousSibling
        try {
          const colours = getComputedStyle(target).getPropertyValue('color').replace('rgb','').replace('(','').replace(')','').split(', ')
          const r = Number(colours[0])
          const g = Number(colours[1])
          const b = Number(colours[2])
          const hex = rgbToHex(r,g,b)
          if(hex==getComputedStyle(document.body).getPropertyValue('--md-sys-color-outline')
          &&target.textContent&&!target.querySelector(`[aria-label]`)){
            time.closest('div').previousSibling.style.display='none'
          }
        } catch (error) {
          
        }
      }else{
        if(message.querySelector(`[style*='display: none']`)){
          message.querySelector(`[style*='display: none']`).style.removeProperty('display')
        }
      }
    })
    
    const username = document.querySelector(`div[aria-label='Click to copy username']`)
    if(!username) return;
    if(!username.parentElement.nextSibling?.textContent) return;
    const clone = username.parentElement.nextSibling.cloneNode(true)
    clone.style.textAlign='left'
    username.parentElement.nextSibling.remove()

    username.parentElement.parentElement.parentElement.appendChild(clone)
  }

  const observer = new MutationObserver(() => {
    pronouns();
  });

  function init() {
    pronouns();
    registerWithAviaMenu()
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