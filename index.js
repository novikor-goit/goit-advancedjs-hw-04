import{a as c,S as p,i as u}from"./assets/vendor-CjwUT-lV.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const y="49490613-8cd40a9bd53e95e64061d42d8";c.defaults.baseURL="https://pixabay.com/api";c.defaults.params={key:y};async function L(r,e,o=15){var t;const a=await c.get("/",{params:{q:r,page:e,image_type:"photo",orientation:"horizontal",per_page:o,safesearch:!0}});if(!((t=a.data)!=null&&t.hits.length))throw new Error("Sorry, there are no images matching your search query. Please try again!");return{images:a.data.hits,pages:Math.ceil(a.data.totalHits/o)}}function d(){document.querySelector(".loader").classList.toggle("active")}const g=new p("#gallery a",{captionsData:"alt",captionDelay:250}),f=document.querySelector("#gallery");function m(r){return r.map(e=>`<li class="gallery-item">
              <a href="${e.largeImageURL}"><img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}"/></a>
              <ul class="gallery-item-desc">
                <li>
                  <h3>Likes</h3>
                  <p>${e.likes}</p>
                </li>
                <li>
                  <h3>Views</h3>
                  <p>${e.views}</p>
                </li>
                <li>
                  <h3>Comments</h3>
                  <p>${e.comments}</p>
                </li>
                <li>
                  <h3>Downloads</h3>
                  <p>${e.downloads}</p>
                </li>
              </ul>
        </li>`).join("")}function w(r){f.innerHTML=m(r),g.refresh()}function b(r){f.insertAdjacentHTML("beforeend",m(r)),g.refresh();const o=document.querySelector("li.gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:o,behavior:"smooth"})}const l=document.getElementById("search-form"),n=document.getElementById("load-more");l.addEventListener("submit",async r=>{r.preventDefault(),await v(l.elements.query.value),l.reset()});n.addEventListener("click",S);async function h({query:r,page:e=1},o){d();try{const a=await L(r,e);o(a)}catch(a){throw u.error({message:a.message}),a}finally{d()}}async function v(r){return h({query:r},({images:e,pages:o})=>{w(e),n.hidden=o<=1,n.dataset.query=r,n.dataset.page=String(2)})}async function S(){const{query:r,page:e}=n.dataset;await h({query:r,page:Number(e)},({images:o,pages:a})=>{b(o);const t=Number(e)+1;n.dataset.page=String(t),t>a&&(n.hidden=!0,u.info({message:"We're sorry, but you've reached the end of search results."}))})}
//# sourceMappingURL=index.js.map
