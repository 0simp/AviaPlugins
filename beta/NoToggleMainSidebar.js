(function () {
    if (window.__NO_TOGGLE_MAIN_SIDEBAR__) return;
    window.__NO_TOGGLE_MAIN_SIDEBAR__ = true;

    function NoToggleMainSidebar() {
        const original = document.querySelector('div[aria-label="Toggle main sidebar"]');
        if (!original) return;

        const parent = original.parentElement;
        let text = parent.outerText.substring(parent.outerText.lastIndexOf('\n') + 1);
        if(text=='note_stack'){
            text = 'Saved notes'
            parent.removeChild(original.nextSibling)
        }
        if(text=='alternate_email'){
            text = parent.parentElement.children[1].children[0].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[1].outerText.substring(7)
            parent.removeChild(original.nextSibling)
        }
        const existing = document.getElementById('togglemainsidebar');
        if (existing) {
            const textNode = existing.children[1].nextSibling;
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = text;
            } else {
                existing.children[1].insertAdjacentText('afterend', text);
            }
            parent.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    node.remove();
                }
            });
            return;
        }

        const clone = original.cloneNode(true);
        const click = original.$$click;
        clone.onclick = click;
        clone.id = 'togglemainsidebar';
        clone.children[1].insertAdjacentText('afterend', text);
        parent.replaceChild(clone, original);
        parent.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                node.remove();
            }
        });
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
