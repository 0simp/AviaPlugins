(function () {
  if (window.__BETTER_IMAGE_VIEWER__) return;
  window.__BETTER_IMAGE_VIEWER__ = true;

  function betterImageViewer() {
    const bars = [...document.getElementsByClassName('z_999 d_flex gap_var(--gap-md) p_var(--gap-md) bdr_var(--borderRadius-lg) bg_var(--md-sys-color-surface) c_var(--md-sys-color-on-surface)')]
    const bar = bars.find(bar=>bar.firstChild?.tagName=='BUTTON')
    if(!bar) return;
    if(bar.offsetLeft+bar.clientWidth>window.innerWidth){
        bar.style.position='fixed'
        bar.style.top='130px'
    }

    const children = [...bar.children]
    const openbutton = children.find(child=>child.firstChild?.textContent=='open_in_new')
    if(!openbutton){
        const openbutton2 = document.createElement('a')
        openbutton2.target='_blank'
        openbutton2.rel='noreferrer'
        openbutton2.href=bar.parentElement.parentElement.parentElement.children[1].src

        if(openbutton2.href.includes('cdn.stoatusercontent.com')&&openbutton2.href.endsWith('/original')){
            openbutton2.href = openbutton2.href.replace('/original','')
        }

        const openbuttonchild = document.createElement('button')
        openbuttonchild.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'

        const openbuttonripple = document.createElement('md-ripple')
        openbuttonripple.ariaHidden=true

        const openbuttonicon = document.createElement('span')
        openbuttonicon.className='material-symbols-outlined fs_inherit fw_undefined!'
        openbuttonicon.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
        openbuttonicon.textContent='open_in_new'

        openbuttonchild.appendChild(openbuttonripple)
        openbuttonchild.appendChild(openbuttonicon)
        openbutton2.appendChild(openbuttonchild)

        bar.insertBefore(openbutton2,bar.children[2])
    }else if(openbutton.href.includes('cdn.stoatusercontent.com')&&openbutton.href.endsWith('/original')){
        openbutton.href = openbutton.href.replace('/original','')
    }
  }

  const observer = new MutationObserver(() => {
    betterImageViewer();
  });

  function init() {
    betterImageViewer();
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