(function () {
  if (window.__SLOWMODE__) return;
  window.__SLOWMODE__ = true;

  function SlowMode() {
    const descriptionbox = document.querySelector('mdui-text-field[name=\'description\']')
    if(!descriptionbox) return;
    const clone = descriptionbox.cloneNode(true)
    clone.setAttribute('label','Slowmode')
    clone.setAttribute('maxlength','5')
    clone.setAttribute('placeholder','0-21600')
    clone.setAttribute('name','slowmode')
    if(!document.querySelector('mdui-text-field[name=\'slowmode\']')){
        descriptionbox.parentElement.insertBefore(clone,descriptionbox.nextSibling)

        const originalFetch = window.fetch.bind(window);

        window.fetch = async function (resource, config = {}) {
            try {
                const url = resource?.toString?.() || "";
                if (
                    config.method === "PATCH" &&
                    url.includes("/channels/") &&
                    config.body &&
                    typeof config.body === "string"
                ) {
                    const slowmodebox = document.querySelector('mdui-text-field[name=\'slowmode\']')
                    if(slowmodebox&&slowmodebox.value){
                        const number = Number(slowmodebox.value)
                        if(!isNaN(Number(number))&&number==Math.trunc(number)&&number>=0&&number<=21600){
                            const parsed = JSON.parse(config.body);
                            if (parsed) {
                                parsed.slowmode = number
                                config = { ...config, body: JSON.stringify(parsed) };
                                console.log(config)
                                slowmodebox.value=''
                            }
                        }
                    }
                }
            } catch (e) { console.log(e); }
            return originalFetch(resource, config);
        };
    }
  }

  const observer = new MutationObserver(() => {
    SlowMode();
  });

  function init() {
    SlowMode();
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