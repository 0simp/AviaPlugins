(function () {
  if (window.__STOAT_IMAGE_FIX__) return;
  window.__STOAT_IMAGE_FIX__ = true;
  let imgwidth = null;
  let imgheight = null;
  let imgurl = null;
  let dragging = false;

  function StoatImageFix() {
    document.querySelectorAll(`a[title*='cdn.stoatusercontent.com']`).forEach(element=>{
        const parent = element.parentElement.parentElement.parentElement.parentElement

        if(!parent.querySelector(`div[class='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain']`)){
            const div = document.createElement('div')
            div.className='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain'

            const img = document.createElement('img')
            img.className='cursor_pointer'
            img.loading='lazy'
            img.src=parent.textContent

            img.onclick = function(){
              imgwidth = img.width
              imgheight = img.height
              imgurl = img.src
              const floating = document.getElementById('floating')
              
              const div = document.createElement('div')
              div.className='top_0 left_0 right_0 bottom_0 pos_fixed z_100 max-h_100% d_grid us_none place-items_center pointer-events_all anim-n_scrimFadeIn anim-dur_0.1s anim-fm_forwards trs_var(--transitions-medium)_all --background_rgba(0,_0,_0,_0.9)'

              div.onclick = function(e){
                if(e.target==div2){
                  div.remove()
                }
              }

              const div2 = document.createElement('div')
              div2.className='d_flex flex-d_column jc_space-between min-h_0 w_100% h_100% px_20px'
              div2.style='opacity: 1; --motion-scale: 1; transform: scale(var(--motion-scale)); overflow: hidden; user-select: none; touch-action: none;'

              const posrelative = document.createElement('div')
              posrelative.className='pos_relative'

              const barparent = document.createElement('div')
              barparent.className='w_100% pos_absolute h_120px flex-sh_0 d_flex ai_center jc_space-between'
              
              const empty = document.createElement('div')

              const bar = document.createElement('div')
              bar.className='z_999 d_flex gap_var(--gap-md) p_var(--gap-md) bdr_var(--borderRadius-lg) bg_var(--md-sys-color-surface) c_var(--md-sys-color-on-surface)'

              const zoomoutbutton = document.createElement('button')
              zoomoutbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'

              const zoomoutripple = document.createElement('md-ripple')
              zoomoutripple.ariaHidden=true

              const zoomouticon = document.createElement('span')
              zoomouticon.className='material-symbols-outlined fs_inherit fw_undefined!'
              zoomouticon.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
              zoomouticon.textContent='zoom_out'

              zoomoutbutton.onclick = function(){
                const transform = imgelement.style.transform
                let number = Number(transform.substring(transform.indexOf('(')+1,transform.indexOf(')')))
                if(!isNaN(number)){
                  number = number-0.1
                  imgelement.style.transform=`scale(${number}) translate(0px, 0px)`
                }
              }

              const zoominbutton = document.createElement('button')
              zoominbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'

              const zoominripple = document.createElement('md-ripple')
              zoominripple.ariaHidden=true

              const zoominicon = document.createElement('span')
              zoominicon.className='material-symbols-outlined fs_inherit fw_undefined!'
              zoominicon.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
              zoominicon.textContent='zoom_in'

              zoominbutton.onclick = function(){
                const transform = imgelement.style.transform
                let number = Number(transform.substring(transform.indexOf('(')+1,transform.indexOf(')')))
                if(!isNaN(number)){
                  number = number+0.1
                  imgelement.style.transform=`scale(${number}) translate(0px, 0px)`
                }
              }

              const openbutton = document.createElement('a')
              openbutton.target='_blank'
              openbutton.rel='noreferrer'
              openbutton.href=imgurl

              const openbuttonchild = document.createElement('button')
              openbuttonchild.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'

              const openbuttonripple = document.createElement('md-ripple')
              openbuttonripple.ariaHidden=true

              const openbuttonicon = document.createElement('span')
              openbuttonicon.className='material-symbols-outlined fs_inherit fw_undefined!'
              openbuttonicon.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
              openbuttonicon.textContent='open_in_new'

              const closebutton = document.createElement('button')
              closebutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'

              const closeripple = document.createElement('md-ripple')
              closeripple.ariaHidden=true

              const closeicon = document.createElement('span')
              closeicon.className='material-symbols-outlined fs_inherit fw_undefined!'
              closeicon.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;'
              closeicon.textContent='close'

              closebutton.onclick = function(){
                div.remove()
              }

              const imgelement = document.createElement('img')
              imgelement.className='min-h_0 as_center obj-f_contain bg_rgba(0,_0,_0,_0.6)'
              imgelement.style=`aspect-ratio: ${imgwidth} / ${imgheight}; cursor: move; user-select: none; touch-action: none; transform-origin: 50% 50%; transition: none; transform: scale(1) translate(0px,0px);`
              imgelement.src=imgurl

              imgelement.onmousedown = function(e){
                e.preventDefault()
                dragging = true
              }

              imgelement.onmouseup = function(e){
                e.preventDefault()
                dragging=false
              }

              imgelement.onmousemove = function(e){
                e.preventDefault()
                if(dragging){
                  const transform = imgelement.style.transform
                  const translate = transform.substring(transform.indexOf('translate('),transform.lastIndexOf(')')).replace('translate(','').split(',')
                  let x = Number(translate[0].replace('px',''))
                  let y = Number(translate[1].replace('px',''))
                  x = x+e.movementX
                  y = y+e.movementY

                  const oldtranslate = transform.substring(transform.indexOf('translate'),transform.lastIndexOf(')')+1)
                  const newtranslate = `translate(${x}px, ${y}px)`
                  imgelement.style.transform=imgelement.style.transform.replace(oldtranslate,newtranslate)
                }
              }

              div.appendChild(div2)
              div2.appendChild(posrelative)
              posrelative.appendChild(barparent)
              barparent.appendChild(empty)
              barparent.appendChild(bar)
              zoomoutbutton.appendChild(zoomoutripple)
              zoomoutbutton.appendChild(zoomouticon)
              zoominbutton.appendChild(zoominripple)
              zoominbutton.appendChild(zoominicon)
              openbutton.appendChild(openbuttonchild)
              openbuttonchild.appendChild(openbuttonripple)
              openbuttonchild.appendChild(openbuttonicon)
              closebutton.appendChild(closeripple)
              closebutton.appendChild(closeicon)
              bar.appendChild(zoomoutbutton)
              bar.appendChild(zoominbutton)
              bar.appendChild(openbutton)
              bar.appendChild(closebutton)
              div2.appendChild(imgelement)
              floating.lastChild.appendChild(div)
            }

            const image = new Image
            image.src=img.src
            image.onload = function(){
                if(this.width>420){
                    const ballsack = this.width/420
                    div.style.width=`420px`
                    div.style.height=`${this.height/ballsack}px`
                }else{
                    div.style.width=`${this.width}px`
                    div.style.height=`${this.height}px`
                }
                
                if(!parent.querySelector(`div[class='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain']`)){
                    div.appendChild(img)
                    parent.appendChild(div)
                }
            }
        }
    });
  }

  const observer = new MutationObserver(() => {
    StoatImageFix();
  });

  function init() {
    StoatImageFix();
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