(function () {
  if (window.__DELETE_MESSAGES_ON_BAN__) return;
  window.__DELETE_MESSAGES_ON_BAN__ = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function (resource, config = {}) {
    try {
      if(resource.includes('/bans')&&config.method=='PUT'&&config.body &&typeof config.body === "string"){
        const parsed = JSON.parse(config.body);
        if(parsed){
          const clickedButton = document.querySelector(`button[clicked]`)
          if(clickedButton){
              parsed.delete_message_seconds = Number(clickedButton.value)
              config = { ...config, body: JSON.stringify(parsed) };
          }else{
            const custom = document.getElementById('custombanduration')
            if(custom.value&&!isNaN(Number(custom.value))&&Number(custom.value)>=0&&Number(custom.value)<=604800&&!custom.value.includes('.')){
              parsed.delete_message_seconds = Number(custom.value)
              config = { ...config, body: JSON.stringify(parsed) };
            }
          }
        }
      }
    } catch (_) {}
    return originalFetch(resource,config);
  };

  function deleteMessagesOnBan() {
    const banpopup = [...document.getElementsByClassName('p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)')].find(e=>e.querySelector(`mdui-text-field[name='reason']`))
    if(banpopup){
        const div = document.createElement('div')
        div.style='display: flex; flex-direction: column; gap: 8px;'
        div.id='boobs'
        const div2 = document.createElement('div')
        div2.style='display: flex; gap: 6px; align-items: center;'
        const span = document.createElement('span')
        span.style='font-size: 0.75rem; letter-spacing: 0.025rem; color: var(--md-sys-color-on-surface-variant); margin-right: 4px;'
        span.textContent='Delete message history'
        div2.appendChild(span)
        div.appendChild(div2)

        const div3 = document.createElement('div')
        div3.style='display: flex; flex-wrap: wrap; gap: 6px;'

        const button1hour = document.createElement('button')
        button1hour.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
        button1hour.textContent='Previous hour'
        button1hour.setAttribute('value',3600)
        button1hour.onclick = function(e){
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if(!button1hour.getAttribute('clicked')){
                [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button1hour).forEach(button=>{
                  button.removeAttribute('clicked')
                  button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                })
                button1hour.setAttribute('clicked',true)
                button1hour.style.background='black'
                document.getElementById('custombanduration').disabled=true
                document.getElementById('custombanduration').value=''
            }else{
                button1hour.removeAttribute('clicked')
                button1hour.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                document.getElementById('custombanduration').disabled=false
            }
        }

        const button6hours = document.createElement('button')
        button6hours.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
        button6hours.textContent='Previous 6 hours'
        button6hours.setAttribute('value',21600)
        button6hours.onclick = function(e){
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if(!button6hours.getAttribute('clicked')){
                [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button6hours).forEach(button=>{
                  button.removeAttribute('clicked')
                  button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                })
                button6hours.setAttribute('clicked',true)
                button6hours.style.background='black'
                document.getElementById('custombanduration').disabled=true
                document.getElementById('custombanduration').value=''
            }else{
                button6hours.removeAttribute('clicked')
                button6hours.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                document.getElementById('custombanduration').disabled=false
            }
        }

        const button12hours = document.createElement('button')
        button12hours.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
        button12hours.textContent='Previous 12 hours'
        button12hours.setAttribute('value',43200)
        button12hours.onclick = function(e){
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if(!button12hours.getAttribute('clicked')){
                [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button12hours).forEach(button=>{
                  button.removeAttribute('clicked')
                  button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                })
                button12hours.setAttribute('clicked',true)
                button12hours.style.background='black'
                document.getElementById('custombanduration').disabled=true
                document.getElementById('custombanduration').value=''
            }else{
                button12hours.removeAttribute('clicked')
                button12hours.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                document.getElementById('custombanduration').disabled=false
            }
        }

        const button1day = document.createElement('button')
        button1day.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
        button1day.textContent='Previous day'
        button1day.setAttribute('value',86400)
        button1day.onclick = function(e){
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if(!button1day.getAttribute('clicked')){
                [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button1day).forEach(button=>{
                  button.removeAttribute('clicked')
                  button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                })
                button1day.setAttribute('clicked',true)
                button1day.style.background='black'
                document.getElementById('custombanduration').disabled=true
                document.getElementById('custombanduration').value=''
            }else{
                button1day.removeAttribute('clicked')
                button1day.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                document.getElementById('custombanduration').disabled=false
            }
        }

        const button3days = document.createElement('button')
        button3days.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
        button3days.textContent='Previous 3 days'
        button3days.setAttribute('value',259200)
        button3days.onclick = function(e){
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if(!button3days.getAttribute('clicked')){
                [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button3days).forEach(button=>{
                  button.removeAttribute('clicked')
                  button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                })
                button3days.setAttribute('clicked',true)
                button3days.style.background='black'
                document.getElementById('custombanduration').disabled=true
                document.getElementById('custombanduration').value=''
            }else{
                button3days.removeAttribute('clicked')
                button3days.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                document.getElementById('custombanduration').disabled=false
            }
        }

        const button7days = document.createElement('button')
        button7days.style='display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border: 1px solid color-mix(in srgb, 18% var(--md-sys-color-on-surface), transparent); border-radius: 999px; cursor: pointer; background: color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent); color: var(--md-sys-color-on-surface); font-size: 0.8rem; font-family: inherit; transition: border-color 0.15s, background 0.15s; white-space: nowrap;'
        button7days.textContent='Previous 7 days'
        button7days.setAttribute('value',604800)
        button7days.onclick = function(e){
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if(!button7days.getAttribute('clicked')){
                [...document.querySelectorAll`button[clicked]`].filter(e=>e!=button7days).forEach(button=>{
                  button.removeAttribute('clicked')
                  button.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                })
                button7days.setAttribute('clicked',true)
                button7days.style.background='black'
                document.getElementById('custombanduration').disabled=true
                document.getElementById('custombanduration').value=''
            }else{
                button7days.removeAttribute('clicked')
                button7days.style.background='color-mix(in srgb, 6% var(--md-sys-color-on-surface), transparent)'
                document.getElementById('custombanduration').disabled=false
            }
        }

        div3.appendChild(button1hour)
        div3.appendChild(button6hours)
        div3.appendChild(button12hours)
        div3.appendChild(button1day)
        div3.appendChild(button3days)
        div3.appendChild(button7days)

        const custom = document.createElement('mdui-text-field')
        custom.id='custombanduration'
        custom.variant='filled'
        custom.type='text'
        custom.name='customValue'
        custom.label='Enter a custom value (in seconds)'
        custom.placeholder='0-604800'
        custom.maxlength=6

        custom.oninput = function(){
          if(isNaN(Number(custom.value))||!(Number(custom.value)>=0)||!(Number(custom.value)<=604800)||custom.value.includes('.')){
              custom.label=`Enter a custom value (in seconds) - invalid input`
              custom.value=''
              setTimeout(() => {
                custom.label='Enter a custom value (in seconds)'
              }, 3000);
            }
        }

        if(!document.getElementById('boobs')){
            banpopup.children[1].firstChild.firstChild.appendChild(div)
            banpopup.children[1].firstChild.firstChild.appendChild(div3)
            banpopup.children[1].firstChild.firstChild.appendChild(custom)
        }
    }
  }

  const observer = new MutationObserver(() => {
    deleteMessagesOnBan();
  });

  function init() {
    deleteMessagesOnBan();
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