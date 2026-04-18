(function () {
  if (window.__SLOWMODE__) return;
  window.__SLOWMODE__ = true;

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
              const slowmodebox = document.querySelector('mdui-text-field[name=\'slowmode\']')
              if(slowmodebox&&slowmodebox.value){
                  const number = Number(slowmodebox.value)
                  if(!isNaN(Number(number))&&number==Math.trunc(number)&&number>=0&&number<=21600){
                      const parsed = JSON.parse(config.body);
                      if (parsed) {
                          parsed.slowmode = number
                          config = { ...config, body: JSON.stringify(parsed) };
                          slowmodebox.value=''
                      }
                  }
                }
            }else if(config.method=="GET"&&url.includes('/messages')&&!document.getElementsByClassName('py_calc(var(--gap-md)_+_15px) px_var(--gap-md) lh_1.5rem fs_1rem ls_0.009375rem fw_550').item(0)){
              setTimeout(async () => {
                const channel = await originalFetch(`https://stoat.chat/api/channels/${document.baseURI.substring(document.baseURI.lastIndexOf('/')+1)}`,config)
                const json = await channel.json()
                if(json&&json.slowmode>0){
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
          return originalFetch(resource, config);
    };

  function SlowMode() {
    const descriptionbox = document.querySelector('mdui-text-field[name=\'description\']')
    if(!descriptionbox) return;
    const clone = descriptionbox.cloneNode(true)
    clone.setAttribute('label','Slowmode')
    clone.setAttribute('maxlength','5')
    clone.setAttribute('placeholder','0-21600')
    clone.setAttribute('name','slowmode')
    if(!document.querySelector('mdui-text-field[name=\'slowmode\']')&&document.querySelector('path[d=\'M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888z\']')){
        descriptionbox.parentElement.insertBefore(clone,descriptionbox.nextSibling)
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