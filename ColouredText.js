(function () {
  if (window.__COLOURED_TEXT__) return;
  window.__COLOURED_TEXT__ = true;
  if(!localStorage.getItem('colourtext-show-chatbar-btn')){
    localStorage.setItem('colourtext-show-chatbar-btn','true')
  }

  let colourlist = JSON.parse(localStorage.getItem('avia_colour_list')||'[]')
  let showchatbarbutton = localStorage.getItem('colourtext-show-chatbar-btn')!=='false'
  let registered = false;

  function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  function isHex(num) {
    return Boolean(num.match(/^0x[0-9a-f]+$/i))
  }

  function togglePanel(){
    let panel = document.getElementById("avia-colour-panel");

    if (panel) {
        panel.style.display = panel.style.display === "none" ? "flex" : "none";
        return;
    }

    panel = document.createElement("div");
    panel.id = "avia-colour-panel";

    Object.assign(panel.style, {
        position: "fixed",
        bottom: "40px",
        right: "40px",
        width: "380px",
        height: "500px",
        background: "#1e1e1e",
        color: "#fff",
        borderRadius: "20px",
        boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)"
    });

    const header = document.createElement("div");
    header.textContent = "Colour text";

    Object.assign(header.style, {
        padding: "18px",
        fontWeight: "600",
        fontSize: "16px",
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        cursor: "move",
        position: "relative",
        textAlign: "center",
        userSelect: "none"
    });

    let isDragging = false, offsetX = 0, offsetY = 0;
    header.addEventListener("mousedown", e => {
        isDragging = true;
        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        panel.style.bottom = "auto";
        panel.style.right = "auto";
        panel.style.left = rect.left + "px";
        panel.style.top = rect.top + "px";
        document.body.style.userSelect = "none";
    });
    document.addEventListener("mousemove", e => {
        if (!isDragging) return;
        panel.style.left = e.clientX - offsetX + "px";
        panel.style.top = e.clientY - offsetY + "px";
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "";
    });

    const close = document.createElement("div");
    close.textContent = "✕";
    Object.assign(close.style, {
        position: "absolute",
        right: "18px",
        top: "16px",
        cursor: "pointer"
    });
    close.onclick = () => panel.style.display = "none";
    header.appendChild(close);

    const container = document.createElement("div");
    Object.assign(container.style, { flex: "1", overflowY: "auto", padding: "18px" });

    const checkbox = document.createElement('mdui-checkbox')
    checkbox.textContent='Show chatbar button'

    if(showchatbarbutton){
        checkbox.checked=true
    }

    checkbox.onchange = function(e){
        localStorage.setItem('colourtext-show-chatbar-btn',`${!showchatbarbutton}`)
        showchatbarbutton = localStorage.getItem('colourtext-show-chatbar-btn')!=='false'
        if(showchatbarbutton==false&&document.getElementById('avia-colourtext-btn')){
            document.getElementById('avia-colourtext-btn').remove()
        }
    }

    const colourInput = document.createElement("input");
    colourInput.placeholder = "Hex colour code";
    Object.assign(colourInput.style, { width: "100%", marginBottom: "6px", padding: "6px", borderRadius: "6px", border: "none" });

    colourInput.onkeydown = function(e){
        if(e.key=='Enter'){
            addBtn.click()
        }
    }

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add colour";
    Object.assign(addBtn.style, { width: "100%", padding: "6px", borderRadius: "6px", marginBottom: "12px", cursor: "pointer" });

    addBtn.onclick = () => {
        const colour = colourInput.value.trim();
        if (!colour||!isHex(`0x${colour}`)||colour.length!==6) return;
        colourlist.push({ colour:colour});
        localStorage.setItem('avia_colour_list', JSON.stringify(colourlist));
        renderColourList();
        colourInput.value=''
    };

    container.appendChild(checkbox)
    container.appendChild(colourInput);
    container.appendChild(addBtn);

    const listWrapper = document.createElement("div");
    container.appendChild(listWrapper);

    function renderColourList() {
        listWrapper.innerHTML = "";
        colourlist = JSON.parse(localStorage.getItem('avia_colour_list') || "[]");
        colourlist.forEach((c, i) => {
            const row = document.createElement("div");
            Object.assign(row.style, { display: "flex", alignItems: "center", marginBottom: "6px" });

            const btn = document.createElement("button");
            btn.style.flex = "1";
            btn.style.padding = "6px";
            btn.style.borderRadius = "6px";
            btn.style.border = "none";
            btn.style.cursor = "pointer";
            btn.style.display = "flex";
            btn.style.alignItems = "center";
            btn.style.gap = "8px";
            btn.style.position = "relative";
            btn.style.background = "rgba(255,255,255,0.08)";

            const rgb = hexToRgb(c.colour)

            const colourdiv = document.createElement('div')
            colourdiv.className='w_16px h_16px asp_1/1 bdr_100%'
            colourdiv.style.background=`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`

            const nameSpan = document.createElement("span");
            nameSpan.textContent = `#${c.colour}`;
            nameSpan.style.flex = "1";

            btn.appendChild(colourdiv);
            btn.appendChild(nameSpan);

            btn.onclick = () => {
                colourInput.placeholder='Enter text...'
                colourInput.style.color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                addBtn.textContent='Set'
                const oldclick = addBtn.onclick
                addBtn.onclick = function(){
                    const text = colourInput.value.trim();
                    const lines = [...document.getElementsByClassName('cm-line')]
                    if(lines.length&&text){
                        const line = lines[lines.length-1]
                        const placeholder = line.parentElement.ariaPlaceholder
                        if(line.textContent==placeholder){
                            line.textContent = `$$\\color{#${c.colour}}\\textsf{${text}}$$`
                        }else{
                            line.textContent = line.textContent+` $$\\color{#${c.colour}}\\textsf{${text}}$$`
                        }
                    }
                    colourInput.value=''
                    colourInput.placeholder='Hex colour code'
                    colourInput.style.removeProperty('color')
                    addBtn.textContent='Add colour'
                    addBtn.onclick = oldclick
                }
            };

            const delBtn = document.createElement("button");
            delBtn.textContent = "✕";
            Object.assign(delBtn.style, { marginLeft: "6px", cursor: "pointer" });
            delBtn.onclick = () => {
                colourlist.splice(i, 1);
                localStorage.setItem('avia_colour_list', JSON.stringify(colourlist));
                renderColourList();
            };

            row.appendChild(btn);
            row.appendChild(delBtn);
            listWrapper.appendChild(row);
        });
    }

    renderColourList();

    panel.appendChild(header);
    panel.appendChild(container);
    document.body.appendChild(panel);
  }

  function registerWithAviaMenu() {
    if(registered) return;
    if (window.AviaMenu) {
        window.AviaMenu.register({ id: "avia-colourtext-btn", name: "Colour text", icon: "palette", onClick: togglePanel });
        registered=true
    } else {
        const interval = setInterval(() => {
            if (window.AviaMenu) {
                clearInterval(interval);
                window.AviaMenu.register({ id: "avia-colourtext-btn", name: "Colour text", icon: "palette", onClick: togglePanel });
                registered=true
            }
        }, 100);
    }
  }

  function colouredText() {
    const gifSpan = [...document.querySelectorAll("span.material-symbols-outlined")]
        .find(s => s.textContent.trim() === "gif");
    if (!gifSpan) return;

    const wrapper = gifSpan.closest("div.flex-sh_0");
    if (!wrapper) return;

    const clone = wrapper.cloneNode(true);
    clone.id = "avia-colourtext-btn";

    const btn = clone.querySelector("button");
    btn.onclick = togglePanel;

    const spanIcon = clone.querySelector("span.material-symbols-outlined");

    spanIcon.textContent = "palette";
    spanIcon.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
    spanIcon.style.color = "#e3e3e3";

    if(showchatbarbutton){
        if(!document.getElementById('avia-colourtext-btn')){
            wrapper.parentElement.insertBefore(clone, wrapper.nextSibling)
            registerWithAviaMenu()
        }
    }else{
        registerWithAviaMenu()
    }
  }

  const observer = new MutationObserver(() => {
    colouredText();
  });

  function init() {
    colouredText();
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