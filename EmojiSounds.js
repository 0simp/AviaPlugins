(function () {
  if (window.__EMOJI_SOUNDS__) return;
  window.__EMOJI_SOUNDS__ = true;
  const targetNode = document.documentElement;
  let emojisounds = JSON.parse(localStorage.getItem('emoji-sounds'))??[]
    function callback(mutationsList, observer) {
        emojisounds = JSON.parse(localStorage.getItem('emoji-sounds'))??[]
        mutationsList.forEach((mutation) => {
            if (mutation.type === 'childList') {
                for (let node of mutation.addedNodes) {
                    if(node.className=='group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-on-surface)'||(node.id&&node.children[0].className=='top_-18px right_16px pos_absolute ai_center d_none ov_hidden bdr_var(--borderRadius-xs) bx-sh_0_0_3px_var(--md-sys-color-shadow) fill_var(--md-sys-color-on-secondary-container) bg_var(--md-sys-color-secondary-container) Toolbar')){
                        let timestamp = node.children[1]?.children[1]?.children[0]?.children[1]?.children[0]?.children[1]?.innerHTML
                        timestamp = timestamp?.substring(timestamp?.indexOf('"')+1,timestamp?.lastIndexOf('"'));
                        timestamp = Math.floor(new Date(timestamp).getTime() / 1000)
                        let emoji;
                        emoji = node.children[1].children[1].children[0].children[0].children[0].children[0].alt //emoji if the message doesn't have a timestamp at the top of it
                        if(node.children[1].children[1].children[1]){
                            emoji = node.children[1].children[1].children[1].children[0].children[0].children[0].alt //emoji if the message does have a timestamp at the top of it
                        }
                        //custom emoji support
                        if(!emoji){
                            emoji = node.children[1].children[1].children[0].children[0].children[0].children[0].children[0].alt
                            if(node.children[1].children[1].children[1]){
                                emoji = node.children[1].children[1].children[1].children[0].children[0].children[0].children[0].alt
                            }
                        }
                        if((emojisounds.find(emoji1=>emoji1.emoji===emoji)&&Math.floor(Date.now()/1000)-timestamp<2)||(isNaN(timestamp))){
                            const eomijsound = emojisounds.find(emoji1=>emoji1.emoji===emoji)
                            const sound = new Audio(eomijsound.sound)
                            sound.play()
                        }
                    }
                }
            }
        });
    }
    const observer1 = new MutationObserver(callback);
    const config = { childList: true, subtree: true };
    observer1.observe(targetNode, config)

    function setIcon(button, type) {
        const oldSvg = button.querySelector('svg');
        if (oldSvg) oldSvg.remove();

        const icons = {
            monitor: "M3 4h18v12H3V4zm2 2v8h14V6H5zm3 12h8v2H8v-2z",
            upload: "M5 20h14v-2H5v2zm7-18L5.33 9h3.84v4h4.66V9h3.84L12 2z",
            refresh: "M17.65 6.35A7.95 7.95 0 0012 4V1L7 6l5 5V7a5 5 0 11-5 5H5a7 7 0 107.75-6.65z",
            code: "M8.7 16.3L4.4 12l4.3-4.3 1.4 1.4L7.2 12l2.9 2.9-1.4 1.4zm6.6 0l-1.4-1.4L16.8 12l-2.9-2.9 1.4-1.4L19.6 12l-4.3 4.3z",
            settings:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"
        };

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("fill", "currentColor");
        svg.style.marginRight = "8px";

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", icons[type]);
        svg.appendChild(path);

        button.insertBefore(svg, button.firstChild);
    }

    function styleInput(input) {
        input.style.padding = '6px 8px';
        input.style.borderRadius = '8px';
        input.style.border = '1px solid rgba(255,255,255,0.1)';
        input.style.background = 'rgba(255,255,255,0.05)';
        input.style.color = '#fff';
    }

    function enableDrag(panel, header) {
        let isDragging = false, offsetX, offsetY;
        header.addEventListener('mousedown', e => {
            isDragging = true;
            offsetX = e.clientX - panel.offsetLeft;
            offsetY = e.clientY - panel.offsetTop;
        });
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            panel.style.left = (e.clientX - offsetX) + 'px';
            panel.style.top = (e.clientY - offsetY) + 'px';
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';
        });
    }

    function renderPanel(){
        const content = document.getElementById('emoji-sounds-settings-content')
        if (!content) return;
        content.innerHTML = '';
        emojisounds = JSON.parse(localStorage.getItem('emoji-sounds'))??[]
        emojisounds.forEach(async (sound,index)=>{
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.alignItems = 'center';
            row.style.marginBottom = '12px';
            const left = document.createElement('div');
            left.style.display = 'flex';
            left.style.alignItems = 'center';
            left.style.gap = '10px';
            const emoji = document.createElement('div');
            emoji.textContent = sound.emoji;
            const res = await fetch(`https://cdn.stoatusercontent.com/emojis/${sound.emoji.replaceAll(':','')}`)
            if(res.ok){
                emoji.innerHTML=`
                <img loading="lazy" draggable="false" src="https://cdn.stoatusercontent.com/emojis/${sound.emoji.replaceAll(':','')}" alt="${sound.emoji}" class="obj-f_contain d_inline-block w_var(--emoji-size) h_var(--emoji-size) m_0_0.05em_0_0.1em va_-0.3em c_transparent [&amp;:before]:content_'_' [&amp;:before]:d_block [&amp;:before]:pos_absolute [&amp;:before]:h_50px [&amp;:before]:w_50px [&amp;:before]:bg-i_url(ishere.jpg) emoji" style="height: 24px; width: 19.97px;">
                `
            }
            left.appendChild(emoji);
            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.gap = '6px';
            const play = document.createElement('button')
            play.textContent='🔊'
            play.onclick=()=>{
                let emoji = play.parentElement.parentElement.children[0].textContent
                if(emoji.length!=2){
                    emoji = play.parentElement.parentElement.children[0].children[0].alt
                }
                const eomijsound = emojisounds.find(emoji1=>emoji1.emoji===emoji)
                const sound = new Audio(eomijsound.sound)
                sound.play()
            };
            const edit = document.createElement('button')
            edit.innerHTML=`
            <md-ripple aria-hidden="true"></md-ripple><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" fill="#F0DEDD"></path></svg>
            `
            edit.onclick=async ()=>{
                let originalemoji;
                if(edit.parentElement.previousSibling.children[0]){
                    originalemoji=edit.parentElement.previousSibling.children[0].alt
                    const res = await fetch(`https://stoat.chat/api/custom/emoji/${originalemoji.replaceAll(':','')}`)
                    if(res.ok){
                        const json = await res.json()
                        originalemoji = json.name
                        //get the name of the server the emoji comes from if the user is in it
                        document.querySelectorAll('a[href]').forEach(item=>{
                            if(item.href.includes(json.parent.id)&&!originalemoji.includes('from')){
                                originalemoji = originalemoji+` from ${item.parentElement.parentElement.ariaLabel}`
                            }
                        })
                    }
                }else{
                    originalemoji = edit.parentElement.previousSibling.textContent
                }
                const add = edit.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[2]
                const close = edit.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]
                const originalcloseclick = close.onclick
                edit.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].textContent=`Emoji Sounds Settings (editing ${originalemoji})`
                add.textContent='Save'
                const originalclick = add.onclick
                add.onclick=()=>{
                    const emoji = edit.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[0].value.trim()
                    const url = edit.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[1].value.trim()
                    if(!emoji||!url) return;
                    if(!emojisounds.find(emoji1=>emoji1.emoji===emoji)){
                        emojisounds.splice(emojisounds.indexOf(emojisounds.find(emoji=>emoji.emoji===originalemoji)),1)
                        emojisounds.push({emoji:emoji,sound:url})
                        localStorage.setItem('emoji-sounds',JSON.stringify(emojisounds))
                    }
                    renderPanel();
                    add.parentElement.previousSibling.previousSibling.textContent='Emoji Sounds Settings'
                    add.textContent='Add'
                    add.onclick=originalclick
                    add.previousSibling.previousSibling.value=''
                    add.previousSibling.value=''
                };
                close.onclick=()=>{
                    add.parentElement.previousSibling.previousSibling.textContent='Emoji Sounds Settings'
                    add.textContent='Add'
                    add.onclick=originalclick
                    add.previousSibling.previousSibling.value=''
                    add.previousSibling.value=''
                    close.onclick=originalcloseclick
                };
            };
            const remove = document.createElement('button');
            remove.textContent = '✕';
            remove.onclick = () => {
                emojisounds.splice(index, 1);
                localStorage.setItem('emoji-sounds',JSON.stringify(emojisounds))
                renderPanel();
            };
            controls.appendChild(play)
            controls.appendChild(edit)
            controls.appendChild(remove);
            row.appendChild(left);
            left.appendChild(controls);
            content.appendChild(row);
        });
    }

    function injectSettingsButton(){
        const plugins = document.getElementById('stoat-fake-plugins')
        if(plugins&&!document.getElementById('emoji-sounds-settings')){
            function togglePanel(){
                let panel = document.getElementById('emoji-sounds-settings-panel')
                if(panel){
                    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
                    return;
                }
                panel = document.createElement('div');
                panel.id = 'emoji-sounds-settings-panel';
                panel.style.position = 'fixed';
                panel.style.bottom = '24px';
                panel.style.right = '24px';
                panel.style.width = '520px';
                panel.style.height = '460px';
                panel.style.background = 'var(--md-sys-color-surface, #1e1e1e)';
                panel.style.color = 'var(--md-sys-color-on-surface, #fff)';
                panel.style.borderRadius = '16px';
                panel.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35)';
                panel.style.zIndex = '999999';
                panel.style.display = 'flex';
                panel.style.flexDirection = 'column';
                panel.style.overflow = 'hidden';
                panel.style.border = '1px solid rgba(255,255,255,0.08)';
                panel.style.backdropFilter = 'blur(12px)';
                const header = document.createElement('div');
                header.textContent = 'Emoji Sounds Settings';
                header.style.padding = '14px 16px';
                header.style.fontWeight = '600';
                header.style.fontSize = '14px';
                header.style.background = 'var(--md-sys-color-surface-container, rgba(255,255,255,0.04))';
                header.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
                header.style.cursor = 'move';
                const closeBtn = document.createElement('div');
                closeBtn.textContent = '✕';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '12px';
                closeBtn.style.right = '16px';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.opacity = '0.7';
                closeBtn.onclick = () => panel.style.display = 'none';
                const controlsBar = document.createElement('div');
                controlsBar.style.padding = '12px 16px';
                controlsBar.style.display = 'flex';
                controlsBar.style.gap = '8px';
                controlsBar.style.alignItems = 'center';
                controlsBar.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
                controlsBar.style.flex = '0 0 auto';
                const content = document.createElement('div');
                content.id = 'emoji-sounds-settings-content';
                content.style.flex = '1';
                content.style.overflow = 'auto';
                content.style.padding = '16px';
                const emojiInput = document.createElement('input');
                emojiInput.placeholder = 'Emoji';
                styleInput(emojiInput);
                emojiInput.style.width = '110px';
                const urlInput = document.createElement('input');
                urlInput.placeholder = 'Sound URL';
                styleInput(urlInput);
                urlInput.style.flex = '1';
                const addBtn = document.createElement('button');
                addBtn.textContent = 'Add';
                addBtn.onclick = () => {
                    emojisounds = JSON.parse(localStorage.getItem('emoji-sounds'))??[]
                    const emoji = emojiInput.value.trim();
                    const soundurl = urlInput.value.trim();
                    if (!emoji || !soundurl) return;
                    if(!emojisounds.find(emoji1=>emoji1.emoji===emoji)){
                        emojisounds.push({emoji:emoji,sound:soundurl})
                        localStorage.setItem('emoji-sounds',JSON.stringify(emojisounds))
                    }
                    emojiInput.value=''
                    urlInput.value=''
                    renderPanel()
                };
                controlsBar.appendChild(emojiInput);
                controlsBar.appendChild(urlInput);
                controlsBar.appendChild(addBtn);
                panel.appendChild(header);
                panel.appendChild(closeBtn);
                panel.appendChild(controlsBar);
                panel.appendChild(content);
                document.body.appendChild(panel);
                enableDrag(panel,header)
                renderPanel()
            }

            const settingsbutton = document.createElement('a')
            settingsbutton.className='pos_relative min-w_0 d_flex ai_center p_6px_8px bdr_8px fw_500 me_12px fs_15px us_none trs_background-color_0.1s_ease-in-out c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bg_unset [&_svg]:flex-sh_0'
            settingsbutton.id='emoji-sounds-settings'
            settingsbutton.innerHTML=`
            <md-ripple aria-hidden="true"></md-ripple><div class="d_flex ai_center gap_8px flex-g_1 min-w_0 pe_8px"><div class="min-w_0 d_flex flex-d_column"><div class="ov_hidden white-space_nowrap tov_ellipsis [&amp;_*]:ov_hidden [&amp;_*]:white-space_nowrap [&amp;_*]:tov_ellipsis">(Avia) Emoji Sounds Settings</div></div></div>
            `
            setIcon(settingsbutton,'settings')

            settingsbutton.onclick=()=>{
                togglePanel()
            };

            plugins.parentElement.insertBefore(settingsbutton,plugins.nextSibling)
        }
    }
    const observer2 = new MutationObserver(injectSettingsButton)
    observer2.observe(targetNode,config)
})();
