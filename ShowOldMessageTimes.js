(function () {
  if (window.__SHOW_OLD_MESSAGE_TIMES__) return;
  window.__SHOW_OLD_MESSAGE_TIMES__ = true;

  function showOldMessageTimes() {
    document.querySelectorAll('time').forEach(element=>{
        if(!element.parentElement.className&&!element.textContent.includes('at')){
            const datetime = element.getAttribute('datetime')
            element.textContent = element.textContent+` at ${datetime.substring(datetime.indexOf('T')+1,datetime.lastIndexOf(':'))}`
        }
    })
  }

  const observer = new MutationObserver(() => {
    showOldMessageTimes();
  });

  function init() {
    showOldMessageTimes();
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