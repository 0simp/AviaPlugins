(function () {
  if (window.__BETTER_CATEGORIES__) return;
  window.__BETTER_CATEGORIES__ = true;

  function betterCategories() {
    if(document.baseURI.includes('/server')){
      let categories = {};
      let ys = [];
      const fuckshit = document.getElementsByClassName('will-change_transform scr-bar-w_none [&::-webkit-scrollbar]:d_none ov-y_scroll').item(1)
      if(fuckshit){
        if(fuckshit.children[0].children.length){
          for(const child of fuckshit.children[0].children){
            if(child.children[0].children[0].children[0].tagName=='svg'){
              categories[child.children[0].textContent]=[{y:child.children[0].getBoundingClientRect().y,channels:[]}]
            }
          }

          const channellist = document.querySelectorAll('div[aria-disabled]').item(1)
          for(const child of channellist.children){
            for(const child2 of child.children){
              if(child2.getAttribute('role')){
                for(const child3 of child2.children){
                  const keys = Object.keys(categories)
                  for(const key of keys){
                    if(!ys.includes(categories[key][0].y)){
                      ys.push(categories[key][0].y)
                    }
                  }

                  let lowest = 99999;
                  ys.forEach(y=>{
                    if(child3.getBoundingClientRect().y-y<lowest&&child3.getBoundingClientRect().y-y>0){
                      lowest = child3.getBoundingClientRect().y-y
                    }
                  })

                  if(Object.entries(categories).find(entry=>entry[1][0].y+lowest==child3.getBoundingClientRect().y)){
                    const key = Object.entries(categories).find(entry=>entry[1][0].y+lowest==child3.getBoundingClientRect().y)[0]
                    categories[key][0].channels.push(child3)
                  }
                }
              }
            }
          }

          for(const child of fuckshit.children[0].children){
            if(child.children[0].children[0].children[0].tagName=='svg'){
              const oldClick = child.children[0].children[0].$$click
              const newClick = async function(){
                await oldClick()
                  const category = categories[child.children[0].children[0].textContent][0]
                  category.channels.forEach(channel=>{
                    if(!channel.style.display){
                      channel.style.setProperty('display','none')
                    }else{
                      channel.style.removeProperty('display')
                    }
                  }); 
              }

              if(oldClick!=newClick){
                child.children[0].children[0].$$click = newClick
              }
            }
          }
        }
      }
    }
  }

  const observer = new MutationObserver(() => {
    betterCategories();
  });

  function init() {
    betterCategories();
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