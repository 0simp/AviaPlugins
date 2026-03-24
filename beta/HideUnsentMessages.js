(function () {
    if (window.__HIDE_UNSENT_MESSAGES__) return;
    window.__HIDE_UNSENT_MESSAGES__ = true;
    const targetNode = document.documentElement;
    const config = { childList: true, subtree: true };

    function setIcon(button, type) {
        const oldSvg = button.querySelector('svg');
        if (oldSvg) oldSvg.remove();

        const icons = {
            monitor: "M3 4h18v12H3V4zm2 2v8h14V6H5zm3 12h8v2H8v-2z",
            upload: "M5 20h14v-2H5v2zm7-18L5.33 9h3.84v4h4.66V9h3.84L12 2z",
            refresh: "M17.65 6.35A7.95 7.95 0 0012 4V1L7 6l5 5V7a5 5 0 11-5 5H5a7 7 0 107.75-6.65z",
            code: "M8.7 16.3L4.4 12l4.3-4.3 1.4 1.4L7.2 12l2.9 2.9-1.4 1.4zm6.6 0l-1.4-1.4L16.8 12l-2.9-2.9 1.4-1.4L19.6 12l-4.3 4.3z",
            delete: "M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"
        };

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("fill", "currentColor");
        svg.style.marginRight = "8px";
        if(type=='delete'){
            svg.setAttribute('fill','var(--md-sys-color-error)')
        }

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", icons[type]);
        svg.appendChild(path);

        button.insertBefore(svg, button.firstChild);
    }

    function hideUnsentMessages(){
        const deletedmessages = document.getElementsByClassName('group pos_relative d_flex flex-d_column p_2px_0 bg_transparent bdr_var(--borderRadius-md) min-h_1em trs_background-color_var(--transitions-fast) [&_a:hover]:td_underline [&:hover_.Toolbar]:d_flex mt_var(--message-group-spacing)! [&:hover]:bg_var(--md-sys-color-surface-container) c_var(--md-sys-color-error)')
        if(deletedmessages.item(0)){
            for(const message of deletedmessages){
                if(localStorage.getItem('hideunsentmessages')=='true'){
                    message.style.display='none'
                }
            }
        }
    }
    const observer1 = new MutationObserver(hideUnsentMessages);
    observer1.observe(targetNode, config)
    hideUnsentMessages()

    function injectSettingsButton(){
        const themes = document.getElementById('avia-themes-btn')
        if(themes&&!document.getElementById('hideunsentmessages')){
            const settingsbutton = document.createElement('a')
            settingsbutton.className='pos_relative min-w_0 d_flex ai_center p_6px_8px bdr_8px fw_500 me_12px fs_15px us_none trs_background-color_0.1s_ease-in-out c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bg_unset [&_svg]:flex-sh_0'
            settingsbutton.id='hideunsentmessages'
            settingsbutton.innerHTML=`
            <md-ripple aria-hidden="true"></md-ripple><div class="d_flex ai_center gap_8px flex-g_1 min-w_0 pe_8px"><div class="min-w_0 d_flex flex-d_column"><div class="ov_hidden white-space_nowrap tov_ellipsis [&amp;_*]:ov_hidden [&amp;_*]:white-space_nowrap [&amp;_*]:tov_ellipsis"><span style="color: var(--md-sys-color-error);">(Avia) Hide Unsent Messages</span></div></div></div>
            `
            setIcon(settingsbutton,'delete')

            settingsbutton.onclick=()=>{
                if(!localStorage.getItem('hideunsentmessages')){
                    localStorage.setItem('hideunsentmessages','true')
                }else{
                    if(localStorage.getItem('hideunsentmessages')=='false'){
                        localStorage.setItem('hideunsentmessages','true')
                    }else{
                        localStorage.setItem('hideunsentmessages','false')
                    }
                }
            };
            themes.parentElement.appendChild(settingsbutton)
        }
    }
    const observer2 = new MutationObserver(injectSettingsButton)
    observer2.observe(targetNode,config)
})();
