(()=>{"use strict";var e=document.querySelectorAll(".popup"),t=document.querySelector(".popup_type_profile-info"),n=document.querySelector(".popup_type_new-card"),o=document.querySelector(".popup_type_change-avatar"),r=document.querySelector(".popup_type_image-open"),c=document.querySelector(".popup__image"),u=document.querySelector(".popup__description"),a=document.querySelector(".btn_el_edit"),i=document.querySelector(".btn_el_add"),l=(document.querySelectorAll(".btn_el_close"),document.querySelector(".profile__avatar")),s=document.querySelector(".profile__avatar-overlay"),d=document.querySelector(".profile__name"),p=document.querySelector(".profile__description"),f=document.querySelector(".popup__edit-form"),_=f.querySelector(".popup__input_type_name"),m=f.querySelector(".popup__input_type_description"),y=document.querySelector(".popup__add-form"),h=y.querySelector(".popup__input_type_name"),v=y.querySelector(".popup__input_type_description"),S=document.querySelector(".popup__change-avatar-form"),q=S.querySelector(".popup__input_type_description"),b=document.querySelector("#card").content.querySelector(".card"),k=document.querySelector(".gallery");function g(e){"Escape"===e.key&&E(document.querySelector(".popup_opened"))}function C(e){e.classList.add("popup_opened"),document.addEventListener("keydown",g)}function E(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",g)}function L(e,t,n){t.textContent=e?"Сохранение...":n}var x={baseUrl:"https://nomoreparties.co/v1/plus-cohort-26",headers:{authorization:"1d14bffe-bdb7-44a2-9581-cfef3f9374d4","Content-Type":"application/json"}};function j(e){k.prepend(e)}function A(e){var t,n,o,a,i=b.cloneNode(!0),l=i.querySelector(".card__image");return l.alt=e.name,l.src=e.link,i.querySelector(".card__title").textContent=e.name,i.querySelector(".card__like-number").textContent=e.likes.length,t=i,n=e.name,o=e.link,a=e,t.querySelector(".btn_el_like").addEventListener("click",(function(e){e.target.classList.toggle("js-active"),e.target.classList.contains("js-active")?function(e,t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t._id),{method:"PUT",headers:e.headers})}(x,a).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.querySelector(".card__like-number").textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e,t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t._id),{method:"DELETE",headers:e.headers})}(x,a).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.querySelector(".card__like-number").textContent=e.likes.length})).catch((function(e){console.log(e)}))})),t.querySelector(".btn_el_delete").addEventListener("click",(function(e){e.target.closest(".card").remove(),function(e,t){return fetch("".concat(e.baseUrl,"/cards/").concat(t._id),{method:"DELETE",headers:e.headers})}(x,a).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))})),t.querySelector(".card__image").addEventListener("click",(function(){var e,t;e=n,t=o,c.src=t,c.alt=e,u.textContent=e,C(r)})),i}var P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".btn_el_save",inputErrorClass:"popup__input_invalid",errorClass:".popup__error_type_"};function U(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.customMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector("".concat(n.errorClass).concat(t.name));t.classList.remove(n.inputErrorClass),o.textContent=""}(e,t,n):function(e,t,n){var o=e.querySelector("".concat(n.errorClass).concat(t.name));t.classList.add(n.inputErrorClass),o.textContent=t.validationMessage}(e,t,n)}function T(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e){e.disabled=!1}(t):function(e){e.disabled=!0}(t)}var w=Array.from(t.querySelectorAll(P.inputSelector)),B=t.querySelector(P.submitButtonSelector),D=Array.from(n.querySelectorAll(P.inputSelector)),N=n.querySelector(P.submitButtonSelector),O=Array.from(o.querySelectorAll(P.inputSelector)),J=o.querySelector(P.submitButtonSelector);(function(e){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers})})(x).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){d.textContent=e.name,p.textContent=e.about,l.src=e.avatar})).catch((function(e){console.log(e)})),function(e){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers})}(x).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){var t=A(e);"0c4e7ce2312fb70a3ec855e5"!==e.owner._id&&t.querySelector(".btn_el_delete").remove(),j(t)}))})).catch((function(e){console.log(e)})),a.addEventListener("click",(function(){C(t),_.value=d.textContent,m.value=p.textContent,w.forEach((function(e){U(t,e,P),T(w,B)}))})),f.addEventListener("submit",(function(e){e.preventDefault(),d.textContent=_.value,p.textContent=m.value;var n=B.textContent;L(!0,B,n),function(e,t,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})})}(x,d.textContent,p.textContent).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})).finally((function(){L(!1,B,n)})),E(t)})),i.addEventListener("click",(function(){C(n),T(D,N)})),y.addEventListener("submit",(function(e){e.preventDefault();var t={name:h.value,link:v.value,likes:[]},o=A(t),r=N.textContent;L(!0,N,r),function(e,t,n){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:t,link:n})})}(x,t.name,t.link).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){console.log(e)})).catch((function(e){console.log(e)})).finally((function(){L(!1,N,r)})),j(o),h.value="",v.value="",E(n)})),s.addEventListener("click",(function(){C(o),T(O,J)})),S.addEventListener("submit",(function(e){e.preventDefault(),l.src=q.value;var t=J.textContent;L(!0,J,t),function(e,t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})})}(x,l.src).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})).finally((function(){L(!1,J,t)})),q.value="",E(o)})),e.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&E(e),t.target.classList.contains("btn_el_close")&&E(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){U(e,r,t),T(n,o)}))}))}(t,e)}))}(P)})();