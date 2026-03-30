(function () {
  if (window.__3_TAP_REPLY__) return;
  window.__3_TAP_REPLY__ = true;

  function threeTapReply() {
    const messages = document.querySelectorAll('div[class=\'group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)\']')
    const messages2 = document.querySelectorAll('div[class=\'group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_0 [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)\']')
    messages.forEach(message=>{
        let clicks = 0
        message.addEventListener('click',()=>{
            clicks = clicks+1
            if(clicks==3){
                message.children[0].children[0].click()
                clicks = 0
            }
            setTimeout(() => {
                clicks=0
            }, 1000);
        });
    });

    messages2.forEach(message=>{
        let clicks = 0
        message.addEventListener('click',()=>{
            clicks = clicks+1
            if(clicks==3){
                message.children[0].children[0].click()
                clicks = 0
            }
            setTimeout(() => {
                clicks=0
            }, 1000);
        });
    });
  }

  const observer = new MutationObserver(() => {
      threeTapReply();
  });

  function init() {
    threeTapReply();
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