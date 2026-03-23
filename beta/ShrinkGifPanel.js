(function () {

  if (window.__SHRINK_GIF_PANEL__) return;
  window.__SHRINK_GIF_PANEL__ = true;

  function shrinkGifPanel() {
    if(document.getElementsByClassName('w_400px h_400px').item(0)){
        if(document.getElementsByClassName('w_400px h_400px').item(0).children[0].className=='w_100% h_100% us_none d_flex flex-d_column gap_var(--gap-md) ai_stretch ov_hidden p_var(--gap-md)_0 bdr_var(--borderRadius-lg) c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bx-sh_0_0_3px_var(--md-sys-color-shadow) bg_var(--md-sys-color-surface-container)'){
            const gifPanel = document.getElementsByClassName('w_400px h_400px').item(0)
            gifPanel.style.setProperty('position','fixed')
            gifPanel.style.removeProperty('left')
            gifPanel.style.removeProperty('top')
            gifPanel.style.setProperty('right','0px')
            gifPanel.style.setProperty('bottom','12px')
            if(window.outerWidth<466){
                gifPanel.style.setProperty('width',`${window.outerWidth-66}px`)
                gifPanel.style.setProperty('height',`${window.outerWidth-66}px`)
                for(const child of gifPanel.children[0].children[1].children[1].children[1].children[0].children){
                    if(child.className=='d_flex ai_center px_var(--gap-md) w_calc(40px_*_10)!'){
                        const list = child.style.getPropertyValue('transform').substring(9).replaceAll('(','').replaceAll(')','').replaceAll('px','').split(', ')
                        if(list[0]!=0){
                            list[0]=0
                            child.style.setProperty('transform',`translate(${list.map(item=>`${item}px`).join(', ')})`)
                        }
                    }
                }
            }
            document.getElementsByClassName('min-h_0 d_flex flex-d_column').item(1).children[0].setAttribute('readonly',false)
        }
    }
  }

  shrinkGifPanel();

  const observer = new MutationObserver(() => shrinkGifPanel());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
