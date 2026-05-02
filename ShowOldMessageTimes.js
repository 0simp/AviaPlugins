(function () {
  if (window.__SHOW_OLD_MESSAGE_TIMES__) return;
  window.__SHOW_OLD_MESSAGE_TIMES__ = true;

  function showOldMessageTimes() {
    document.querySelectorAll('time').forEach(element=>{
      let timestamp = element.outerHTML;
      timestamp = timestamp.substring(timestamp?.indexOf('"')+1,timestamp?.lastIndexOf('"'))
      timestamp = Math.floor(new Date(timestamp).getTime())
      const date = new Date(timestamp)
      const time = date.toString().substring(16,date.toString().lastIndexOf(':'))
        if(!element.parentElement.className&&!element.textContent.includes(`${time}`)){
            element.textContent = element.textContent+` at ${time}`
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