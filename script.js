const editBtn = document.querySelector('.btn_el_edit');
const addBtn = document.querySelector('.btn_el_add');
const likeBtn = document.querySelectorAll('.btn_el_like');
const closeBtn = document.querySelectorAll('.btn_el_close');
const saveBtn = document.querySelector('.btn_el_save');
const editPopup = document.querySelector('.popup_type_profile-info'); // попап редактирования профиля
const addPopup = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки

const profileName = document.querySelector('.profile__name');
const profileDetail = document.querySelector('.profile__description');

const editForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
const inputName = document.querySelector('.popup__input_type_name');
const inputDetail = document.querySelector('.popup__input_type_description');

const cardTemplate = document.querySelector('#card').content; // выбрали шаблон с id card и сохранили его содержимое
const gallery = document.querySelector('.gallery');

// массив начальных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// добавляем на страницу "стартовые" карточки
function addInitialCards(name, link) {
  const cardCopy = cardTemplate.querySelector('.card').cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  cardCopy.querySelector('.card__image').alt = name;
  cardCopy.querySelector('.card__image').src = link;
  cardCopy.querySelector('.card__title').textContent = name;

  // навешиваем возможность "лайкать"
  cardCopy.querySelector('.btn_el_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('js-active');
  });

  gallery.prepend(cardCopy); // добавляем заполненный шаблон в DOM (в конец gallery)
}

// пропускаем массив с карточками через forEach с применением функции, добавляющей карточки
initialCards.forEach((item) => {
  addInitialCards(item.name, item.link); // параметры - ключи name и link текущего элемента массива
});

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// клик на РЕДАКТИРОВАТЬ:
function editProfile() {
  editPopup.classList.add('popup_opened'); // открываем попап
  inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице
}

// клик на любую кнопку ЗАКРЫТЬ:
closeBtn.forEach(function(item) {
  return item.addEventListener('click', function() { // навешиваем на каждую кнопку коллекции слушатель клика
    item.closest('.popup').classList.remove('popup_opened'); // при клике убираем класс у ближайшего родителя с классом popup
  })
});

// клик на СОХРАНИТЬ (редактирование профиля):
function confirmChanges(evt) {
    evt.preventDefault(); // отмена стандартной отправки формы

    profileName.textContent = inputName.value; // меняем имя на введенное
    profileDetail.textContent = inputDetail.value; // меняем подпись на введенную

    editPopup.classList.remove('popup_opened'); // закрываем попап
}

editBtn.addEventListener('click', editProfile); // добавляем слушатель на кнопку редактирования профиля
editForm.addEventListener('submit', confirmChanges); // добавляем слушатель на кнопку "сохранить"


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// клик на ДОБАВИТЬ:
function addCard() {
  addPopup.classList.add('popup_opened'); // открываем попап
  //
}


// клик на СОЗДАТЬ (добавление карточки):


addBtn.addEventListener('click', addCard); // добавляем слушатель на кнопку добавления карточки

