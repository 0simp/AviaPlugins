(function () {
  if (window.__ANIMATE_ICONS__) return;
  window.__ANIMATE_ICONS__ = true;

  function animateIcons() {
    const servers = [...document.querySelectorAll(`a[href*='/server']`)].filter(e=>
        e.querySelector('img')&&!e.className
    )

    servers.forEach(server=>{
        const icon = server.querySelector(`img`)
        if(icon&&icon.src.includes('stoatusercontent.com/icons')&&!icon.src.endsWith('/original')){
            icon.src = icon.src+'/original'
        }
    })

    const invites = document.querySelectorAll(`div[class='d_flex ai_center max-w_320px h_64px gap_var(--gap-md) p_var(--gap-md) bdr_var(--borderRadius-md) c_var(--md-sys-color-on-secondary-container) bg_var(--md-sys-color-secondary-container)']`)

    invites.forEach(invite=>{
        const icon = invite.querySelector(`img`)
        if(icon&&icon.src.includes('stoatusercontent.com/icons')&&!icon.src.endsWith('/original')){
            icon.src = icon.src+'/original'
        }
    })

    const dmlist = document.getElementsByClassName('d_flex flex-sh_0 flex-d_column ov_hidden bdr-tl_var(--borderRadius-lg) bdr-bl_var(--borderRadius-lg) w_var(--layout-width-channel-sidebar) fill_var(--md-sys-color-on-surface) c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-low) [&_a]:td_none phone:flex-g_1 channel_bar home').item(0)
    if(dmlist){
      const dms = dmlist.firstChild.firstChild.lastChild.children
      for(const dm of dms){
        const icon = dm.querySelector(`img[class='w_100% h_100% obj-f_cover']`)
        if(icon&&icon.src.includes('stoatusercontent.com/icons')&&!icon.src.endsWith('/original')){
          icon.src = icon.src+'/original'
        }
      }
    }

    const channellist = [...document.getElementsByClassName('will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll')].filter(e=>e.firstChild.role)[0]
    if(channellist){
      const channels = channellist.querySelectorAll(`a[class]`)
      for(const channel of channels){
        const icon = channel.querySelector(`img[class='w_16px h_16px obj-f_contain me_0.2em']`)
        if(icon&&icon.src.includes('stoatusercontent.com/icons')&&!icon.src.endsWith('/original')){
          icon.src = icon.src+'/original'
        }
      }
    }
  }

  const observer = new MutationObserver(() => {
    animateIcons();
  });

  function init() {
    animateIcons();
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