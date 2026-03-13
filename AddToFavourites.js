(function () {
  if (window.__ADD_TO_FAVOURITES__) return;
  window.__ADD_TO_FAVOURITES__ = true;

  function apply() {
    document.querySelectorAll('div[class=\'z_999 d_flex gap_var(--gap-md) p_var(--gap-md) bdr_var(--borderRadius-lg) bg_var(--md-sys-color-surface) c_var(--md-sys-color-on-surface)\']').forEach(element=>{
      if(element.childElementCount===4&&element.parentElement.parentElement.parentElement.children[1].tagName==='IMG'){
        const favouriteButton = document.createElement('button')
        favouriteButton.setAttribute('class','lh_1.25rem fs_0.875rem ls_0.015625rem fw_500 pos_relative asp_1/1 flex-sh_0 d_flex ai_center jc_center ff_inherit cursor_pointer bd_none trs_var(--transitions-fast)_all c_var(--colour) fill_var(--colour) --colour_var(--md-sys-color-on-surface-variant) bdr_var(--borderRadius-full) h_40px px_8px')
        favouriteButton.innerHTML = `
            <md-ripple aria-hidden="true"></md-ripple>
            <span aria-hidden="true" class="material-symbols-outlined fs_inherit fw_undefined!" style="display: block; font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0;">star</span>
        `

        favouriteButton.addEventListener('click',()=>{
          if(localStorage.getItem('avia_favorites')){
            let favourites = JSON.parse(localStorage.getItem('avia_favorites'))
            favourites.push({
              'url':`${element.parentElement.parentElement.parentElement.children[1].src}`,
              'title':``,
              'addedAt':Date.now()
            })
            localStorage.setItem('avia_favorites',JSON.stringify(favourites))
          }else{
            let favourites = [];
            favourites.push({
              'url':`${element.parentElement.parentElement.parentElement.children[1].src}`,
              'title':``,
              'addedAt':Date.now()
            })
            localStorage.setItem('avia_favorites',JSON.stringify(favourites))
          }
        });

        element.appendChild(favouriteButton)
      }
    })
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