(function () {
  if (window.__CHUNKY_MEMBERS__) return;
  window.__CHUNKY_MEMBERS__ = true;

  function chunkyMembers() {
    const memberlist = document.getElementsByClassName('will-change_transform scr-bar-c_var(--md-sys-color-primary)_transparent ov-y_auto ov-x_hidden ov_hidden! scr-bar-g_stable flex-sh_0 w_var(--layout-width-channel-sidebar) bdr_var(--borderRadius-lg)').item(0)
    if(memberlist&&memberlist.style.width!=`${memberlist.clientWidth+memberlist.previousSibling.clientWidth}px`){
      memberlist.style.width = `${memberlist.clientWidth+memberlist.previousSibling.clientWidth}px`
    }
  }

  const observer = new MutationObserver(() => {
    chunkyMembers();
  });

  function init() {
    chunkyMembers();
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