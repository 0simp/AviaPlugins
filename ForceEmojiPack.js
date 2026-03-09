(function () {
  if (window.__FORCE_EMOJI_PACK__) return;
  window.__FORCE_EMOJI_PACK__ = true;
  const getEmojiPack = ()=> localStorage.getItem('emoji-pack')??'fluent-3d';

  function setEmojiPack(){
    const packs = ['fluent-3d','fluent-color','fluent-flat','mutant','noto','openmoji','twemoji']
    let pack;
    const list2 = document.querySelectorAll('mdui-select[variant="filled"]')
    for(let i=0; i<list2[2].childElementCount; i++){
      if(list2[2].children.item(i).selected){
        if(packs.includes(list2[2].children.item(i).value)){
          pack = `${list2[2].children.item(i).value}`
          localStorage.setItem('emoji-pack',`${pack}`)
        }
      }
    }
  }

  function apply() {
    let pack = getEmojiPack()
    const list = document.querySelectorAll('img[alt]')
    list.forEach(item=>{
        item.setAttribute('src',item.src.replace('fluent-3d',`${pack}`))
    });

    const list2 = document.querySelectorAll('mdui-select[variant="filled"]')
    if(list2[2]){
      setEmojiPack()
    }
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
})()