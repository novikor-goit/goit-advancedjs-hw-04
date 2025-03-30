import{a as c,S as y,i as u}from"./assets/vendor-CjwUT-lV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const p="49490613-8cd40a9bd53e95e64061d42d8";c.defaults.baseURL="https://pixabay.com/api";c.defaults.params={key:p};async function L(r,t,a=15){var e;const o=await c.get("/",{params:{q:r,page:t,image_type:"photo",orientation:"horizontal",per_page:a,safesearch:!0}});if(!((e=o.data)!=null&&e.hits.length))throw new Error("Sorry, there are no images matching your search query. Please try again!");return{images:o.data.hits,pages:Math.ceil(o.data.totalHits/a)}}function d(){document.querySelector(".loader").classList.toggle("active")}const g=new y("#gallery a",{captionsData:"alt",captionDelay:250}),f=document.querySelector("#gallery");function m(r){return r.map(t=>`<li class="gallery-item">
              <a href="${t.largeImageURL}"><img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}"/></a>
              <ul class="gallery-item-desc">
                <li>
                  <h3>Likes</h3>
                  <p>${t.likes}</p>
                </li>
                <li>
                  <h3>Views</h3>
                  <p>${t.views}</p>
                </li>
                <li>
                  <h3>Comments</h3>
                  <p>${t.comments}</p>
                </li>
                <li>
                  <h3>Downloads</h3>
                  <p>${t.downloads}</p>
                </li>
              </ul>
        </li>`).join("")}function w(r){f.innerHTML=m(r),g.refresh()}function b(r){f.insertAdjacentHTML("beforeend",m(r)),g.refresh();const a=document.querySelector("li.gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:a,behavior:"smooth"})}const l=document.getElementById("search-form"),n=document.getElementById("load-more");l.addEventListener("submit",async r=>{r.preventDefault(),await v(l.elements.query.value),l.reset()});n.addEventListener("click",S);async function h({query:r,page:t=1},a){d();try{const o=await L(r,t);a(o)}catch(o){throw u.error({message:o.message}),o}finally{d()}}async function v(r){return h({query:r},({images:t,pages:a})=>{w(t),n.hidden=a<=1,n.dataset.query=r,n.dataset.page=String(2)})}async function S(){const{query:r,page:t}=n.dataset;await h({query:r,page:Number(t)},({images:a,pages:o})=>{b(a);const e=Number(t)+1;n.dataset.page=String(e),console.log(e,o),e>o&&(n.hidden=!0,u.info({message:"We're sorry, but you've reached the end of search results."}))})}
//# sourceMappingURL=index.js.map
