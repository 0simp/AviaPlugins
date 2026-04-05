(function () {
  if (window.__UPDATE_CHECKER__) return;
  window.__UPDATE_CHECKER__ = true;

  function killme(){
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }

  const getLocalPlugins = () => JSON.parse(localStorage.getItem('avia_local_plugins') || "[]");
  const setLocalPlugins = (data) => localStorage.setItem('avia_local_plugins', JSON.stringify(data));
  const runningLocalPlugins = {};
  const localPluginErrors = {};
  const normalize = s => s.replace(/\r\n/g, '\n').trim();

  function enableEditorDrag(panel, handle) {
    let isDragging = false, offsetX, offsetY;
    handle.addEventListener("mousedown", e => {
      isDragging = true;
      offsetX = e.clientX - panel.offsetLeft;
      offsetY = e.clientY - panel.offsetTop;
      document.body.style.userSelect = "none";
    });
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
    document.addEventListener("mousemove", e => {
      if (!isDragging) return;
      panel.style.left = (e.clientX - offsetX) + "px";
      panel.style.top = (e.clientY - offsetY) + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
    });
  }

  function styleEditorBtn(btn, bg) {
    Object.assign(btn.style, {
      padding: "5px 14px",
      borderRadius: "8px",
      border: "none",
      background: bg || "rgba(255,255,255,0.1)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "500"
    });
    btn.onmouseenter = () => btn.style.opacity = "0.8";
    btn.onmouseleave = () => btn.style.opacity = "1";
  }

  function preloadMonaco() {
    return new Promise(resolve => {
      if (window.monaco) return resolve();
      const loader = document.createElement("script");
      loader.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js";
      loader.onload = function () {
        require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs" } });
        require(["vs/editor/editor.main"], () => resolve());
      };
      document.head.appendChild(loader);
    });
  }

  async function openEditorPanel(plugin, onSave) {
        await preloadMonaco();

        const existing = document.getElementById("avia-local-editor-panel");
        if (existing) existing.remove();

        const panel = document.createElement("div");
        panel.id = "avia-local-editor-panel";
        if(window.outerWidth<746){
            Object.assign(panel.style, {
                position: "fixed",
                bottom: "24px",
                left: "24px",
                width: `${window.outerWidth-66}px`,
                height: `${window.outerWidth-130}px`,
                background: "var(--md-sys-color-surface, #1e1e1e)",
                borderRadius: "16px",
                boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
                zIndex: "9999999",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)"
            });
        }else{
            Object.assign(panel.style, {
                position: "fixed",
                bottom: "24px",
                left: "24px",
                width: "680px",
                height: "460px",
                background: "var(--md-sys-color-surface, #1e1e1e)",
                borderRadius: "16px",
                boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
                zIndex: "9999999",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)"
            });
        }

        const header = document.createElement("div");
        header.textContent = `Editing: ${plugin.name}`;
        Object.assign(header.style, {
            padding: "14px 16px",
            fontWeight: "600",
            fontSize: "14px",
            background: "var(--md-sys-color-surface-container, rgba(255,255,255,0.04))",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            cursor: "move",
            color: "#fff",
            flex: "0 0 auto"
        });

        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        Object.assign(closeBtn.style, {
            position: "absolute",
            top: "12px",
            right: "16px",
            cursor: "pointer",
            opacity: "0.7",
            color: "#fff",
            zIndex: "1"
        });
        closeBtn.onmouseenter = () => closeBtn.style.opacity = "1";
        closeBtn.onmouseleave = () => closeBtn.style.opacity = "0.7";
        closeBtn.onclick = () => panel.remove();

        const clearBtn = document.createElement('div');
        clearBtn.textContent = 'Clear';
        Object.assign(clearBtn.style,{
            position:'absolute',
            top:'12px',
            right:'86px',
            cursor:'pointer',
            color:'#fff'
        });

        const pasteBtn = document.createElement('div');
        pasteBtn.textContent = 'Paste';
        Object.assign(pasteBtn.style,{
            position:'absolute',
            top:'12px',
            right:'36px',
            cursor:'pointer',
            color:'#fff'
        });

        pasteBtn.addEventListener('click',async ()=>{
            navigator.clipboard.readText().then(text=>{
                const value = monaco.editor.getEditors()[0].getValue()
                monaco.editor.getEditors()[0].setValue(value+'\n'+text)
            })
        });

        clearBtn.addEventListener('click',async ()=>{
            monaco.editor.getEditors()[0].setValue('')
        });

        const toolbar = document.createElement("div");
        Object.assign(toolbar.style, {
            padding: "8px 16px",
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flex: "0 0 auto"
        });

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "💾 Save";
        styleEditorBtn(saveBtn, "#2d6a4f");

        const saveRunBtn = document.createElement("button");
        saveRunBtn.textContent = "▶ Save & Run";
        styleEditorBtn(saveRunBtn, "#1b4332");

        toolbar.appendChild(saveBtn);
        toolbar.appendChild(saveRunBtn);

        const editorContainer = document.createElement("div");
        editorContainer.style.flex = "1";

        panel.appendChild(header);
        const mobile = await killme()
        if(mobile){
          panel.appendChild(clearBtn)
          panel.appendChild(pasteBtn)
        }
        panel.appendChild(closeBtn);
        panel.appendChild(toolbar);
        panel.appendChild(editorContainer);
        document.body.appendChild(panel);

        const editor = monaco.editor.create(editorContainer, {
            value: plugin.code || "// Write your plugin code here\n",
            language: "javascript",
            theme: "vs-dark",
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            wordWrap: "on"
        });

        saveBtn.onclick = () => {
            onSave(editor.getValue(), false);

            saveBtn.textContent = "✓ Saved";
            setTimeout(() => saveBtn.textContent = "💾 Save", 1200);
        };

        saveRunBtn.onclick = () => {
            onSave(editor.getValue(), true);
            saveRunBtn.textContent = "✓ Ran!";
            setTimeout(() => saveRunBtn.textContent = "▶ Save & Run", 1200);
        };

        enableEditorDrag(panel, header);
    }

  function renderLocalPanel() {
    const content = document.getElementById("avia-local-plugins-content");
    if (!content) return;
    content.innerHTML = "";
    const plugins = getLocalPlugins();

    if (plugins.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = "No local plugins yet. Add one above.";
      empty.style.opacity = "0.4";
      empty.style.fontSize = "13px";
      content.appendChild(empty);
      return;
    }

    plugins.forEach((plugin, index) => {
      const isRunning = plugin.enabled
      const hasError = localPluginErrors[plugin.id];

      const row = document.createElement("div");
      Object.assign(row.style, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
        padding: "10px 12px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)"
      });
      if(window.outerWidth<508){
          row.style.width = `${window.outerWidth-52}px`
      }

      const left = document.createElement("div");
      Object.assign(left.style, { display: "flex", alignItems: "center", gap: "10px" });

      const statusDot = document.createElement("div");
      Object.assign(statusDot.style, { width: "10px", height: "10px", borderRadius: "50%", flexShrink: "0" });
      if (hasError) {
        statusDot.style.background = "#ff4d4d";
        statusDot.style.boxShadow = "0 0 6px #ff4d4d";
      } else if (isRunning) {
        statusDot.style.background = "#4dff88";
        statusDot.style.boxShadow = "0 0 6px #4dff88";
      } else {
        statusDot.style.background = "#777";
      }

      const name = document.createElement("div");
      name.textContent = plugin.name;
      name.style.fontSize = "13px";

      left.appendChild(statusDot);
      left.appendChild(name);

      const controls = document.createElement("div");
      Object.assign(controls.style, { display: "flex", gap: "6px" });

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏ Edit";
      styleLocalBtn(editBtn, "rgba(100,140,255,0.2)");
      editBtn.onclick = () => {
        openEditorPanel(plugin, (newCode, andRun) => {
          const all = getLocalPlugins();
          const target = all.find(p => p.id === plugin.id);
          if (target) {
            target.code = newCode;
            plugin.code = newCode;
            setLocalPlugins(all);
          }
          if (andRun) {
            plugin.enabled = true;
            if (target) target.enabled = true;
            setLocalPlugins(getLocalPlugins().map(p => p.id === plugin.id ? { ...p, code: newCode, enabled: true } : p));
            runLocalPlugin(plugin);
          }
          renderLocalPanel();
        });
      };

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = plugin.enabled ? "Disable" : "Enable";
      styleLocalBtn(toggleBtn);
      toggleBtn.onclick = () => {
        const all = getLocalPlugins();
        const target = all.find(p => p.id === plugin.id);
        if (!target) return;
        target.enabled = !target.enabled;
        plugin.enabled = target.enabled;
        setLocalPlugins(all);
        if (target.enabled) runLocalPlugin(plugin);
        else stopLocalPlugin(plugin);
        renderLocalPanel();
      };

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "✕";
      styleLocalBtn(removeBtn, "rgba(255,80,80,0.15)");
      removeBtn.onclick = () => {
        stopLocalPlugin(plugin);
        const editorPanel = document.getElementById("avia-local-editor-panel");
        if (editorPanel) editorPanel.remove();
        const all = getLocalPlugins();
        all.splice(all.findIndex(p => p.id === plugin.id), 1);
        setLocalPlugins(all);
        renderLocalPanel();
      };

      controls.appendChild(editBtn);
      controls.appendChild(toggleBtn);
      controls.appendChild(removeBtn);
      row.appendChild(left);
      row.appendChild(controls);
      content.appendChild(row);
    });
  }

  function addUrlInput() {
    const localpluginspanel = document.getElementById('avia-local-plugins-panel');
    if (!localpluginspanel) return;
    const nameinput = document.querySelector('input[placeholder=\'Plugin name\']');
    if (!nameinput) return;
    nameinput.style.setProperty('width', `${nameinput.clientWidth / 2}px`);
    const urlinput = nameinput.cloneNode(true);
    urlinput.setAttribute('placeholder', 'Plugin URL');
    urlinput.id = 'localurlinput';

    if (!document.getElementById('localurlinput')) {
      nameinput.parentElement.insertBefore(urlinput, nameinput.nextSibling);
    }

    let addbutton;
    for(const child of nameinput.parentElement.children){
      if(child.textContent=='+ New'){
        addbutton = child
      }
    }
    addbutton.onclick = function () {
      const urlinput = document.getElementById('localurlinput');
      const name = nameinput.value.trim();
      const url = urlinput.value.trim();
      if (!name || !url) return;

      fetch(url).then(res => res.text()).then(fetchedCode => {
        const plugins = JSON.parse(localStorage.getItem('avia_local_plugins') || "[]");
        const newPlugin = {
          id: "local_" + Date.now(),
          name,
          code: fetchedCode,
          url: url,
          enabled: false
        };
        plugins.push(newPlugin);
        localStorage.setItem('avia_local_plugins', JSON.stringify(plugins));
        nameinput.value = "";
        urlinput.value = "";
        renderLocalPanel();
      }).catch(() => {
        const plugins = JSON.parse(localStorage.getItem('avia_local_plugins') || "[]");
        plugins.push({ id: "local_" + Date.now(), name, code: "// " + name + "\n", url, enabled: false });
        localStorage.setItem('avia_local_plugins', JSON.stringify(plugins));
        nameinput.value = "";
        urlinput.value = "";
        renderLocalPanel();
      });
    };
  }

  function updateChecker() {
    const localpluginspanel = document.getElementById('avia-local-plugins-panel');
    if (!localpluginspanel) return;
    addUrlInput();
    if (!localpluginspanel.children[3].firstChild) return;

    let fuck = 0;
    for (const child of localpluginspanel.children[3].children) {
      fuck = fuck + 1;
      const button = child.children[1].lastChild;
      if (!button) return;
      const clone = button.cloneNode(true);
      clone.id = `updatebutton${fuck}`;
      clone.textContent = '↑';
      clone.style.setProperty('background', 'rgba(0, 200, 0, 0.25)');
      clone.onclick = function(){
        const text = clone.parentElement.parentElement.firstChild.lastChild;
        const textclone = text.cloneNode(true);
        textclone.id = `updatetext${fuck}`;

        if (!document.getElementById(`updatetext${fuck}`)) {
          text.parentElement.appendChild(textclone);
        }

        const pluginname = clone.parentElement.previousSibling.children[1].textContent;
        const plugin = JSON.parse(localStorage.getItem('avia_local_plugins')).find(pl => pl.name == pluginname);
        if (!plugin.url) {
          textclone.textContent = 'No url found, cannot check for updates';
          textclone.style.setProperty('color', 'red');
          setTimeout(() => textclone.remove(), 5000);
          return;
        }

        textclone.textContent = 'Checking for updates...';
        const plugincode = plugin.code;
        fetch(plugin.url).then(res => {
          if (res.ok) {
            res.text().then(fetchedText => {
              if (normalize(fetchedText) !== normalize(plugincode)) {
                textclone.textContent = 'Update available!';
                const oldclick = clone.onclick
                clone.textContent='↓'
                clone.onclick = function(){
                  const plugins = getLocalPlugins()
                  plugins.splice(plugins.indexOf(plugin))
                  plugin.code = fetchedText
                  plugins.push(plugin)
                  setLocalPlugins(plugins)
                  console.log(textclone)
                  textclone.textContent = 'Update installed, restart to apply!';
                  if (!document.getElementById(`updatetext${fuck}`)) {
                    text.parentElement.appendChild(textclone);
                  }
                  setTimeout(() => textclone.remove(), 5000);
                  clone.textContent = '↑';
                  clone.onclick = oldclick
                }
              } else {
                textclone.textContent = "You're up to date!";
              }
            });
          } else {
            textclone.textContent = `Couldn't check for updates: Error ${res.status} ${res.statusText}`;
            textclone.style.setProperty('color', 'red');
          }
          setTimeout(() => textclone.remove(), 5000);
        });
      }

      if (!document.getElementById(`updatebutton${fuck}`)) {
        button.parentElement.insertBefore(clone, button);
      }
    }
  }

  const observer = new MutationObserver(() => {
    updateChecker();
  });

  function init() {
    updateChecker();
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