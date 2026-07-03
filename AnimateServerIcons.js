(function () {
  if (window.__ANIMATE_SERVER_ICONS__) return;
  window.__ANIMATE_SERVER_ICONS__ = true;

  function animateServerIcons() {
    const servers = [...document.querySelectorAll(`a[href*='/server']`)].filter(e=>
        e.querySelector('img')&&!e.className
    )

    servers.forEach(server=>{
        const icon = server.querySelector(`img`)
        if(icon.src.includes('stoatusercontent.com/icons')&&!icon.src.endsWith('/original')){
            icon.src = icon.src+'/original'
        }
    })

    const invites = document.querySelectorAll(`div[class='d_flex ai_center max-w_320px h_64px gap_var(--gap-md) p_var(--gap-md) bdr_var(--borderRadius-md) c_var(--md-sys-color-on-secondary-container) bg_var(--md-sys-color-secondary-container)']`)

    invites.forEach(invite=>{
        const icon = invite.querySelector(`img`)
        if(icon.src.includes('stoatusercontent.com/icons')&&!icon.src.endsWith('/original')){
            icon.src = icon.src+'/original'
        }
    })
  }

  const observer = new MutationObserver(() => {
    animateServerIcons();
  });

  function init() {
    animateServerIcons();
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