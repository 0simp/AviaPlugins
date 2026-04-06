(function () {
  if (window.__UPDATE_CHECKER__) return;
  window.__UPDATE_CHECKER__ = true;
  const normalize = s => s.replace(/\r\n/g, '\n').trim();

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
    const oldclick = addbutton.onclick
    addbutton.onclick = function () {
      oldclick()
      const urlinput = document.getElementById('localurlinput');
      const url = urlinput.value.trim();
      if(!url) return;

      fetch(url).then(res => res.text()).then(fetchedCode => {
        const plugins = JSON.parse(localStorage.getItem('avia_local_plugins') || "[]");
        const plugin = plugins[plugins.length-1]
        plugin.code = fetchedCode
        plugin.url = url
        plugins.splice(plugins.indexOf(plugin),1)
        plugins.push(plugin);
        localStorage.setItem('avia_local_plugins', JSON.stringify(plugins));
        urlinput.value = "";
      }).catch(() => {
        
      });
    };
  }

  function bigblackballs(){
    const localpluginspanel = document.getElementById('avia-local-plugins-panel');
    if (!localpluginspanel) return;
    for(const child of localpluginspanel.children[3].children){
      let fuckingendme = child
      const fuckityfuckfuck = fuckingendme.lastChild.firstChild.onclick
        fuckingendme.lastChild.firstChild.onclick = async function(){
          await fuckityfuckfuck()
          const editor = monaco.editor.getEditors()[0]
          const plugins = JSON.parse(localStorage.getItem('avia_local_plugins') || "[]");
          const pluginname = child.firstChild.textContent
          const plugin = plugins.find(pl=>pl.name==pluginname)
          editor.setValue(plugin.code)
        }
    }
  }

  function fuck(){
    const localpluginspanel = document.getElementById('avia-local-plugins-panel');
    if (!localpluginspanel) return;
    for(const child of localpluginspanel.children[3].children){
      let fuckingendme = child
      const fuckityfuckfuck = fuckingendme.lastChild.children[1].onclick
        fuckingendme.lastChild.children[1].onclick = async function(){
          await fuckityfuckfuck()
          const plugins = JSON.parse(localStorage.getItem('avia_local_plugins') || "[]");
          const pluginname = child.firstChild.textContent
          const plugin = plugins.find(pl=>pl.name==pluginname)
          let pluginscript;
          const scripts = document.querySelectorAll('script')
          scripts.forEach(script=>{
            if(script.text.includes(`${plugin.name}`)){
              pluginscript = script
            }
          })
          if(pluginscript){
            pluginscript.remove()
            const fuckshit = document.createElement('script')
            fuckshit.textContent = plugin.code || "";
            fuckshit.dataset.localPluginId = plugin.id;
            document.body.appendChild(fuckshit);
          }
        }
    }
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
        const plugins = JSON.parse(localStorage.getItem('avia_local_plugins'))
        const text = clone.parentElement.parentElement.firstChild.lastChild;
        const textclone = text.cloneNode(true);
        textclone.id = `updatetext${fuck}`;

        if (!document.getElementById(`updatetext${fuck}`)) {
          text.parentElement.appendChild(textclone);
        }

        const pluginname = clone.parentElement.previousSibling.children[1].textContent;
        const plugin = plugins.find(pl => pl.name == pluginname);
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
                  const plugins = JSON.parse(localStorage.getItem('avia_local_plugins'))
                  plugins.splice(plugins.indexOf(plugin))
                  plugin.code = fetchedText
                  plugins.push(plugin)
                  localStorage.setItem('avia_local_plugins', JSON.stringify(plugins));
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
    fuck();
    bigblackballs();
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