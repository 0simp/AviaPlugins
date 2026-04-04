(function () {
  if (window.__UPDATE_CHECKER__) return;
  window.__UPDATE_CHECKER__ = true;

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

  function runLocalPlugin(plugin) {
    stopLocalPlugin(plugin);
    try {
      const script = document.createElement("script");
      script.textContent = plugin.code || "";
      script.dataset.localPluginId = plugin.id;
      document.body.appendChild(script);
      runningLocalPlugins[plugin.id] = script;
      delete localPluginErrors[plugin.id];
    } catch (e) {
      localPluginErrors[plugin.id] = true;
    }
    renderLocalPanel();
  }

  function stopLocalPlugin(plugin) {
    const script = runningLocalPlugins[plugin.id];
    if (!script) return;
    script.remove();
    delete runningLocalPlugins[plugin.id];
    delete localPluginErrors[plugin.id];
    renderLocalPanel();
  }

  function styleLocalInput(input) {
    Object.assign(input.style, {
      padding: "6px 8px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.05)",
      color: "#fff",
      fontSize: "13px"
    });
  }

  function styleLocalBtn(btn, bg) {
    Object.assign(btn.style, {
      padding: "5px 12px",
      borderRadius: "8px",
      border: "none",
      background: bg || "rgba(255,255,255,0.08)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "12px",
      whiteSpace: "nowrap"
    });
    btn.onmouseenter = () => btn.style.opacity = "0.75";
    btn.onmouseleave = () => btn.style.opacity = "1";
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
      nameinput.parentElement.insertBefore(urlinput, nameinput.parentElement.lastChild);
    }

    const addbutton = nameinput.parentElement.lastChild;
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