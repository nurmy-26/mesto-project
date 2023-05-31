let editBtn = document.querySelector('.btn_el_edit');
let addBtn = document.querySelector('.btn_el_add'); // пока не понадобилась
let likeBtn = document.querySelectorAll('.btn_el_like'); // выбор только первой кнопки!!
let closeBtn = document.querySelector('.btn_el_close');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileDetail = document.querySelector('.profile__description');

let inputName = document.querySelector('.popup__input_type_name');
let inputDetail = document.querySelector('.popup__input_type_description');

function editProfile() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDetail.value = profileDetail.textContent;
  // убрать строго заполненное value из input
  // реализовать плавность
}

// работает только на первую кнопку (исправить)
// function like() {
//   likeBtn.classList.toggle('js-active');
// }

function closePopup() {
  popup.classList.remove('popup_opened');
  // реализовать плавность
  // при закрытии данные не должны сохраняться (и так не будут?)
}


editBtn.addEventListener('click', editProfile);

// likeBtn.forEach(
//   el => el.addEventListener("click", function(e) {
//     this.classList.add("js-active");
//   })
// );

// likeBtn.forEach(function(el) {
//   if (likeBtn.classList.contains('js-active') === true) {
//     return el.addEventListener('click', function(e) {
//       this.classList.remove('js-active');
//     })
//   } else {
//     return el.addEventListener('click', function(e) {
//       this.classList.add('js-active');
//     })
//   }
// });


likeBtn.forEach(function(el) {
  return el.addEventListener('click', function(e) {
    this.classList.toggle('js-active');
  })
});

closeBtn.addEventListener('click', closePopup);
