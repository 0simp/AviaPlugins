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

  function silentLeaveGCs() {
    const gcleavepopup = [...document.getElementsByClassName('p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)')].find(e=>
        !e.querySelector(`mdui-checkbox`)&&
        e.querySelector(`span[class='lh_2rem fs_1.5rem ls_0 fw_400 mbe_16px']`).textContent?.includes('Leave')&&
        !e.querySelector(`span[class='lh_2rem fs_1.5rem ls_0 fw_400 mbe_16px']`).textContent?.includes('#')&&
        !e.querySelector(`span[class='lh_2rem fs_1.5rem ls_0 fw_400 mbe_16px']`).textContent?.includes('Delete')
    )
    if(gcleavepopup){
        const checkbox = document.createElement('mdui-checkbox')
        checkbox.id='silentleavegc'
        checkbox.name='silent'
        checkbox.value='on'
        checkbox.textContent='Don\'t notify others that you\'ve left'
        gcleavepopup.insertBefore(checkbox,gcleavepopup.lastChild)
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