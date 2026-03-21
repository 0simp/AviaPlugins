(function () {
    if (window.__NO_TOGGLE_MAIN_SIDEBAR__) return;
    window.__NO_TOGGLE_MAIN_SIDEBAR__ = true;

    function NoToggleMainSidebar() {
        const original = document.querySelector('div[aria-label="Toggle main sidebar"]')
        if(original){
            const clone = original.cloneNode(true)
            const click = original.$$click
            clone.onclick=click
            clone.id='togglemainsidebar'
            const parent = original.parentElement
            if(!document.getElementById('togglemainsidebar')){
                parent.removeChild(original)
                parent.insertBefore(clone,parent.firstChild)
            }
        }
    }

    const observer = new MutationObserver(() => {
        NoToggleMainSidebar();
    });

    function init() {
        NoToggleMainSidebar();
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
