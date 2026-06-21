(function () {
  if (window.__CLICK_SOUNDS__) return;
  window.__CLICK_SOUNDS__ = true;
  let playing = false;
  let dragging = false;
  let offsetX;
  let offsetY;

  function setIcon(button) {
    const oldSvg = button.querySelector('svg');
    if (oldSvg) oldSvg.remove();
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('fill', 'currentColor');
    svg.style.marginRight = '8px';
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6');
    svg.appendChild(path);
    button.insertBefore(svg, button.firstChild);
  }

  function togglePanel(){
    let panel = document.getElementById('clicksoundspanel')
    if(panel){
        panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
        return;
    }

    panel = document.createElement('div')
    panel.id='clicksoundspanel'
    Object.assign(panel.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '340px',
        background: 'var(--md-sys-color-surface, #1e1e1e)',
        color: 'var(--md-sys-color-on-surface, #fff)',
        borderRadius: '16px',
        boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
        zIndex: '999999',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
    });

    const header = document.createElement('div');
    header.textContent = 'Click Sound';
    Object.assign(header.style, {
        padding: '12px 16px',
        fontWeight: '600',
        fontSize: '14px',
        background: 'var(--md-sys-color-surface-container, rgba(255,255,255,0.04))',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        cursor: 'move',
        userSelect: 'none',
    });

    header.addEventListener('mousedown',(e)=>{
      dragging = true
      offsetX = e.clientX - panel.offsetLeft;
      offsetY = e.clientY - panel.offsetTop;
      document.body.style.userSelect = 'none';
    })

    header.addEventListener('mouseup',()=>{
      dragging=false
      document.body.style.userSelect = '';
    });

    header.addEventListener('mouseleave',()=>{
      dragging=false
      document.body.style.userSelect = '';
    })

    header.addEventListener('mousemove',(e)=>{
      if(!dragging) return;
      panel.style.left = (e.clientX - offsetX) + 'px';
      panel.style.top = (e.clientY - offsetY) + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    })

    const closeBtn = document.createElement('div');
    closeBtn.textContent = '✕';
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '10px',
        right: '14px',
        cursor: 'pointer',
        opacity: '0.6',
        fontSize: '14px',
    });
    closeBtn.onclick = () => panel.style.display = 'none';

    const body = document.createElement('div');
    Object.assign(body.style, {
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    });

    const label = document.createElement('div');
    label.textContent = 'Sound file(plays whenever you click a button)';
    label.style.fontSize = '12px';
    label.style.opacity = '0.6';

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '8px';
    row.style.alignItems = 'center';

    const fileDropZone = document.createElement('div');
    fileDropZone.className = 'avia-file-drop';
    Object.assign(fileDropZone.style,{
      width: '100%',
      boxSizing: 'border-box',
      border: '2px dashed rgba(255,255,255,0.15)',
      borderRadius: '12px',
      padding: '28px 16px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.15s, background 0.15s',
      color: 'rgba(255,255,255,0.5)',
      fontSize: '0.875rem'
    })

    const fileDropText = document.createElement('div');
    fileDropText.style.marginBottom = '6px';

    if(localStorage.getItem('avia_click_sound_info')){
      fileDropText.textContent=`${JSON.parse(localStorage.getItem('avia_click_sound_info')).name}`
    }else{
      fileDropText.textContent = 'Drop a .ogg file here or click to browse';
    }

    const fileDropSub = document.createElement('div');
    Object.assign(fileDropSub.style, { fontSize: '11px', opacity: '0.5' });
    if(localStorage.getItem('avia_click_sound_info')){
      fileDropSub.textContent=`${JSON.parse(localStorage.getItem('avia_click_sound_info')).size}`
    }else{
      fileDropSub.textContent = '.Ogg file';
    }

    const fileinput = document.createElement('input')
    fileinput.type='file'
    fileinput.style.display='none'
    fileinput.accept='.ogg,audio/ogg'

    fileinput.onchange = function(e){
        if(fileinput.files[0]){
            fileSelect(fileinput.files[0])
        }
    }

    let selectedFile = null;

    function fileSelect(file){
        selectedFile = file;
        fileDropText.textContent = file.name;
        fileDropSub.textContent = (file.size / 1024).toFixed(1) + ' KB';
        fileDropZone.style.borderColor = 'var(--md-sys-color-primary, rgba(103,80,164,0.9))';
        fileDropZone.style.background = 'rgba(103,80,164,0.08)';
    }

    fileDropZone.appendChild(fileDropText);
    fileDropZone.appendChild(fileDropSub);
    fileDropZone.appendChild(fileinput);

    fileDropZone.addEventListener('click', () => fileinput.click());
    fileDropZone.addEventListener('dragover', e => { e.preventDefault(); fileDropZone.classList.add('avia-drag-over'); });
    fileDropZone.addEventListener('dragleave', () => fileDropZone.classList.remove('avia-drag-over'));
    fileDropZone.addEventListener('drop', e => {
        e.preventDefault();
        fileDropZone.classList.remove('avia-drag-over');
        const f = e.dataTransfer.files[0];
        if (f) fileSelect(f);
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    Object.assign(saveBtn.style, {
        padding: '6px 12px',
        borderRadius: '8px',
        border: 'none',
        background: 'var(--md-sys-color-primary, #7b6af0)',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        flexShrink: '0',
    });
    saveBtn.onclick = () => {
        if(!selectedFile||!selectedFile.type.includes('audio')) return;
        const infoobject = {
          name:`${selectedFile.name}`,
          size:`${(selectedFile.size / 1024).toFixed(1)+ ' KB'}`
        }

        const reader = new FileReader()
        reader.onload = ()=>{
          const dataUrl = reader.result;
          localStorage.setItem('avia_click_sound_data', dataUrl);
          localStorage.setItem('avia_click_sound_info',JSON.stringify(infoobject))
        };
        reader.readAsDataURL(selectedFile);

        saveBtn.textContent = 'Saved!';
        setTimeout(() => saveBtn.textContent = 'Save', 1500);
    };

    const clearBtn = document.createElement('button')
    clearBtn.textContent='Clear'
    Object.assign(clearBtn.style, {
        padding: '6px 12px',
        borderRadius: '8px',
        border: 'none',
        background: 'var(--md-sys-color-primary, #7b6af0)',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        flexShrink: '0',
    });

    clearBtn.onclick = function(){
      fileDropText.textContent = 'Drop an audio file here or click to browse';
      fileDropSub.textContent = 'Any audio file';
      if(localStorage.getItem('avia_click_sound_data')){
        localStorage.removeItem('avia_click_sound_data')
        localStorage.removeItem('avia_click_sound_info')
      }

      if(fileinput.files[0]){
        fileinput.value=''
      }
    }

    const testBtn = document.createElement('button');
    testBtn.textContent = '🔊 Test';
    Object.assign(testBtn.style, {
        padding: '6px 10px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '13px',
    });
    testBtn.onclick = () => {
        if(!localStorage.getItem('avia_click_sound_data')) return;

        const sound = new Audio(localStorage.getItem('avia_click_sound_data'))
        sound.play()
    };

    row.appendChild(fileDropZone)
    body.appendChild(label);
    body.appendChild(row);
    body.appendChild(saveBtn);
    body.appendChild(clearBtn)
    body.appendChild(testBtn);
    panel.appendChild(header);
    panel.appendChild(closeBtn);
    panel.appendChild(body);
    document.body.appendChild(panel);
  }

  function clickSounds() {
     const plugins = document.getElementById('stoat-fake-plugins');
     if(plugins&&!document.getElementById('clicksoundsbutton')){
        const button = document.createElement('button')
        button.id='clicksoundsbutton'
        button.className='pos_relative min-w_0 d_flex ai_center p_6px_8px bdr_8px fw_500 me_12px fs_15px us_none trs_background-color_0.1s_ease-in-out c_var(--md-sys-color-on-surface) fill_var(--md-sys-color-on-surface) bg_unset [&_svg]:flex-sh_0'
        button.innerHTML=`<md-ripple aria-hidden="true"></md-ripple><div class="d_flex ai_center gap_8px flex-g_1 min-w_0 pe_8px"><div class="min-w_0 d_flex flex-d_column"><div class="ov_hidden white-space_nowrap tov_ellipsis">(Avia) Click Sound</div></div></div>`
        setIcon(button)
        button.onclick = togglePanel;

        plugins.parentElement.insertBefore(button, plugins.nextSibling);
     }

    if(!localStorage.getItem('avia_click_sound_data')) return;
    document.querySelectorAll('a,div,button').forEach(e=>{
      if((e.$$click||e.onclick||((e.id?.includes('stoat-fake')||e.id?.includes('avia'))&&!e.id?.includes('panel')))
      &&!e.dataset.patched&&!e.firstChild?.dataset?.patched&&!e.parentElement?.dataset?.patched&&!e.textContent?.includes('Test')){
        e.addEventListener('click',async()=>{
          const sound = new Audio(`${localStorage.getItem('avia_click_sound_data')}`)
          if(!playing){
            playing = true
            sound.play().then(sound=>{
              playing=false
            })
          }
        });
        e.dataset.patched=true
      }
    })
  }

  const observer = new MutationObserver(() => {
    clickSounds();
  });

  function init() {
    clickSounds();
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