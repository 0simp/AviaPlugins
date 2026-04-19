(function () {
  if (window.__SLOWMODE__) return;
  window.__SLOWMODE__ = true;
  const slowmodes = {};

  const originalFetch = window.fetch.bind(window);

  window.fetch = async function (resource, config = {}) {
      try {
          const url = resource?.toString?.() || "";
          if (
              config.method === "PATCH" &&
              url.includes("/channels/") &&
              config.body &&
              typeof config.body === "string"
          ) {
              const slowmodebox = document.getElementById('slowmode')
              if(slowmodebox&&slowmodebox.value){
                  const number = Number(slowmodebox.value)
                  if(!isNaN(Number(number))&&number==Math.trunc(number)&&number>=0&&number<=21600){
                      const parsed = JSON.parse(config.body);
                      if (parsed) {
                          parsed.slowmode = number
                          config = { ...config, body: JSON.stringify(parsed) };
                      }
                  }
                }
            }else if(config.method=="GET"&&url.includes('/messages')){
              setTimeout(async () => {
                const channel = await originalFetch(`https://stoat.chat/api/channels/${document.baseURI.substring(document.baseURI.lastIndexOf('/')+1)}`,config)
                const json = await channel.json()
                if(json&&json.slowmode>0){
                  slowmodes[json._id] = json.slowmode
                  const chatbar = document.getElementsByClassName('flex-g_1 flex-sh_0 d_flex gap_var(--gap-md) m_0_0_var(--gap-md)_0 max-h_var(--layout-height-message-box)').item(0)
                  const main = document.querySelector('main')
                  const popup = document.createElement('div')
                  popup.id='slowmodepopup'
                  popup.className='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-md) ai_center jc_initial fs_0.8em us_none mbe_var(--gap-md) p_var(--gap-md)_var(--gap-lg) bdr_var(--borderRadius-lg) bg_var(--md-sys-color-primary-container) c_var(--md-sys-color-on-primary-container) [&_a:hover]:filter_brightness(1.2)'
                  popup.offsetHeight=37
                  popup.offsetLeft=16

                  const text = document.createElement('span')
                  text.className='flex-sh_0'
                  text.textContent=`ⓘ This channel has a ${json.slowmode} second slowmode`

                  const closebtn = document.createElement('a')
                  closebtn.className='d_grid place-items_center cursor_pointer'
                  closebtn.onclick = function(){
                    popup.remove()
                  }

                  const closebtnchild = document.createElement('span')
                  closebtnchild.ariaHidden=true
                  closebtnchild.className='material-symbols-outlined fs_inherit fw_undefined!'
                  closebtnchild.style.setProperty('display','block')
                  closebtnchild.style.setProperty('font-variation-settings','"FILL" 1, "wght" 400, "GRAD" 0')
                  closebtnchild.style.setProperty('font-size','16px')
                  closebtnchild.textContent='cancel'
                  closebtn.appendChild(closebtnchild)

                  popup.appendChild(text)
                  popup.appendChild(closebtn)

                  if(!document.getElementById('slowmodepopup')){
                    main.insertBefore(popup,chatbar)
                  }else{
                    const popup = document.getElementById('slowmodepopup')
                    const clone = popup.cloneNode(true)
                    clone.firstChild.textContent=`ⓘ This channel has a ${json.slowmode} second slowmode`
                    clone.children[1].onclick = function(){
                      clone.remove()
                    }
                    if(clone.firstChild.textContent!=popup.firstChild.textContent){
                      popup.parentElement.replaceChild(clone,popup)
                    }
                  }

                }else{
                  const slowmodepopup = document.getElementById('slowmodepopup')
                  if(slowmodepopup){
                    slowmodepopup.remove()
                  }
                }
              }, 100);
            }
        } catch (e) { console.log(e); }
          return originalFetch(resource, config)
    };

  function SlowMode() {
    const descriptionbox = document.querySelector('mdui-text-field[name=\'description\']')
    const webhookssvg = document.querySelector('path[d=\'M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888z\']')
    const deletesvg = document.querySelector('path[d=\'M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z\']')
    if(!descriptionbox) return;
    const container = document.createElement('div')
    container.className='d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial gap_var(--gap-md)'
    const span = document.createElement('span')
    span.className='lh_1rem fs_0.75rem ls_0.03125rem fw_500'
    span.textContent='Slowmode'
    container.appendChild(span)
    const select = document.createElement('mdui-select')
    select.id='slowmode'
    select.setAttribute('variant','filled')
    select.setAttribute('name','slowmode')
    select.setAttribute('placement','auto')

    const none = document.createElement('mdui-menu-item')
    none.innerText='None'
    none.setAttribute('value',0)

    const fiveseconds = document.createElement('mdui-menu-item')
    fiveseconds.innerText='5 seconds'
    fiveseconds.setAttribute('value',5)

    const tenseconds = document.createElement('mdui-menu-item')
    tenseconds.innerText='10 seconds'
    tenseconds.setAttribute('value',10)

    const fifteenseconds = document.createElement('mdui-menu-item')
    fifteenseconds.innerText='15 seconds'
    fifteenseconds.setAttribute('value',15)

    const thirtyseconds = document.createElement('mdui-menu-item')
    thirtyseconds.innerText='30 seconds'
    thirtyseconds.setAttribute('value',30)

    const oneminute = document.createElement('mdui-menu-item')
    oneminute.innerText='1 minute'
    oneminute.setAttribute('value',60)

    const twominutes = document.createElement('mdui-menu-item')
    twominutes.innerText='2 minutes'
    twominutes.setAttribute('value',120)

    const fiveminutes = document.createElement('mdui-menu-item')
    fiveminutes.innerText='5 minutes'
    fiveminutes.setAttribute('value',300)

    const tenminutes = document.createElement('mdui-menu-item')
    tenminutes.innerText='10 minutes'
    tenminutes.setAttribute('value',600)

    const fifteenminutes = document.createElement('mdui-menu-item')
    fifteenminutes.innerText='15 minutes'
    fifteenminutes.setAttribute('value',900)

    const thirtyminutes = document.createElement('mdui-menu-item')
    thirtyminutes.innerText='30 minutes'
    thirtyminutes.setAttribute('value',1800)

    const onehour = document.createElement('mdui-menu-item')
    onehour.innerText='1 hour'
    onehour.setAttribute('value',3600)

    const twohours = document.createElement('mdui-menu-item')
    twohours.innerText='2 hours'
    twohours.setAttribute('value',7200)

    const sixhours = document.createElement('mdui-menu-item')
    sixhours.innerText='6 hours'
    sixhours.setAttribute('value',21600)

    select.appendChild(none)
    select.appendChild(fiveseconds)
    select.appendChild(tenseconds)
    select.appendChild(fifteenseconds)
    select.appendChild(thirtyseconds)
    select.appendChild(oneminute)
    select.appendChild(twominutes)
    select.appendChild(fiveminutes)
    select.appendChild(tenminutes)
    select.appendChild(fifteenminutes)
    select.appendChild(thirtyminutes)
    select.appendChild(onehour)
    select.appendChild(twohours)
    select.appendChild(sixhours)
    container.appendChild(select)

    if(slowmodes[document.baseURI.substring(document.baseURI.lastIndexOf('/')+1)]){
      select.value=`${slowmodes[document.baseURI.substring(document.baseURI.lastIndexOf('/')+1)]}`
    }

    if(!document.getElementById('slowmode')&&webhookssvg&&deletesvg){
        descriptionbox.parentElement.insertBefore(container,descriptionbox.nextSibling)
    }
  }

  const observer = new MutationObserver(() => {
    SlowMode();
  });

  function init() {
    SlowMode();
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