/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/AnimateIcons.js
  @VERSION: 1.0
*/

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

    const invites = document.querySelectorAll(`a[href*='stoat.chat/invite']`)
    invites.forEach(invite=>{
        const icon = invite.querySelector(`img[src*='stoatusercontent.com/icons']`)
        if(icon&&!icon.src.endsWith('/original')){
            icon.src = icon.src+'/original'
        }
    })

    const channelcontainers = [...document.querySelectorAll(`div[role='list']`)].filter(e=>
     e.querySelector(`a[href*='/channel']`)
     &&e.querySelector(`a[href*='/channel']`).getAttribute('use:floating')
     &&!e.ariaDescribedByElements?.includes(document.querySelector(`#dnd-zone-drag-disabled`))
    )
    channelcontainers.forEach(e=>{
        for(const child of e.children){
            const icon = child.querySelector(`img[src*='stoatusercontent.com/icons']`)
            if(icon&&!icon.src.endsWith('/original')){
                icon.src = icon.src+'/original'
            }
        }
    })
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