/*
  @UPDATEURL: https://codeberg.org/0simp/AviaPlugins/raw/branch/main/CopyRoleId.js
  @VERSION: 1.0
*/

(function () {
  if (window.__COPY_ROLE_ID__) return;
  window.__COPY_ROLE_ID__ = true;
  let roleids = [];
  let members = {};
  let roles = {};
  let users = [];
  let username = '';

  function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  const originalFetch = window.fetch.bind(window);

  window.fetch = async function (resource, config = {}) {
      try {
          const url = resource?.toString?.() || "";
          if (config.method === "GET" &&url.includes("/members")&&!roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))]){
                if(roleids.length){
                  roleids = []
              }

              const res = await originalFetch(resource,config)
              try {
                  const json = await res.json()
                  json.members.forEach(member=>{
                      if(!members[member._id.server]){
                          members[member._id.server] = []
                          roles[member._id.server] = []
                      }
                      members[member._id.server].push(member)

                      member.roles?.forEach(async role=>{
                          if(!roleids.includes(role)){
                              roleids.push(role)
                          }
                      })
                  })

                  json.users.forEach(user=>{
                    if(!users.find(u=>u.id==user._id)){
                      users.push(user)
                    }
                  })

                  roleids.forEach(async id=>{
                        const res = await originalFetch(`https://stoat.chat/api/servers/${url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))}/roles/${id}`,config)
                            
                        try {
                            const json = await res.json()
                            if(json._id){
                                if(!roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))]){
                                    roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))] = []
                                }
                                roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))].push(json)
                                const fuckyshit = roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))]
                                const sortedroles = fuckyshit.sort((a, b) => {
                                    const rankA = a.rank; 
                                    const rankB = b.rank; 
                                    if (rankA < rankB) {
                                        return -1;
                                    }
                                    if (rankA > rankB) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                roles[url.substring(url.indexOf('/servers/')+9,url.indexOf('/members'))] = sortedroles
                              }
                            } catch (error) {
                                
                            }
                });
              } catch (error) {
                        
              }
          }
        } catch (e) { console.log(e); }
        return originalFetch(resource, config)
    };

  function CopyRoleId() {
    if(document.baseURI.includes('/server')){
      const usernameelement = document.querySelector(`[aria-label='Click to copy username']`)
      if(usernameelement){
        username = usernameelement.textContent
      }

      const modal = [...document.getElementsByClassName('dialog')].find(e=>e.textContent.includes(`${username.substring(0,username.length-5)}'s`)
      &&e.querySelector(`div:has(>div>div>div[style*='background'])`))

      if(!modal) return;
      modal.querySelectorAll(`div:has(>div[style*='background'])`).forEach(e=>{
          const button = document.createElement('button')
          button.style.cursor='pointer'
          button.textContent='Copy role ID'
          button.onclick = function(){
            const toast = document.createElement('div')
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

            let role;
            const serverid = document.baseURI.substring(document.baseURI.indexOf('server/')+7,document.baseURI.indexOf('/channel'))
            const user = users.find(user=>user.username+`#`+`${user.discriminator}`==username)
            if(user&&members[serverid]){
              const member = members[serverid].find(member=>member._id.user==user._id)
              if(member){
                const memberroles = roles[serverid].filter(role=>member.roles?.includes(role._id))
                role = memberroles[[...button.parentElement.parentElement.children].indexOf(button.parentElement)]
                toast.textContent='Copied role id!'
                navigator.clipboard.writeText(role._id).catch(err=>{
                  toast.textContent='Couldn\'t copy role id'
                  toast.style.color='red'
                });
              }else{
                toast.textContent='Couldn\'t copy role id'
                toast.style.color='red'
              }
            }else{
              toast.textContent='Couldn\'t copy role id'
              toast.style.color='red'
            }

            button.appendChild(toast)
            requestAnimationFrame(() => toast.style.opacity = "1");
            setTimeout(() => {
              toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 200);
            }, 2000);
          }
          if(!e.querySelector(`button`)){
            e.appendChild(button)
          }
      })
    }
  }

  const observer = new MutationObserver(() => {
    CopyRoleId();
  });

  function init() {
    CopyRoleId();
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