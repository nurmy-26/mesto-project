(()=>{"use strict";function e(e,t){var n=e.querySelector(".popup__error_type_".concat(t.name));t.classList.remove("popup__input_invalid"),n.textContent=""}var t=document.querySelector(".popup_type_profile-info"),n=document.querySelector(".popup_type_new-card"),o=document.querySelector(".popup_type_image-open"),r=document.querySelector(".popup__image"),c=document.querySelector(".popup__description"),p=document.querySelector(".btn_el_edit"),u=document.querySelector(".btn_el_add"),a=document.querySelectorAll(".btn_el_close"),i=document.querySelector(".profile__name"),l=document.querySelector(".profile__description"),d=document.querySelector(".popup__edit-form"),s=d.querySelector(".popup__input_type_name"),_=d.querySelector(".popup__input_type_description"),y=document.querySelector(".popup__add-form"),m=y.querySelector(".popup__input_type_name"),v=y.querySelector(".popup__input_type_description"),f=document.querySelector("#card").content.querySelector(".card"),q=document.querySelector(".gallery");function S(e){e.classList.add("popup_opened"),e.querySelector(".btn_el_save").disabled=e===n}function k(t){t.classList.remove("popup_opened"),Array.from(t.querySelectorAll(".popup__input")).forEach((function(n){e(t,n)}))}function g(e){q.prepend(e)}function h(e){var t,n,p,u=f.cloneNode(!0);return u.querySelector(".card__image").alt=e.name,u.querySelector(".card__image").src=e.link,u.querySelector(".card__title").textContent=e.name,t=u,n=e.name,p=e.link,t.querySelector(".btn_el_like").addEventListener("click",(function(e){e.target.classList.toggle("js-active")})),t.querySelector(".btn_el_delete").addEventListener("click",(function(e){e.target.closest(".card").remove()})),t.querySelector(".card__image").addEventListener("click",(function(){var e,t;e=n,t=p,r.src=t,r.alt=e,c.textContent=e,S(o)})),u}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){g(h(e))})),p.addEventListener("click",(function(){S(t),s.value=i.textContent,_.value=l.textContent})),d.addEventListener("submit",(function(e){e.preventDefault(),i.textContent=s.value,l.textContent=_.value,k(t)})),u.addEventListener("click",(function(){S(n),m.value="",v.value=""})),y.addEventListener("submit",(function(e){e.preventDefault(),g(h({name:m.value,link:v.value})),k(n)})),a.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return k(t)}))})),document.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&k(e.target)})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&k(document.querySelector(".popup_opened"))})),Array.from(document.querySelectorAll("form")).forEach((function(t){var n,o,r;n=t,o=Array.from(n.querySelectorAll(".popup__input")),r=n.querySelector(".btn_el_save"),o.forEach((function(t){t.addEventListener("input",(function(){!function(t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.customMessage):n.setCustomValidity(""),n.validity.valid?e(t,n):function(e,t){var n=e.querySelector(".popup__error_type_".concat(t.name));t.classList.add("popup__input_invalid"),n.textContent=t.validationMessage}(t,n)}(n,t),function(e,t){var n=t.checkValidity();e.disabled=!n}(r,n)}))}))}))})();