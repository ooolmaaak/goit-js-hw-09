const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body.style;t.style.padding="10px 20px",t.style.fontSize="16px",e.style.padding="10px 20px",e.style.fontSize="16px";let a=null;const l=()=>`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.addEventListener("click",()=>{e.disabled=!1,t.disabled=!0,n()}),e.addEventListener("click",()=>{t.disabled=!1,e.disabled=!0,o()});const n=()=>{a=setInterval(()=>{d.backgroundColor=l()},1e3)},o=()=>{clearInterval(a)};
//# sourceMappingURL=01-color-switcher.3fb23883.js.map