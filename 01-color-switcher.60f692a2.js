!function(){let e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.body.style;e.style.padding="10px 20px",e.style.fontSize="16px",t.style.padding="10px 20px",t.style.fontSize="16px";let l=null,a=()=>`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;e.addEventListener("click",()=>{t.disabled=!1,e.disabled=!0,n()}),t.addEventListener("click",()=>{e.disabled=!1,t.disabled=!0,o()});let n=()=>{l=setInterval(()=>{d.backgroundColor=a()},1e3)},o=()=>{clearInterval(l)}}();
//# sourceMappingURL=01-color-switcher.60f692a2.js.map