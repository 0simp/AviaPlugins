(function () {
  if (window.__COPY_ATTACHMENT_LINK__) return;
  window.__COPY_ATTACHMENT_LINK__ = true;

  function addContextMenuButtons(e){
    setTimeout(()=>{
      const contextmenu = document.getElementsByClassName('d_flex flex-d_column p_var(--gap-md)_0 ov_hidden bdr_var(--borderRadius-xs) bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bx-sh_0_0_3px_var(--md-sys-color-shadow) us_none').item(0)
      if(!contextmenu) return;
      const divider = document.createElement('div')
      divider.className='h_1px m_var(--gap-sm)_0 bg_var(--md-sys-color-outline-variant)'

      const savefile = document.createElement('a')
      savefile.target='_blank'
      if(e.target.tagName=='PRE'){
        savefile.href=e.target.parentElement.parentElement.firstChild.children[2].href
      }else{
        savefile.href=e.target.parentElement.parentElement.parentElement.firstChild.children[2].href
      }

      if(savefile.href.includes('/channel')){
        savefile.href=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.children[2].href
      }

      const savefilebutton = document.createElement('a')
      savefilebutton.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer tt_capitalize'

      const savefilesvg = document.createElement('svg')
      savefilesvg.setAttribute('xmlns','http://www.w3.org/2000/svg')
      savefilesvg.setAttribute('width','16')
      savefilesvg.setAttribute('height','16')
      savefilesvg.setAttribute('viewBox','0 0 24 24')

      const savefiletext = document.createElement('span')
      savefiletext.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
      savefiletext.textContent='Save File'

      savefilebutton.appendChild(savefilesvg)
      savefilesvg.outerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7zm-8 2V5h2v6h1.17L12 13.17 9.83 11zm-6 7h14v2H5z"></path></svg>`
      savefilebutton.appendChild(savefiletext)
      savefile.appendChild(savefilebutton)

      const copylinkbutton = document.createElement('a')
      copylinkbutton.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer tt_capitalize'

      const svg = document.createElement('svg')
      svg.setAttribute('xmlns','http://www.w3.org/2000/svg')
      svg.setAttribute('width','16')
      svg.setAttribute('height','16')
      svg.setAttribute('viewBox','0 0 24 24')

      const copylinktext = document.createElement('span')
      copylinktext.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
      copylinktext.textContent='Copy Link'

      copylinkbutton.appendChild(svg)
      svg.outerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5m-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4zm-3-4h8v2H8z"></path></svg>`
      copylinkbutton.appendChild(copylinktext)

      copylinkbutton.onclick = function(){
        navigator.clipboard.writeText(savefile.href)
      }

      const openfilebutton = document.createElement('a')
      openfilebutton.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer tt_capitalize'

      const openfilesvg = document.createElement('svg')
      openfilesvg.setAttribute('xmlns','http://www.w3.org/2000/svg')
      openfilesvg.setAttribute('width','16')
      openfilesvg.setAttribute('height','16')
      openfilesvg.setAttribute('viewBox','0 0 24 24')

      const openfiletext = document.createElement('span')
      openfiletext.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
      openfiletext.textContent='Open file'

      openfilebutton.appendChild(openfilesvg)
      openfilesvg.outerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"></path></svg>`
      openfilebutton.appendChild(openfiletext)

      openfilebutton.onclick = function(){
        window.open(savefile.href)
      }

      contextmenu.insertBefore(divider,contextmenu.firstChild)
      contextmenu.insertBefore(savefile,contextmenu.firstChild)
      contextmenu.insertBefore(copylinkbutton,contextmenu.firstChild)
      contextmenu.insertBefore(openfilebutton,contextmenu.firstChild)
    }
    ,100)
  }

  function apply() {
    const elements = document.querySelectorAll('div[class="d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial p_var(--gap-md) bdr_var(--borderRadius-md) c_var(--md-sys-color-inverse-on-surface) bg_var(--md-sys-color-inverse-surface) gap_var(--gap-md)"]')
    elements.forEach(element=>{
        const copyLinkButton = document.createElement('button')
        copyLinkButton.setAttribute('class','lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px')
        copyLinkButton.innerHTML = `
            <md-ripple aria-hidden="true"></md-ripple>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"></path></svg>
                </span>
            `;
        copyLinkButton.ariaLabel='Copy attachment link'
        copyLinkButton.addEventListener('click',()=>{
            const toast = document.createElement('div')
            toast.textContent='Copied!'
            Object.assign(toast.style, {
                position: "absolute",
                bottom: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.85)",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "11px",
                opacity: "0",
                transition: "opacity 0.2s",
                pointerEvents: "none"
            });
            copyLinkButton.appendChild(toast);
            requestAnimationFrame(() => toast.style.opacity = "1");
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 200);
            }, 2000);

            navigator.clipboard.writeText(element.firstChild.childNodes.item(2).href)
        });

        if(!element.firstChild.querySelector(`button[aria-label='Copy attachment link']`)){
          element.firstChild.appendChild(copyLinkButton)
        }
    });

    const pres = document.querySelectorAll(`pre[class='d_flex ov_auto scr-bar-w_thin flex-d_column']`)
    pres.forEach(pre=>{
      if(!pre.dataset.copyattachmentlinklistener){
        pre.addEventListener('contextmenu',(e)=>{
          addContextMenuButtons(e)
        });
        pre.dataset.copyattachmentlinklistener=true
      }
    });
  }

  const observer = new MutationObserver(() => {
    apply();
  });

  function init() {
    apply();
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