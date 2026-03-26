(function () {
  if (window.__OFF_SCREEN_ATTACHMENTS_FIX__) return;
  window.__OFF_SCREEN_ATTACHMENTS_FIX__ = true;

  function offScreenAttachmentsFix() {
    const elements = document.querySelectorAll('div[class="d_flex flex-d_column flex-g_initial m_0 ai_initial jc_initial p_var(--gap-md) bdr_var(--borderRadius-md) c_var(--md-sys-color-inverse-on-surface) bg_var(--md-sys-color-inverse-surface) gap_var(--gap-md)"]')
    elements.forEach(element=>{
        if(element.children[0].children[1].children[0].textContent.includes(' ')){
            element.children[0].children[1].children[0].textContent = element.children[0].children[1].children[0].textContent.replaceAll(' ','-')
        }
    });
  }

  const observer = new MutationObserver(() => {
    offScreenAttachmentsFix();
  });

  function init() {
    offScreenAttachmentsFix();
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