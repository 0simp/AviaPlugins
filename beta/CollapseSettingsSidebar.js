(function () {
  if (window.__COPY_ATTACHMENT_LINK__) return;
  window.__COPY_ATTACHMENT_LINK__ = true;

  function apply() {
    const thing = document.getElementsByClassName('d_flex flex_1_0_218px pl_8px jc_flex-end').item(0).children[0].children[0].children[0]
    console.log(thing)
    const collapsebutton = document.createElement('div')
    collapsebutton.ariaLabel = 'Collapse'
    collapsebutton.innerHTML = `
        <svg stroke-width="0" color="currentColor" fill="currentColor" viewBox="0 0 24 24" size="20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
    `
    collapsebutton.addEventListener('click',()=>{
        document.getElementsByClassName('d_flex flex_1_0_218px pl_8px jc_flex-end').item(0).style.display ='none'
    });
    thing.insertBefore(collapsebutton,thing.children[0])
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
