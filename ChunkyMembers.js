(function () {
  if (window.__CHUNKY_MEMBERS__) return;
  window.__CHUNKY_MEMBERS__ = true;

  function fuckwank(mutationsList, observer){
    mutationsList.forEach(mutation=>{
      if(mutation.type=='childList'){
        for(let node of mutation.addedNodes){
          if(node.className=='will-change_transform scr-bar-c_var(--md-sys-color-primary)_transparent ov-y_auto ov-x_hidden ov_hidden! scr-bar-g_stable flex-sh_0 w_var(--layout-width-channel-sidebar) bdr_var(--borderRadius-lg)'){
            node.style.width = `${node.clientWidth+node.previousSibling.clientWidth}px`
          }
        }
      }
    })
  }

  const fuckyshit = new MutationObserver(fuckwank)
  fuckyshit.observe(document.documentElement,{
    childList: true,
    subtree: true,
  })
})();