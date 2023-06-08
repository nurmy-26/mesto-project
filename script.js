const editBtn = document.querySelector('.btn_el_edit');
const addBtn = document.querySelector('.btn_el_add'); // пока не понадобилась
const likeBtn = document.querySelectorAll('.btn_el_like');
const closeBtn = document.querySelector('.btn_el_close');
const saveBtn = document.querySelector('.btn_el_save');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__name');
const profileDetail = document.querySelector('.profile__description');

const editForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
const inputName = document.querySelector('.popup__input_type_name');
const inputDetail = document.querySelector('.popup__input_type_description');

// клик на РЕДАКТИРОВАТЬ:
function editProfile() {
  popup.classList.add('popup_opened'); // открываем попап
  inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице
}

// клик на ЗАКРЫТЬ:
function closePopup() {
  popup.classList.remove('popup_opened'); // закрываем попап
}

// клик на СОХРАНИТЬ:
function confirmChanges(evt) {
    evt.preventDefault(); // отмена стандартной отправки формы

    profileName.textContent = inputName.value; // меняем имя на введенное
    profileDetail.textContent = inputDetail.value; // меняем подпись на введенную

    popup.classList.remove('popup_opened'); // закрываем попап
}



editBtn.addEventListener('click', editProfile); // добавляем слушатель на кнопку редактирования профиля
closeBtn.addEventListener('click', closePopup); // добавляем слушатель на кнопку закрытия попапа
editForm.addEventListener('submit', confirmChanges); // добавляем слушатель на кнопку "сохранить"


likeBtn.forEach(function(item) {
  return item.addEventListener('click', function() { // навешиваем на каждую кнопку коллекции слушатель клика
    item.classList.toggle('js-active'); // при клике сердечко меняет свой вид
  })
});
