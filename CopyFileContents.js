(function () {
  if (window.__COPY_FILE_CONTENTS__) return;
  window.__COPY_FILE_CONTENTS__ = true;

  function addContextMenuButton(e){
    setTimeout(() => {
      const contextmenu = document.getElementsByClassName('d_flex flex-d_column p_var(--gap-md)_0 ov_hidden bdr_var(--borderRadius-xs) bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bx-sh_0_0_3px_var(--md-sys-color-shadow) us_none').item(0)
      if(!contextmenu) return;

      const copyfilecontent = document.createElement('a')
      copyfilecontent.className='d_flex gap_var(--gap-md) ai_center p_var(--gap-md)_var(--gap-lg) [&:hover]:bg_color-mix(in_srgb,_var(--md-sys-color-on-surface)_8%,_transparent) [&_span]:flex-g_1 [&_span]:mt_1px cursor_pointer tt_capitalize'

      const mdripple = document.createElement('md-ripple')
      mdripple.ariaHidden=true

      const icon = document.createElement('span')
      icon.className='material-symbols-outlined fs_inherit fw_undefined!'
      icon.style='display: block; font-size:16px; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
      icon.textContent='content_copy'

      const text = document.createElement('span')
      text.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'
      text.textContent='Copy file content'

      copyfilecontent.onclick = function(){
        let attachment;
        let href;
         if(e.target.tagName=='CODE'){
          attachment = e.target.parentElement.parentElement.parentElement
          href=attachment.firstChild.children[2].href
        }else{
          attachment = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
          href=attachment.firstChild.children[2].href
        }

        if(href.includes('/channel')){
          attachment = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
        }

        navigator.clipboard.writeText(attachment.children[1].textContent).catch(e=>{

        });
      }

      copyfilecontent.appendChild(mdripple)
      copyfilecontent.appendChild(icon)
      copyfilecontent.appendChild(text)

      const savefilesvg = contextmenu.querySelector(`path[d='M19 9h-4V3H9v6H5l7 7zm-8 2V5h2v6h1.17L12 13.17 9.83 11zm-6 7h14v2H5z']`)
      if(!savefilesvg){
        const divider = document.createElement('div')
        divider.className='h_1px m_var(--gap-sm)_0 bg_var(--md-sys-color-outline-variant)'

        contextmenu.insertBefore(divider,contextmenu.firstChild)
        contextmenu.insertBefore(copyfilecontent,contextmenu.firstChild)
      }else{
        contextmenu.insertBefore(copyfilecontent,contextmenu.children[2])
      }
    }, 100);
  }

  function copyFileContents() {
    const elements = [... document.querySelectorAll('div[class="d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial p_var(--gap-md) bdr_var(--borderRadius-md) c_var(--md-sys-color-inverse-on-surface) bg_var(--md-sys-color-inverse-surface) gap_var(--gap-md)"]')]
    .filter(e=>!e.querySelector(`path[d='M20 12v-1.707c0-4.442-3.479-8.161-7.755-8.29-2.204-.051-4.251.736-5.816 2.256A7.933 7.933 0 0 0 4 10v2c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h2V10a5.95 5.95 0 0 1 1.821-4.306 5.977 5.977 0 0 1 4.363-1.691C15.392 4.099 18 6.921 18 10.293V20h2c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2z']`))
    elements.forEach(element=>{
        const copyfilecontent = document.createElement('button')
        copyfilecontent.className='ov-wrap_anywhere lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'

        const mdripple = document.createElement('md-ripple')
        mdripple.ariaHidden=true

        const span = document.createElement('span')
        span.className='material-symbols-outlined fs_inherit fw_undefined!'
        span.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
        span.textContent='content_copy'

        copyfilecontent.appendChild(mdripple)
        copyfilecontent.appendChild(span)

        copyfilecontent.onclick = function(e){
            const toast = document.createElement('div')
            toast.textContent='Copied!'
            Object.assign(toast.style, {
                position: "absolute",
                bottom: "6px",
                left: "50%",
                width:"100px",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.85)",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "11px",
                opacity: "0",
                transition: "opacity 0.2s",
                pointerEvents: "none"
            });

            const textContent = element.children[1].textContent
            navigator.clipboard.writeText(textContent).catch(e=>{
                toast.textContent='Error'
            })

            copyfilecontent.appendChild(toast);
            requestAnimationFrame(() => toast.style.opacity = "1");
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 200);
            }, 2000);
        }

        if(!element.dataset.copyfilecontent){
            element.firstChild.appendChild(copyfilecontent)
            element.dataset.copyfilecontent=true
        }
    });

    const pres = document.querySelectorAll(`pre[class='d_flex ov_auto scr-bar-w_thin flex-d_column']`)
    pres.forEach(pre=>{
      if(!pre.dataset.copyfilecontentslistener){
        pre.addEventListener('contextmenu',(e)=>{
          addContextMenuButton(e)
        });
        pre.dataset.copyfilecontentslistener=true
      }
    });
  }

  const observer = new MutationObserver(() => {
    copyFileContents();
  });

  function init() {
    copyFileContents();
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