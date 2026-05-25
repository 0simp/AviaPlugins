(function () {
  if (window.__EDIT_EMOJIS__) return;
  window.__EDIT_EMOJIS__ = true;
  let capturedToken = null;

  const originalFetch = window.fetch.bind(window);
    window.fetch = async function (resource, config = {}) {
        try {
            const url = resource?.toString?.() || "";
            const options = config;
            const headers = options?.headers;
            if (headers) {
                if (typeof headers.get === "function") {
                const t = headers.get("X-Session-Token") || headers.get("x-session-token");
                if (t) capturedToken = t;
                } else {
                const t = headers["X-Session-Token"] || headers["x-session-token"];
                if (t) capturedToken = t;
                }
            }
        } catch (_) {}
        return originalFetch(resource,config);
    };

  async function editEmoji(id,name){
    if(!capturedToken){
        return 'no token';
    }

    let success = null;
    try {
        const res = await originalFetch(`https://stoat.chat/api/custom/emoji/${id}`,{
            method:"PATCH",
            headers:{
                "X-Session-Token":capturedToken
            },
            body:JSON.stringify({name:name})
        })

        success = res.ok

    } catch (error) {
        success = false
    }
    return success;
  }

  function editEmojis() {
    const image = document.getElementsByClassName('c_var(--md-sys-color-on-surface-variant) lh_1.25rem fs_0.875rem ls_0.015625rem fw_400').item(0)
    if(!image) return;
    const emojiid = image.firstChild.firstChild.firstChild.firstChild.firstChild.src.substring(image.firstChild.firstChild.firstChild.firstChild.firstChild.src.lastIndexOf('/')+1)

    const textfield = document.createElement('mdui-text-field')
    textfield.id='emojiname'
    textfield.variant='filled'
    textfield.type='text'
    textfield.name='New name'
    textfield.label='New name'
    textfield.maxlength=32

    textfield.oninput = function(){
        if(savebutton.disabled){
            savebutton.disabled=false
        }
    }

    const savebutton = document.createElement('button')
    savebutton.disabled=true
    savebutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 pos_relative px_16px flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'

    const mdripple = document.createElement('md-ripple')
    mdripple.ariaHidden=true
    savebutton.appendChild(mdripple)

    const text = document.createElement('text')
    text.textContent='Save'
    savebutton.appendChild(text)

    savebutton.onclick = async function(){
        const success = await editEmoji(emojiid,textfield.value)
        if(success==true){
            textfield.value=''
            savebutton.previousSibling.click()
        }else{
            let text = '';

            switch(success){
                case false:
                    text = 'Something went wrong while editing the emoji. Keep in mind emoji names must be between 1 and 32 characters and only contain alphanumeric characters'
                break;

                case 'no token':
                    text = 'No token captured yet. Trigger some requests then try again'
                break;
            }

            const textelement = document.createElement('text')
            textelement.textContent=text
            textelement.style.color='red'

            textfield.parentElement.insertBefore(textelement,textfield.nextSibling)

            setTimeout(() => {
                textelement.remove()
            }, 3000);
        }
    }

    if(!document.getElementById('emojiname')){
        image.parentElement.insertBefore(textfield,image.nextSibling)
        image.parentElement.lastChild.appendChild(savebutton)
    }
  }

  const observer = new MutationObserver(() => {
    editEmojis();
  });

  function init() {
    editEmojis();
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