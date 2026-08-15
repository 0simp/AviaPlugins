/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/SilentLeaveGCs.js
  @VERSION: 1.0
*/

(function () {
  if (window.__SILENT_LEAVE_GCS__) return;
  window.__SILENT_LEAVE_GCS__ = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function (resource, config = {}) {
    try {
      if(resource.includes('/channels')&&config.method=='DELETE'&&!resource.includes('?leave_silently=true')){
        const checkbox = document.getElementById('silentleavegc')
        if(checkbox&&checkbox.checked==true){
            resource = resource+`leave_silently=true`
        }
      }
    } catch (_) {}
    return originalFetch(resource,config);
  };

  function createCheckbox(popup){
    if(document.getElementById('silentleavegc')) return;
    const checkbox = document.createElement('mdui-checkbox')
    checkbox.id='silentleavegc'
    checkbox.name='silent'
    checkbox.value='on'
    checkbox.textContent='Don\'t notify others that you\'ve left'
    popup.insertBefore(checkbox,popup.lastChild)
  }

  function silentLeaveGCs() {
    const gcleavebutton = document.querySelector(`a:has(>svg>path[d='m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5z'])`)
    const copylinkbutton = document.querySelector(`a:has(svg>path[d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1'])`)
    if(gcleavebutton&&copylinkbutton){
      gcleavebutton.onclick = function(){
        const gcleavepopup = document.getElementsByClassName('dialog').item(0)
        if(gcleavepopup){
          createCheckbox(gcleavepopup.firstChild)
        }else{
          const interval = setInterval(() => {
            const gcleavepopup = document.getElementsByClassName('dialog').item(0)
            if(gcleavepopup){
              createCheckbox(gcleavepopup.firstChild)
              clearInterval(interval)
            } 
          }, 1);
        }
      }
    }
  }

  const observer = new MutationObserver(() => {
    silentLeaveGCs();
  });

  function init() {
    silentLeaveGCs();
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