/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/EditEmojis.js
  @VERSION: 1.0
*/

(function () {
  if (window.__EDIT_EMOJIS__) return;
  window.__EDIT_EMOJIS__ = true;
  let capturedToken = null;
  let response = {};
  let updatedemojis = [];

  function openDB() {
    return new Promise((resolve, reject) => {
        const r = indexedDB.open("localforage");
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
    });
  }

  async function getToken(){
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const r = db.transaction("keyvaluepairs", "readonly")
            .objectStore("keyvaluepairs").get("auth");
            r.onsuccess = () => resolve(r.result?.session?.token || null);
            r.onerror = () => reject(r.error);
        });
    } catch { return null; }
  }

  async function editEmoji(id,name){
    if(!capturedToken){
        return 'no token';
    }

    let success = null;
    try {
        const res = await fetch(`https://stoat.chat/api/custom/emoji/${id}`,{
            method:"PATCH",
            headers:{
                "X-Session-Token":capturedToken
            },
            body:JSON.stringify({name:name})
        })

        success = res.ok

        if(success){
            response = await res.json()
            const existing = updatedemojis.find(e=>e._id==response._id)
            if(existing){
                updatedemojis.splice(updatedemojis.indexOf(existing),1)
            }
            updatedemojis.push(response)
        }

    } catch (error) {
        console.log(error)
        success = false
    }
    return success;
  }

  function updateAutoComplete(){
    const emojiautocomplete = document.querySelector(`div[class*='cm-tooltip-autocomplete autocomplete-tooltip autocomplete-tooltip-emoji']`)
    if(emojiautocomplete){
        for(const emoji of emojiautocomplete.firstChild.children){
            const regex = /[A-Z0-9]{26}/;
            if(regex.test(emoji.firstChild.src)&&updatedemojis.find(e=>e._id==regex.exec(emoji.firstChild.src)[0])&&emoji.lastChild.textContent!=`:${updatedemojis.find(e=>e._id==regex.exec(emoji.firstChild.src)[0]).name}:`){
                emoji.lastChild.textContent=`:${updatedemojis.find(e=>e._id==regex.exec(emoji.firstChild.src)[0]).name}:`
            }
        }
    }
  }

  function updateEmojiList(){
    const emojis = document.querySelectorAll(`a:has(img[src*='cdn.stoatusercontent.com/emojis'])`)
    emojis.forEach(emoji=>{
        const img = emoji.querySelector(`img`)
        const regex = /[A-Z0-9]{26}/;
        if(regex.test(img.src)&&updatedemojis.find(e=>e._id==regex.exec(img.src)[0])){
            const id = regex.exec(img.src)[0]
            if(emoji.lastChild.firstChild.firstChild.firstChild.innerHTML!=`:${updatedemojis.find(e=>e._id==id).name}<!---->:`){
                emoji.lastChild.firstChild.firstChild.firstChild.innerHTML= `:${updatedemojis.find(e=>e._id==id).name}<!---->:`
            }
        }
    });
  }

  async function editEmojis() {
    capturedToken = await getToken()
    const emojidialog = document.querySelector(`div[class='dialog']:has(img[src*='stoatusercontent.com/emojis'])`)
    if(!emojidialog) return;

    const image = emojidialog.querySelector(`img[src*='stoatusercontent.com/emojis']`)
    const emojiid = image.src.substring(image.src.lastIndexOf('/')+1)

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

    const closebutton = emojidialog.firstChild.lastChild.lastChild

    const savebutton = closebutton.cloneNode(true)
    savebutton.disabled=true
    savebutton.lastChild.textContent='Save'

    savebutton.onclick = async function(){
        const success = await editEmoji(emojiid,textfield.value)
        if(success==true){
            textfield.value=''
            savebutton.previousSibling.click()
            const emoji = document.querySelector(`a:has(img[src*='${response._id}'])`)
            if(emoji){
                emoji.lastChild.firstChild.firstChild.firstChild.innerHTML = `:${response.name}<!---->:`
            }
            response = {}
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
        emojidialog.firstChild.insertBefore(textfield,emojidialog.firstChild.lastChild)
        emojidialog.firstChild.lastChild.appendChild(savebutton)
    }
  }

  const observer = new MutationObserver(() => {
    editEmojis();
    updateAutoComplete();
    updateEmojiList();
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