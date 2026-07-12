(function () {
  if (window.__HIDE_IMAGE_LINKS__) return;
  window.__HIDE_IMAGE_LINKS__ = true;

  function hideImageLinks() {
    const messages = document.getElementsByClassName('group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)')
    const messages2 = document.getElementsByClassName('group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_0 [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)')
    const replies = document.getElementsByClassName('group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)')

    for(const message of messages){
        const linkElement = message.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]
        const link = linkElement?.title
        const textElement = message.children[1]?.children[1]?.children[1]?.children[0]?.children[0]
        const text = textElement?.textContent
        const image = message.children[1]?.children[1]?.querySelector(`img[class=cursor_pointer]`)
        const video = message.querySelector(`video[class*='cursor']`)
        const embed = message.children[1]?.children[1]?.querySelector(`div[class='d_flex flex-d_column flex-g_1 m_0 ai_initial jc_initial min-w_0 gap_var(--gap-md)']`)

        if((linkElement&&link==text)&&(image?.tagName=='IMG'&&!linkElement.alt||video&&!linkElement.alt)){
            if(!embed||(embed&&![...embed.querySelectorAll(`img[class='cursor_pointer']`)].filter(img=>img.src==image?.src))){
              linkElement.style.display='none'
            }
        }
    }

    for(const message of messages2){
        const linkElement = message.querySelector(`a[title][class='cursor_pointer c_var(--md-sys-color-primary)!']`)
        const link = linkElement?.title
        const textElement = message.querySelector(`[class='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-md) ai_initial jc_initial']`).children[1].firstChild.querySelector(`div[class='wb_break-word [&_.math]:ov-x_auto [&_.math]:ov-y_hidden [&_.math]:max-h_100vh']`)
        const text = textElement?.textContent
        const image = message.querySelector(`img[class=cursor_pointer]`)
        const video = message.querySelector(`video[class*='cursor']`)
        const embed = message.children[1]?.children[1]?.querySelector(`div[class='d_flex flex-d_column flex-g_1 m_0 ai_initial jc_initial min-w_0 gap_var(--gap-md)']`)

        if((linkElement&&link==text)&&(image?.tagName=='IMG'&&!linkElement.alt||video&&!linkElement.alt)){
            if(!embed||(embed&&![...embed.querySelectorAll(`img[class='cursor_pointer']`)].filter(img=>img.src==image?.src))){
              linkElement.style.display='none'
            }
        }
    }

    for(const reply of replies){
      const linkElement = reply.querySelector(`a[title][class='cursor_pointer c_var(--md-sys-color-primary)!']`)
      const link = linkElement?.title
      const textElement = reply.querySelector(`p[class='[&>code]:flex-sh_0 [&>code]:p_1px_4px [&>code]:bdr_var(--borderRadius-md) [&>code]:c_#c9d1d9 [&>code]:bg_#0d1117']`)
      const text = textElement?.textContent
      const image = reply.querySelector(`img[class='cursor_pointer']`)
      const video = reply.querySelector(`video[class*='cursor']`)
      const embed = reply.querySelector(`div[class='d_flex flex-d_column flex-g_1 m_0 ai_initial jc_initial min-w_0 gap_var(--gap-md)']`)

      if((linkElement&&link==text)&&(image?.tagName=='IMG'&&!linkElement.alt||video&&!linkElement.alt)){
          if(!embed||(embed&&![...embed.querySelectorAll(`img[class='cursor_pointer']`)].filter(img=>img.src==image?.src))){
            linkElement.style.display='none'
          }
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