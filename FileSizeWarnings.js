(function () {
    if (window.__FILE_SIZE_WARNINGS__) return;
    window.__FILE_SIZE_WARNINGS__ = true;

    function bytesToKilobytes(bytes){
        return Number.parseFloat(bytes/1000).toFixed(2);
    }

    function kiloBytestoMegabytes(kilobytes){
        return Number.parseFloat(kilobytes/1000).toFixed(2);
    }

    async function createFileSizeWarning(type,filename,filesize){
        const limits = {
            "icons":'2.5 MB',
            "backgrounds":'6 MB',
            "banners":'6 MB',
            "emojis":'500 KB',
            "avatars":'4 MB'
        }

        const empty = document.createElement('div')

        const styleparent = document.createElement('div')
        styleparent.className='top_0 left_0 right_0 bottom_0 pos_fixed z_998 max-h_100% d_grid us_none place-items_center pointer-events_all anim-n_scrimFadeIn anim-dur_0.1s anim-fm_forwards trs_var(--transitions-medium)_all p_80px ov-y_auto --background_rgba(0,_0,_0,_0.6)'
        styleparent.style='--background: rgba(0, 0, 0, 0.6);'

        const style = document.createElement('div')
        style.style='opacity: 1; --motion-translateY: 0px; transform: translateY(var(--motion-translateY));'

        const popup = document.createElement('div')
        popup.className='p_24px min-w_280px max-w_560px bdr_28px d_flex flex-d_column c_var(--md-sys-color-on-surface) bg_var(--md-sys-color-surface-container-high)'

        const exclamationdiv = document.createElement('div')
        exclamationdiv.className='as_center mb_16px fill_var(--md-sys-color-on-surface)'
        exclamationdiv.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"></path></svg>`

        const errorspan = document.createElement('span')
        errorspan.className='lh_2rem fs_1.5rem ls_0 fw_400 mbe_16px ta_center'
        errorspan.textContent='An error occurred.'

        const sizediv = document.createElement('div')
        sizediv.className='c_var(--md-sys-color-on-surface-variant) lh_1.25rem fs_0.875rem ls_0.015625rem fw_400'

        const sizedivchild = document.createElement('div')
        sizedivchild.className='white-space_pre-wrap'

        let sizestring = '';
        let size = await bytesToKilobytes(filesize)
        sizestring = `${size} KB`
        if(size>=1000){
            size = await kiloBytestoMegabytes(size)
            sizestring = `${size} MB`
        }

        const sizetext = document.createElement('text')
        sizetext.textContent=`The file "${filename}" (${sizestring}) exceeds the maximum file size of ${limits[type]}`

        const okdiv = document.createElement('div')
        okdiv.className='gap_8px d_flex jc_end mbs_24px'

        const okbutton = document.createElement('button')
        okbutton.className='lh_1.25rem fs_0.875rem ls_0.015625rem fw_400 pos_relative px_16px flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-medium)_all c_var(--color) fill_var(--color) h_40px bdr_var(--borderRadius-full) --color_var(--md-sys-color-primary)'

        const mdripple = document.createElement('md-ripple')
        mdripple.ariaHidden=true

        const oktext = document.createElement('text')
        oktext.textContent='OK'

        okbutton.onclick = ()=>{
            empty.remove()
        }

        empty.appendChild(styleparent)
        styleparent.appendChild(style)
        style.appendChild(popup)
        popup.appendChild(exclamationdiv)
        popup.appendChild(errorspan)
        popup.appendChild(sizediv)
        sizediv.appendChild(sizedivchild)
        sizedivchild.appendChild(sizetext)
        popup.appendChild(okdiv)
        okdiv.appendChild(okbutton)
        okbutton.appendChild(mdripple)
        okbutton.appendChild(oktext)

        const floating = document.getElementById('floating')
        floating.appendChild(empty)
    }

    function fileSizeWarnings() {
        const imageinputs = [...document.querySelectorAll(`input[type='file']`)].filter(e=>
            e.parentElement?.className=='d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial gap_var(--gap-md)'
            ||e.parentElement?.className=='d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial gap_var(--gap-lg)'
        )

        const descriptioninput = document.querySelector(`mdui-text-field[name='description']`)
        if(descriptioninput){ //server/channel settings pages
            const iconinput = imageinputs[0]
            if(!iconinput.dataset.filesizewarnings){
                const oldiconelement = iconinput.parentElement.querySelector(`img[src*='/icons']`)
                const oldicon = oldiconelement?.src
                imageinputs[0].onchange = function(e){
                    if(imageinputs[0].files[0].size>2500000){
                        createFileSizeWarning('icons',iconinput.files[0].name,iconinput.files[0].size)
                        iconinput.value=''
                        if(oldicon){
                            iconinput.parentElement.querySelector(`img`).src=oldicon
                        }else{
                            iconinput.parentElement.querySelector(`img`).remove()
                        }
                    }
                }

                iconinput.dataset.filesizewarnings=true
            }   

            const permissionssvg = document.querySelector(`path[d='M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z']`)
            if(!permissionssvg){
                const bannerinput = imageinputs[1]
                if(!bannerinput.dataset.filesizewarnings){
                    const oldbannerelement = bannerinput.nextSibling.querySelector(`img`)
                    const oldbanner = oldbannerelement?.src
                    bannerinput.onchange = function(e){
                        if(bannerinput.files[0].size>6000000){
                            createFileSizeWarning('banners',bannerinput.files[0].name,bannerinput.files[0].size)
                            bannerinput.value=''
                            if(oldbanner){
                                bannerinput.nextSibling.querySelector(`img`).src=oldbanner
                            }else{
                                bannerinput.nextSibling.querySelector(`img`).remove()
                            }
                        }
                    }

                    bannerinput.dataset.filesizewarnings=true
                }
            }
        }else{
            const nameinput = document.querySelector(`mdui-text-field[name='name']`)
            if(nameinput){ //emoji/role settings pages
                const input = imageinputs[0]
                if(!input.dataset.filesizewarnings){
                    const oldimageelement = input.parentElement.querySelector(`img`)
                    const oldimage = oldimageelement?.src
                    const checkbox = document.querySelector(`mdui-checkbox`)
                    let type = {};

                    if(checkbox){
                        type = {type:'icons',size:2500000}
                    }else{
                        type = {type:'emojis',size:500000}
                    }

                    input.onchange = function(e){
                        if(input.files[0].size>type.size){
                            createFileSizeWarning(`${type.type}`,input.files[0].name,input.files[0].size)
                            input.value=''
                            if(oldimage){
                                input.parentElement.querySelector(`img`).src=oldimage
                            }else{
                                input.parentElement.querySelector(`img`).remove()
                            }
                        }
                    }

                    input.dataset.filesizewarnings=true
                }
            }else{
                const displaynameinput = document.querySelector(`mdui-text-field[name='displayName']`)
                if(displaynameinput){ //bot/user profile settings pages
                    const avatarinput = imageinputs[0]
                    if(!avatarinput.dataset.filesizewarnings){
                        const oldavatarelement = avatarinput.parentElement.querySelector(`img`)
                        const oldavatar = oldavatarelement?.src
                        avatarinput.onchange = function(e){
                            if(avatarinput.files[0].size>4000000){
                                createFileSizeWarning('avatars',avatarinput.files[0].name,avatarinput.files[0].size)
                                avatarinput.value=''
                                if(oldavatar){
                                    avatarinput.parentElement.querySelector(`img`).src=oldavatar
                                }else{
                                    avatarinput.parentElement.querySelector(`img`).remove()
                                }
                            }
                        }

                        avatarinput.dataset.filesizewarnings=true
                    }

                    const bannerinput = imageinputs[1]
                    if(!bannerinput.dataset.filesizewarnings){
                        const oldbannerelement = bannerinput.parentElement.querySelectorAll(`img`).item(1)
                        const oldbanner = oldbannerelement?.src
                        bannerinput.onchange = function(e){
                            if(bannerinput.files[0].size>6000000){
                                createFileSizeWarning('backgrounds',bannerinput.files[0].name,bannerinput.files[0].size)
                                bannerinput.value=''
                                if(oldbanner){
                                    bannerinput.parentElement.querySelectorAll(`img`).item(1).src=oldbanner
                                }else{
                                    bannerinput.parentElement.querySelectorAll(`img`).item(1).remove()
                                }
                            }
                        }

                        bannerinput.dataset.filesizewarnings=true
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(() => {
        setTimeout(() => {
            fileSizeWarnings();
        }, 100);
    });

    function init() {
        fileSizeWarnings();
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