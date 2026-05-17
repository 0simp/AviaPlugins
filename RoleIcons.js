(function () {
    if (window.__ROLE_ICONS__) return;
    window.__ROLE_ICONS__ = true;
    let capturedToken = null;
    let id = null;
    let roleids = [];
    let members = {};
    let roles = {};
    let messages = {};
    let iconmessages = [];

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

                if(resource.includes('/roles')&&config.method=='PATCH'&&config.body &&typeof config.body === "string"){
                    const parsed = JSON.parse(config.body);
                    if(parsed){
                        if(id){
                            parsed.icon=id
                            config = { ...config, body: JSON.stringify(parsed) };
                            id = null;
                        }
                    }
                }

                if(resource.includes('/members')&&config.method=='GET'&&!roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))]){
                    if(roleids.length){
                        roleids = []
                    }

                    const res = await originalFetch(resource,config)
                    try {
                        const json = await res.json()
                        json.members.forEach(member=>{
                            if(!members[member._id.server]){
                                members[member._id.server] = []
                                roles[member._id.server] = []
                            }
                            members[member._id.server].push(member)

                            member.roles?.forEach(async role=>{
                                if(!roleids.includes(role)){
                                    roleids.push(role)
                                }
                            })

                        })
                        roleids.forEach(async id=>{
                            const res = await originalFetch(`https://stoat.chat/api/servers/${url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))}/roles/${id}`,config)
                            
                            try {
                                const json = await res.json()
                                if(json._id){
                                    if(!roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))]){
                                        roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))] = []
                                    }
                                    roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))].push(json)
                                }
                            } catch (error) {
                                
                            }
                        });
                    } catch (error) {
                        
                    }
                }

                if(resource.includes('/messages?limit')&&config.method=='GET'){
                    setTimeout(async() => {
                        if(document.baseURI.includes('server')){
                            const serverid = document.baseURI.substring(document.baseURI.indexOf('server/')+7,document.baseURI.indexOf('/channel'))

                            const res = await originalFetch(resource,config)

                            try {
                                const json = await res.json()

                                json.messages.forEach(message=>{
                                    if(!messages[serverid]){
                                        messages[serverid] = []
                                    }
                                    messages[serverid].push(message)
                                })
                            } catch (error) {
                                    
                            }
                          
                            messages[serverid].forEach(message=>{
                                if(!members[serverid]) return;
                                const member = members[serverid].find(member=>member._id.user==message.author) 
                                if(!member) return;
                                const rolewithicon = roles[serverid].filter(role=>member.roles?.includes(role._id)).find(r=>r.icon)
                                if(rolewithicon){
                                    const messageelement = document.getElementById(message._id)
                                    if(messageelement&&messageelement.querySelector('img')&&!messageelement.dataset.patched){
                                        const icon = document.createElement('img')
                                        icon.src=`https://cdn.stoatusercontent.com/icons/${rolewithicon.icon._id}`
                                        icon.width=16
                                        icon.height=16

                                        let tartget = messageelement.children[1].children[1].firstChild

                                        if(tartget.className=='min-w_0 d_flex gap_var(--gap-sm) flex-d_column fw_400 fs_var(--message-size)') return;

                                        if(tartget.className=='d_flex ov_hidden ai_center white-space_nowrap tov_ellipsis'
                                        ||tartget.className=='d_inline-flex ai_center gap_var(--gap-sm) white-space_nowrap'){
                                            tartget = messageelement.children[2].children[1].firstChild
                                        }

                                        if(tartget.className=='d_flex ov_hidden ai_center white-space_nowrap tov_ellipsis'){
                                            tartget = messageelement.lastChild.children[1].firstChild
                                        }

                                        tartget.insertBefore(icon,tartget.lastChild)
                                        messageelement.dataset.patched=true
                                        iconmessages.push({id:message._id,icon:`https://cdn.stoatusercontent.com/icons/${rolewithicon.icon._id}`})
                                    }
                                }
                            })
                        }  
                    }, 100);
                }
            } catch (_) {}
            return originalFetch(resource,config);
        };

        async function upload(){
            const icon = document.getElementsByClassName('cursor_pointer pos_relative h_96px bg-c_var(--md-sys-color-surface-dim) [&_img]:d_block [&_img]:h_100% [&_img]:w_100% [&_img]:obj-f_cover [&_img]:bdr_50% bdr_50%')
            .item(0).querySelector(`img`)

            if(icon&&capturedToken){
                const files  = [...document.querySelector(`input[accept='image/*']`).files]
                const file = files[files.length-1]
                const form = new FormData()
                form.append('file',file)
                try {
                    const res = await originalFetch(`https://cdn.stoatusercontent.com/icons`,{
                        method:"POST",
                        headers:{
                            "X-Session-Token":capturedToken
                        },
                        body:form
                    })

                    try {
                        const json = await res.json()
                        if(json.id){
                            id = json.id
                        }
                    } catch (error) {
                                            
                    }
                } catch (error) {
                    
                }
            }
        }

    function roleIcons() {
        iconmessages.forEach(message=>{
            const messageelement = document.getElementById(message.id)
            if(messageelement&&messageelement.querySelector('img')&&!messageelement.dataset.patched){
                const icon = document.createElement('img')
                icon.src=`${message.icon}`
                icon.width=16
                icon.height=16

                let tartget = messageelement.children[1].children[1].firstChild

                if(tartget.className=='min-w_0 d_flex gap_var(--gap-sm) flex-d_column fw_400 fs_var(--message-size)') return;

                if(tartget.className=='d_flex ov_hidden ai_center white-space_nowrap tov_ellipsis'
                ||tartget.className=='d_inline-flex ai_center gap_var(--gap-sm) white-space_nowrap'){
                    tartget = messageelement.children[2].children[1].firstChild
                }

                if(tartget.className=='d_flex ov_hidden ai_center white-space_nowrap tov_ellipsis'){
                    tartget = messageelement.lastChild.children[1].firstChild
                }

                tartget.insertBefore(icon,tartget.lastChild)
                messageelement.dataset.patched=true
            }
        })

        const rolecolourpicker = document.getElementsByClassName('lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) bg_var(--md-sys-color-primary) --colour_var(--md-sys-color-on-primary) h_96px px_32px bdr_var(--borderRadius-xl)')
        .item(0)

        if(rolecolourpicker&&!document.getElementById('uploadroleicon')){
            const span2 = document.createElement('span')
            span2.className='lh_1rem fs_0.75rem ls_0.03125rem fw_500'
            span2.textContent='Role icon'

            const input = document.createElement('input')
            input.type='file'
            input.className='d_none'
            input.accept='image/*'

            const div = document.createElement('div')
            div.className='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-lg) ai_center jc_center'

            const div2 = document.createElement('div')
            div2.className='cursor_pointer pos_relative h_96px bg-c_var(--md-sys-color-surface-dim) [&_img]:d_block [&_img]:h_100% [&_img]:w_100% [&_img]:obj-f_cover [&_img]:bdr_50% bdr_50%'
            div2.style='aspect-ratio: 1 / 1;'

            input.onchange = async function(){
                const file = [...input.files][[...input.files].length-1]
                const reader = new FileReader()
                reader.onload = function(){
                    if(div2.querySelector(`img`)){
                        div2.querySelectorAll(`img`).forEach(image=>{
                            image.remove()
                        })
                    }
                    const image = document.createElement('img')
                    image.src=reader.result
                    div2.appendChild(image)

                    const uploadbutton = document.getElementById('uploadroleicon')
                    uploadbutton.disabled=false
                    uploadbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative px_var(--padding-inline) flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px --padding-inline_16px bdr_48px bg_var(--md-sys-color-primary) --color_var(--md-sys-color-on-primary)'
                }

                reader.readAsDataURL(file)
            }

            div2.onclick = function(){
                input.click()
            }

            const mdripple = document.createElement('md-ripple')
            mdripple.ariaHidden=true

            const clearbutton = document.createElement('button')
            clearbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative px_var(--padding-inline) flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) w_36px h_36px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'
            
            const mdripple2 = document.createElement('md-ripple')
            mdripple2.ariaHidden=true

            const span = document.createElement('span')
            span.className='material-symbols-outlined'
            span.style='display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0; font-size: 24px;'
            span.textContent='close'

            clearbutton.onclick = function(){
                div2.querySelectorAll(`img`).forEach(image=>{
                    image.remove()
                    id = null;
                    const uploadbutton = document.getElementById('uploadroleicon')
                    uploadbutton.disabled=true
                    uploadbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative px_var(--padding-inline) flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_not-allowed bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px --padding-inline_16px bdr_48px bg_color-mix(in_srgb,_10%_var(--md-sys-color-on-surface),_transparent) --color_color-mix(in_srgb,_38%_var(--md-sys-color-on-surface),_transparent)'
                })
            }

            const div3 = document.createElement('div')
            div3.className='d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial gap_var(--gap-md)'

            const div4 = document.createElement('div')
            div4.className='d_flex flex-d_row flex-g_initial flex-wrap_initial gap_var(--gap-md) ai_initial jc_initial'

            const uploadbutton = document.createElement('button')
            uploadbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative px_var(--padding-inline) flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_not-allowed bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px --padding-inline_16px bdr_48px bg_color-mix(in_srgb,_10%_var(--md-sys-color-on-surface),_transparent) --color_color-mix(in_srgb,_38%_var(--md-sys-color-on-surface),_transparent)'
            uploadbutton.disabled=true
            uploadbutton.textContent='Upload'
            uploadbutton.id='uploadroleicon'

            uploadbutton.onclick = async function(){
                if(capturedToken){
                    await upload()
                }else{
                    const text = document.createElement('text')
                    text.style.color='red'
                    text.textContent=`No token captured yet. Trigger some requests then try again`
                    uploadbutton.parentElement.appendChild(text)
                    setTimeout(() => {
                        text.remove()
                    }, 3000);
                }

                uploadbutton.disabled=true
                uploadbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative px_var(--padding-inline) flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_not-allowed bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px --padding-inline_16px bdr_48px bg_color-mix(in_srgb,_10%_var(--md-sys-color-on-surface),_transparent) --color_color-mix(in_srgb,_38%_var(--md-sys-color-on-surface),_transparent)'
            }

            div4.appendChild(uploadbutton)
            div3.appendChild(div4)

            clearbutton.appendChild(mdripple2)
            clearbutton.appendChild(span)

            div2.appendChild(mdripple)
            div.appendChild(div2)
            div.appendChild(clearbutton)

            rolecolourpicker.parentElement.parentElement.parentElement.insertBefore(input,rolecolourpicker.parentElement.parentElement.parentElement.firstChild)
            rolecolourpicker.parentElement.parentElement.parentElement.insertBefore(div,rolecolourpicker.parentElement.parentElement.parentElement.children[1])
            rolecolourpicker.parentElement.parentElement.parentElement.insertBefore(div3,rolecolourpicker.parentElement.parentElement.parentElement.children[2])
            rolecolourpicker.parentElement.parentElement.parentElement.insertBefore(span2,rolecolourpicker.parentElement.parentElement.parentElement.firstChild)
        }
    }

    const observer = new MutationObserver(() => {
        roleIcons();
    });

    function init() {
        roleIcons();
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