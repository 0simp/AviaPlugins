(function () {
  if (window.__HIDE_IMAGE_LINKS__) return;
  window.__HIDE_IMAGE_LINKS__ = true;

  function hideImageLinks() {
    const messages = document.getElementsByClassName('group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)')
    const messages2 = document.getElementsByClassName('group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_0 [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)')

    for(const message of messages){
        const linkElement = message.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]
        const link = linkElement?.title
        const textElement = message.children[1]?.children[1]?.children[1]?.children[0]?.children[0]
        const text = textElement?.textContent
        const image = message.children[1]?.children[1]?.children[1]?.children[1]?.children[0]

        if((link==text)&&image?.tagName=='IMG'&&!linkElement.alt){
            linkElement.style.display='none'
        }
    }

    for(const message of messages2){
        const linkElement = message.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]
        const link = linkElement?.title
        const text = message.children[1]?.children[1]?.children[0]?.children[0]?.textContent
        const image = message.children[1]?.children[1]?.children[0]?.children[1]?.children[0]

        if((link==text)&&image?.tagName=='IMG'&&!linkElement.alt){
            linkElement.style.display='none'
        }
    }
  }

  const observer = new MutationObserver(() => {
    hideImageLinks();
  });

  function init() {
    hideImageLinks();
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