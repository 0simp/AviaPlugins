(function () {
  if (window.__STOAT_IMAGE_FIX__) return;
  window.__STOAT_IMAGE_FIX__ = true;
  let imgwidth = null;
  let imgheight = null;
  let imgurl = null;
  let dragging = false;
  let elements = [];

  //I got this off stackoverflow lmao
  function getVideoDimensionsOf(url){
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.loading='lazy'

        video.addEventListener( "loadedmetadata", function () {
            const height = this.videoHeight;
            const width = this.videoWidth;

            resolve({height, width});
        }, false);

        video.src = url;
    });
  }

  function removeDuplicates(){
    document.querySelectorAll(`a[title*='cdn.stoatusercontent.com']`).forEach(element=>{
      const parent = element.parentElement.parentElement.parentElement.parentElement
      const proxyurl = element.textContent.replaceAll(':','%3A').replaceAll('/','%2F')
      
      if(parent.querySelector(`img[src*='proxy.stoatusercontent.com/proxy?url=${proxyurl}']`)?.src){
        parent.querySelectorAll(`img[src*='proxy.stoatusercontent.com/proxy?url=${proxyurl}']`).forEach(dupe=>{
          dupe.parentElement.remove()
        })
      }
    })
  }

  function StoatImageFix() {
    document.querySelectorAll(`a[title*='cdn.stoatusercontent.com']`).forEach(element=>{
        const parent = element.parentElement.parentElement.parentElement.parentElement

        if(!parent.querySelector(`div[class='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain'][data-src='${element.textContent}']`)&&element.getBoundingClientRect().y>0){
            const div = document.createElement('div')
            div.className='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain'
            div.dataset.src=element.textContent

            if(!elements.includes(element)){
              const xhr = new XMLHttpRequest()
              xhr.open('HEAD',`${element.textContent}`,true)
              xhr.onload = async function(){
                const contentType = xhr.getResponseHeader('Content-Type');
                if(contentType.includes('image')){
                  const img = document.createElement('img')
                  img.className='cursor_pointer'
                  img.loading='lazy'
                  img.src=element.textContent

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
                        const oldscale = transform.substring(0,transform.indexOf(')')+1)
                        const newscale = `scale(${number})`
                        imgelement.style.transform=imgelement.style.transform.replace(oldscale,newscale)
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
                        const oldscale = transform.substring(0,transform.indexOf(')')+1)
                        const newscale = `scale(${number})`
                        imgelement.style.transform=imgelement.style.transform.replace(oldscale,newscale)
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
                    imgelement.style=`aspect-ratio: ${imgwidth} / ${imgheight}; cursor: move; user-select: none; touch-action: none; transform-origin: 50% 50%; transition: none; transform: scale(1) translate(0px,1px);`
                    imgelement.src=imgurl

                    imgelement.onmousedown = function(e){
                      e.preventDefault()
                      dragging = true
                    }

                    imgelement.onmouseup = function(e){
                      e.preventDefault()
                      dragging=false
                    }

                    imgelement.onmouseleave = function(e){
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

                    imgelement.ontouchstart = function(e){
                      e.preventDefault()
                      dragging=true
                    }

                    imgelement.ontouchend = function(e){
                      e.preventDefault()
                      dragging=false
                      previousx = null
                      previousy = null
                    }

                    let previousx = null
                    let previousy = null;

                    imgelement.ontouchmove = function(e){
                      e.preventDefault()
                      if(dragging){
                        const touch = e.touches[0]
                        const currentx = touch.clientX;
                        const currenty = touch.clientY;

                        if(!previousx){
                          previousx = currentx
                          previousy = currenty;
                        }

                        const movementx = currentx - previousx;
                        const movementy = currenty - previousy;

                        const transform = imgelement.style.transform
                        const translate = transform.substring(transform.indexOf('translate('),transform.lastIndexOf(')')).replace('translate(','').split(',')
                        let x = Number(translate[0].replace('px',''))
                        let y = Number(translate[1].replace('px',''))
                        x = x+movementx
                        y = y+movementy

                        const oldtranslate = transform.substring(transform.indexOf('translate'),transform.lastIndexOf(')')+1)
                        const newtranslate = `translate(${x}px, ${y}px)`
                        imgelement.style.transform=imgelement.style.transform.replace(oldtranslate,newtranslate)

                        previousx = currentx
                        previousy = currenty
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
                      
                      if(!parent.querySelector(`div[class='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain'][data-src='${element.textContent}']`)){
                          div.appendChild(img)
                          parent.appendChild(div)

                          if(div.clientWidth!=Number(div.style.width.replace('px',''))){
                            const fart = div.style.width.replace('px','')/div.clientWidth
                            div.style.height=`${Number(div.style.height.replace('px',''))/fart}px`
                          }
                      }
                  }
                }else if(contentType.includes('video')){
                  const video = document.createElement('video')
                  video.src=element.textContent
                  video.preload='metadata'
                  video.controls=true
                  video.loading='lazy'
                  const dims = await getVideoDimensionsOf(video.src)
                  if(dims.width>420){
                    const ballsack = dims.width/420
                    div.style.width=`420px`
                    div.style.height=`${dims.height/ballsack}px`
                  }else{
                    div.style.width=`${dims.width}px`
                    div.style.height=`${dims.height}px`
                  }

                  if(!parent.querySelector(`div[class='d_grid h_auto max-w_100% ov_hidden bdr_var(--borderRadius-md) grid-tc_1fr grid-tr_1fr [&_>_*]:grid-area_1_/_1_/_2_/_2 [&_>_*]:w_100% [&_>_*]:h_100% [&_>_*]:min-h_0 [&_>_*]:obj-f_contain'][data-src='${element.textContent}']`)){
                    div.appendChild(video)
                    parent.appendChild(div)

                    if(div.clientWidth!=Number(div.style.width.replace('px',''))){
                      const fart = div.style.width.replace('px','')/div.clientWidth
                      div.style.height=`${Number(div.style.height.replace('px',''))/fart}px`
                    }
                  }
                }
              }
              xhr.send()
              elements.push(element)
            }
        }
    });
  }

  const observer = new MutationObserver(() => {
    StoatImageFix();
    removeDuplicates();
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