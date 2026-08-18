/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/BetterStatuses.js
  @VERSION: 1.1
*/

(function () {
  if (window.__BETTER_STATUSES__) return;
  window.__BETTER_STATUSES__ = true;
  let validemojis = [];
  let invalidemojis = [];

  async function createImage(div,emoji){
    if(invalidemojis.includes(emoji)) return;
    const img = document.createElement('img')
    Object.assign(img.style,{
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      height: 'var(--emoji-size)',
      width: 'var(--emoji-size)',
      verticalAlign: '-.3em',
      display: 'inline-block',
      color: 'rgb(0 0 0/0)',
      objectFit: 'contain',
      margin: '0 .05em 0 .1em'
    })

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
    const username = document.querySelector(`div[aria-label='Click to copy username']`).textContent
    const statusheader = statuscard.firstChild
    const clone = statusheader.cloneNode(true)

    const newheader = document.createElement('div')

    const replybutton = document.createElement('button')
    replybutton.id='statusreplybutton'
    replybutton.style='position: absolute; top: 4px; right: 4px; cursor: pointer;'

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
      Object.assign(overlay.style,{
        background: 'rgba(0, 0, 0, 0.6);',
        maxHeight: '100%',
        right: '0rem',
        left: '0rem',
        top: '0rem',
        bottom: '0rem',
        paddingBottom: '0px',
        zIndex: '998',
        position: 'fixed',
        animationDuration: '.1s',
        animationName: 'scrimFadeIn',
        animationFillMode: 'forwards',
        position: 'fixed',
        transition: 'var(--transitions-medium) all'
      })

      const dialogparent = document.createElement('div')
      Object.assign(dialogparent.style,{
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        pointerEvents: 'all',
        display: 'grid',
        webkitUserSelect: 'none',
        userSelect: 'none',
        placeItems: 'center',
        padding: '80px'
      })

      const dialog = document.createElement('div')
      dialog.className = 'dialog'
      dialog.style = 'opacity: 1; --motion-translateY: 0px; transform: translateY(var(--motion-translateY));'

      const replydialog = document.createElement('div')
      Object.assign(replydialog.style,{
        maxWidth: '560px',
        minWidth: '280px',
        color: 'var(--md-sys-color-on-surface)',
        flexDirection: 'column',
        display: 'flex',
        borderRadius: '28px',
        padding: '24px',
        background: 'var(--md-sys-color-surface-container-high)'
      })

      const span = document.createElement('span')
      Object.assign(span.style,{
        fontSize: '1.5rem',
        lineHeight: '2rem',
        letterSpacing: '0px',
        fontWeight: '400',
        marginBlockEnd: '16px'
      })
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
      overlay.appendChild(dialogparent)
      dialogparent.appendChild(replydialog)

      const floating = document.getElementById('floating')
      floating.lastChild.appendChild(overlay)
    }

    newheader.appendChild(clone)
    newheader.appendChild(replybutton)

    if(!document.getElementById('statusreplybutton')){
      statusheader.parentElement.replaceChild(newheader,statusheader)
    }
  }

  async function betterStatuses() {
      const copyusername = document.querySelector(`div[aria-label='Click to copy username']`)
      if(!copyusername) return;
      const userpopup = copyusername.offsetParent.offsetParent
      const joinedcard = [...userpopup.querySelectorAll(`div`)].find(e=>e.children[1]?.firstChild?.textContent=='Stoat')
      if(joinedcard&&(!joinedcard.previousSibling?.querySelector('div')||joinedcard.previousSibling?.querySelector(`[aria-label]`))&&!joinedcard.previousSibling?.querySelector('button')){
        let statuscard = joinedcard.previousSibling
        if(statuscard.querySelector(`[aria-label]`)) statuscard = statuscard.previousSibling
        if(!statuscard||statuscard.querySelector('md-ripple')) return;
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