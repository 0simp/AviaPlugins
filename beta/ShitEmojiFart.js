(function () {
  if (window.__EMOJI_SOUNDS__) return;
  window.__EMOJI_SOUNDS__ = true;
  const targetNode = document.documentElement;
    function callback(mutationsList, observer) {
        mutationsList.forEach((mutation) => {
            if (mutation.type === 'childList') {
                for (let node of mutation.addedNodes) {
                    if(node.className=='group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)'){
                        if(node.children[1].children[1].children[1].children[0].children[0].children[0].alt=='💩'){
                            const fart = new Audio('https://cdn.stoatusercontent.com/attachments/NKWP8j7tVyaIUsPTjpKxhMiI0rwFJndqwkpGJd77BA/original')
                            fart.play()
                        }
                    }
                }
            }
        });
    }
    const observer1 = new MutationObserver(callback);
    const config = { childList: true, subtree: true };
    observer1.observe(targetNode, config)
})();