/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/BetterStatuses.js
  @VERSION: 1.0
*/


(function () {
  if (window.__BETTER_STATUSES__) return;
  window.__BETTER_STATUSES__ = true;
  let validemojis = [];
  let invalidemojis = [];

  async function createImage(div,emoji){
    if(invalidemojis.includes(emoji)) return;
    const img = document.createElement('img')
    img.className=`obj-f_contain d_inline-block w_var(--emoji-size) h_var(--emoji-size) m_0_0.05em_0_0.1em va_-0.3em c_transparent [&:before]:content_'_' [&:before]:d_block [&:before]:pos_absolute [&:before]:h_50px [&:before]:w_50px [&:before]:bg-i_url(ishere.jpg) emoji`

    if(!validemojis.includes(emoji)){
        const res = await fetch(`https://cdn.stoatusercontent.com/emojis/${emoji}`)
        if(res.ok){
            validemojis.push(emoji)
            img.src=`https://cdn.stoatusercontent.com/emojis/${emoji}`
        }else{
            invalidemojis.push(emoji)
        }
    }else{
        img.src=`https://cdn.stoatusercontent.com/emojis/${emoji}`
    }

    if(img.src){
        div.appendChild(img)
    }
  }

  function createSpan(div,text){
    const span = document.createElement('span')
    span.className='ov-wrap_anywhere lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 us_text'
    span.textContent=text+' '
    div.appendChild(span)
  }

  function addReplyButton(statuscard){
    const username = statuscard.parentElement.firstChild.lastChild.lastChild.lastChild.textContent
    const statusheader = statuscard.firstChild
    const clone = statusheader.cloneNode(true)

    const newheader = document.createElement('div')

    const replybutton = document.createElement('button')
    replybutton.className='ov-wrap_anywhere lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px'
    replybutton.id='statusreplybutton'
    replybutton.style='position: absolute; top: 4px; right: 4px;'

    const mdripple = document.createElement('md-ripple')
    mdripple.ariaHidden=true

    const span = document.createElement('span')
    span.className='material-symbols-outlined'
    span.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0; font-size: 24px;'
    span.textContent='reply'

    replybutton.appendChild(mdripple)
    replybutton.appendChild(span)

    replybutton.onclick = function(){
      const overlay = document.createElement('div')
      overlay.className='top_0 left_0 right_0 bottom_0 pos_fixed z_998 max-h_100% d_grid us_none place-items_center pointer-events_all anim-n_scrimFadeIn anim-dur_0.1s anim-fm_forwards trs_var(--transitions-medium)_all p_80px phone:p_30px ov-y_auto --background_rgba(0,_0,_0,_0.6) dialog_scrim'
      overlay.style='--background: rgba(0, 0, 0, 0.6);'

      const overlay2 = document.createElement('div')
      overlay2.className='dialog'


      const replydialog = document.createElement('div')
      replydialog.style='padding: 24px; min-width: 300px; max-width: 460px; width: 100%; border-radius: 28px; display: flex; flex-direction: column; color: var(--md-sys-color-on-surface); background: var(--md-sys-color-surface-container-high); box-sizing: border-box; gap: var(--gap-md, 12px);'

      const span = document.createElement('span')
      span.style='line-height: 2rem; font-size: 1.5rem; letter-spacing: 0px; font-weight: 400; color: var(--md-sys-color-on-surface);'
      span.textContent=`Reply to ${username}'s status`

      const div = document.createElement('div')
      div.style='display: flex; flex-direction: column; gap: 4px;'

      const label = document.createElement('label')
      label.style='font-size: 0.75rem; letter-spacing: 0.025rem; color: var(--md-sys-color-on-surface-variant);'
      label.textContent='Message'

      const input = document.createElement('input')
      input.style='style="width: 100%; box-sizing: border-box; padding: 12px 16px; border-radius: 4px; border-top: none; border-right: none; border-bottom: 1px solid var(--md-sys-color-on-surface-variant); border-left: none; border-image: initial; outline: none; background: color-mix(in srgb, 8% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 1rem; font-family: inherit;"'
      input.placeholder='Enter a message...'

      input.addEventListener('keydown',(e)=>{
        if(e.key=='Enter'&&input.value){
          sendbutton.click()
        }
      });

      const buttonsparent = document.createElement('div')
      buttonsparent.style='gap: 8px; display: flex; justify-content: flex-end; margin-block-start: 8px;'

      const cancelbutton = document.createElement('button')
      cancelbutton.style='line-height: 1.25rem; font-size: 0.875rem; letter-spacing: 0.015625rem; font-weight: 400; position: relative; padding: 0px 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: inherit; cursor: pointer; border: none; transition: var(--transitions-medium, 200ms) all; color: var(--md-sys-color-primary); height: 40px; border-radius: var(--borderRadius-full, 9999px); background: none;'
      cancelbutton.textContent='Cancel'

      cancelbutton.onclick = function(){
        overlay.remove()
      }

      const sendbutton = document.createElement('button')
      sendbutton.style='line-height: 1.25rem; font-size: 0.875rem; letter-spacing: 0.015625rem; font-weight: 400; position: relative; padding: 0px 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: inherit; cursor: pointer; border: none; transition: var(--transitions-medium, 200ms) all; color: var(--md-sys-color-primary); height: 40px; border-radius: var(--borderRadius-full, 9999px); background: none;'
      sendbutton.textContent='Send'

      sendbutton.onclick = function(){
        const editor = document.querySelector(".cm-content[contenteditable='true']")
        if(editor&&input.value){
          let status = ''
          const regex = /[A-Z0-9]{26}/;
          for(const child of statuscard.lastChild.children){
            if(child.src)status = status+`:${regex.exec(child.src)[0]}:`
            else status = status+child.textContent??`:${regex.exec(child.src)[0]}:`
          }

          if(!status){
            status = statuscard.lastChild.textContent
          }
          
          const reply = `> *${username}'s status*\n> ${status}\n${input.value}`

          editor.lastChild.textContent=reply
          cancelbutton.click()
          setTimeout(() => {
            editor.parentElement.parentElement.parentElement.parentElement.nextSibling.click()
          }, 100);
          /*(const event = new KeyboardEvent('keydown',{
              key:'Enter'
          })
          for(let i =0; i<4; i++){ //this currently doesn't work in avia mobile due to ShiftNewLine blocking it
            editor.dispatchEvent(event)
          }*/
        }
      }

      buttonsparent.appendChild(cancelbutton)
      buttonsparent.appendChild(sendbutton)
      replydialog.appendChild(span)
      div.appendChild(label)
      div.appendChild(input)
      replydialog.appendChild(div)
      replydialog.appendChild(buttonsparent)
      overlay.appendChild(overlay2)
      overlay2.appendChild(replydialog)

      const floating = document.getElementById('floating')
      floating.lastChild.appendChild(overlay)
    }

    newheader.appendChild(clone)
    newheader.appendChild(replybutton)

    if(!document.getElementById('statusreplybutton')){
      statusheader.parentElement.replaceChild(newheader,statusheader)
    }
  }

  //ty ava for taking the time to make this
  function enforceStatusLabel() {
      const cards = document.querySelectorAll('[class*="asp_1"]');
      for (const card of cards) {

          if (!card.querySelector("span.us_text")) continue;
          const header = card.querySelector(":scope > span.fw_550");
          if (!header) continue;

          if (header.textContent === "Status") continue;


          if (!/[^\x00-\x7F]/.test(header.textContent)) continue;
          header.textContent = "Status";
      }
  }

  async function betterStatuses() {
      enforceStatusLabel()
      const userpopup = document.getElementsByClassName('will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high) bx-sh_0_0_3px_var(--md-sys-color-shadow) w_340px h_400px bdr_var(--borderRadius-xl)').item(0)
      const biguserpopup = document.getElementsByClassName('p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)').item(0)

      if(userpopup){
        const statuscard = [...userpopup.firstChild.children].find(e=>
            e.className=='pos_relative min-w_0 h_100% w_100% us_none c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-low) p_var(--gap-lg) bdr_var(--borderRadius-lg) d_flex gap_var(--gap-sm) flex-d_column ov_hidden asp_1/1'
            &&!e.querySelector(`div[class='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-md) ai_center jc_initial']`)
            &&[...e.querySelectorAll(`span`)].length==2
            &&!e.querySelector(`img[aria-label]`)
            &&e.firstChild.textContent=='Status'
        )
          
        if(!statuscard) return;
        const statuselement = statuscard.lastChild
        const status = statuselement.textContent

        const regex = /:[A-Z0-9]{26}:/;
        const div = document.createElement('div')
        statuselement.parentElement.appendChild(div)
        statuselement.remove()

        for(const word of status.split(' ')){
          if(regex.test(word)){
            const emoji = regex.exec(word)[0].replaceAll(':','')
            await createImage(div,emoji)
          }else{
            createSpan(div,word)
          }
        }

        addReplyButton(statuscard)
      }

      if(biguserpopup){
        enforceStatusLabel()
        const statuscard = [...biguserpopup.firstChild.firstChild.children].find(e=>
            e.className=='pos_relative min-w_0 h_100% w_100% us_none c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-low) p_var(--gap-lg) bdr_var(--borderRadius-lg) d_flex gap_var(--gap-sm) flex-d_column ov_hidden asp_1/1'
            &&!e.querySelector(`div[class='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-md) ai_center jc_initial']`)
            &&[...e.querySelectorAll(`span`)].length==2
            &&!e.querySelector(`img[aria-label]`)
            &&e.firstChild.textContent=='Status'
        )
        if(!statuscard) return;
        const statuselement = statuscard.lastChild
        const status = statuselement.textContent

        const regex = /:[A-Z0-9]{26}:/;
        const div = document.createElement('div')
        statuselement.parentElement.appendChild(div)
        statuselement.remove()

        for(const word of status.split(' ')){
          if(regex.test(word)){
            const emoji = regex.exec(word)[0].replaceAll(':','')
            await createImage(div,emoji)
          }else{
            createSpan(div,word)
          }
        }

        addReplyButton(statuscard)
      }
  }

  const observer = new MutationObserver(() => {
    betterStatuses();
  });

  function init() {
    betterStatuses();
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