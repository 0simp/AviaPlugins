(function () {
  if (window.__WEBHOOK_PROFILES__) return;
  window.__WEBHOOK_PROFILES__ = true;
  let dragging = false;
  let imgwidth = null;
  let imgheight = null;

  function createPopup(e,x,y){
    const pfp = e.offsetParent?.querySelector(`img[class='w_100% h_100% obj-f_cover']`)

    const empty = document.createElement('div')
    const opacity1 = document.createElement('div')
    opacity1.style='opacity: 1;'

    const style = document.createElement('div')
    style.style=`position: absolute; top: ${y}px; left: ${x}px; z-index: 99;`

    const parent = document.createElement('div')
    parent.className='will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high) bx-sh_0_0_3px_var(--md-sys-color-shadow) w_340px h_400px bdr_var(--borderRadius-xl)'

    const popup = document.createElement('div')
    popup.className='d_grid gap_var(--gap-md) p_var(--gap-md) grid-tc_repeat(2,_1fr)'

    const banner = document.createElement('div')
    banner.className='pos_relative us_none h_120px p_var(--gap-lg) d_flex flex-d_column jc_end bg-s_cover bg-p_center bdr_var(--borderRadius-xl) c_white cursor_pointer grid-c_1_/_3'
    banner.style='background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(&quot;undefined&quot;);'

    const mdripple = document.createElement('md-ripple')
    mdripple.ariaHidden=true

    const nameandpfparea = document.createElement('div')
    nameandpfparea.className='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-lg) ai_center jc_initial'

    const pfpsvg = document.createElement('svg')
    pfpsvg.className='flex-sh_0 us_none cursor_inherit'
    pfpsvg.style='width: 48px; height: 48px;'
    pfpsvg.setAttribute('viewBox','0 0 32 32')

    pfpsvg.addEventListener('click',()=>{
        imgwidth = pfp.width 
        imgheight = pfp.height
        createImageViewer(pfp.src)
    });

    const g = document.createElement('g')
    g.setAttribute('mask','url(#holepunch-bottom-right)')

    const foreignobject = document.createElement('foreignObject')
    foreignobject.className='trs_var(--transitions-fast)_filter'
    foreignobject.setAttribute('x',0)
    foreignobject.setAttribute('y',0)
    foreignobject.setAttribute('width',32)
    foreignobject.setAttribute('height',32)

    const pfpdiv = document.createElement('div')
    pfpdiv.className='ov_hidden w_100% h_100% bdr_var(--borderRadius-circle)'

    const pfpimg = document.createElement('img')
    pfpimg.className='w_100% h_100% obj-f_cover'
    pfpimg.draggable=false
    pfpimg.src = pfp.src

    const namediv = document.createElement('div')
    namediv.className='lh_1em fs_0.875rem ls_0.015625rem fw_400 d_flex gap_var(--gap-xs) flex-d_column'

    const namespan = document.createElement('span')
    namespan.className='hover:td_underline'

    const nametext = document.createElement('text')
    nametext.textContent=`${e.textContent}`

    empty.appendChild(opacity1)
    opacity1.appendChild(style)
    style.appendChild(parent)
    parent.appendChild(popup)
    popup.appendChild(banner)
    banner.appendChild(mdripple)
    banner.appendChild(nameandpfparea)
    nameandpfparea.appendChild(pfpsvg)
    pfpsvg.appendChild(g)
    pfpsvg.appendChild(foreignobject)
    foreignobject.appendChild(pfpdiv)
    pfpdiv.appendChild(pfpimg)
    nameandpfparea.appendChild(namediv)
    namediv.appendChild(namespan)
    namespan.appendChild(nametext)
                
    const floating = document.getElementById('floating')
    floating.insertBefore(empty,floating.firstChild)

    setTimeout(() => {
        document.addEventListener('click',()=>{
            empty.remove()
        })
    }, 100);
  }

  function createImageViewer(img){
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
    openbutton.href=img

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
    imgelement.src=img
    if(!img.endsWith('/original')&&img.includes('cdn.stoatusercontent.com/avatars')){
        imgelement.src = img+'/original'
    }

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

            if(x==0){
                x=1
            }

            if(y==0){
                y=1
            }

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

  function webhookProfiles(){
    const webhooknames = [...document.getElementsByClassName('lh_1.25rem fs_0.875rem ls_0.00625rem fw_500')].filter(e=>e.offsetParent?.querySelector(`div[aria-label='Webhook']`))
    webhooknames.forEach(e=>{
        if(!e.style?.getPropertyValue('cursor')){
            e.style.cursor='pointer'
            e.onclick = (event)=>{
                createPopup(e,event.x,event.y)
            }

            const pfp = e.offsetParent?.querySelector(`div[class='h_fit-content bdr_var(--borderRadius-circle)']`)
            pfp.style.cursor='pointer'
            pfp.onclick = (event)=>{
                createPopup(e,event.x,event.y)
            }
        }
    });
  }

  const observer = new MutationObserver(() => {
    webhookProfiles();
  });

  function init() {
    webhookProfiles();
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