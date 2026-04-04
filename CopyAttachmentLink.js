(function () {
  if (window.__COPY_ATTACHMENT_LINK__) return;
  window.__COPY_ATTACHMENT_LINK__ = true;

  function apply() {
    const elements = document.querySelectorAll('div[class="d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial p_var(--gap-md) bdr_var(--borderRadius-md) c_var(--md-sys-color-inverse-on-surface) bg_var(--md-sys-color-inverse-surface) gap_var(--gap-md)"]')
    elements.forEach(element=>{
        const copyLinkButton = document.createElement('button')
        copyLinkButton.setAttribute('class','lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px')
        copyLinkButton.innerHTML = `
            <md-ripple aria-hidden="true"></md-ripple>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"></path></svg>
                </span>
            `;
        copyLinkButton.addEventListener('click',()=>{
            const toast = document.createElement('div')
            toast.textContent='Copied!'
            Object.assign(toast.style, {
                position: "absolute",
                bottom: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.85)",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "11px",
                opacity: "0",
                transition: "opacity 0.2s",
                pointerEvents: "none"
            });
            copyLinkButton.appendChild(toast);
            requestAnimationFrame(() => toast.style.opacity = "1");
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 200);
            }, 2000);

            navigator.clipboard.writeText(element.firstChild.childNodes.item(2).href)
        });
        if(!element.firstChild.children.item(3)){
            element.firstChild.appendChild(copyLinkButton)
        }
    });
  }

  const observer = new MutationObserver(() => {
    apply();
  });

  function init() {
    apply();
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
