/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/ChunkyMembers.js
  @VERSION: 1.0
*/

(function () {
  if (window.__CHUNKY_MEMBERS__) return;
  window.__CHUNKY_MEMBERS__ = true;

  function chunkyMembers() {
    const memberlistvirtualcontainer = document.querySelector(`div[class*='virtual-container']:has(div>div>svg>circle[fill*='var(--brand-presence'])`)
    if(!memberlistvirtualcontainer) return;
    const memberlist = memberlistvirtualcontainer.offsetParent
    if(!memberlist) return;
    if(!memberlist.style.width||Number(memberlist.style.width.replace('px',''))<memberlist.previousSibling.clientWidth){
      memberlist.style.width = `${memberlist.clientWidth+memberlist.previousSibling.clientWidth}px`
    }
  }

  const observer = new MutationObserver(() => {
    chunkyMembers();
  });

  function init() {
    chunkyMembers();
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