const editBtn = document.querySelector('.btn_el_edit');
const addBtn = document.querySelector('.btn_el_add');
const closeBtn = document.querySelectorAll('.btn_el_close');
const editPopup = document.querySelector('.popup_type_profile-info'); // попап редактирования профиля
const addPopup = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки

const profileName = document.querySelector('.profile__name');
const profileDetail = document.querySelector('.profile__description');

const editForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
const inputName = editForm.querySelector('.popup__input_type_name');
const inputDetail = editForm.querySelector('.popup__input_type_description');

const addForm = document.querySelector('.popup__add-form'); // находим форму в DOM
const inputCardName = addForm.querySelector('.popup__input_type_name');
const inputLink = addForm.querySelector('.popup__input_type_description');

const cardTemplate = document.querySelector('#card').content; // выбрали шаблон с id card и сохранили его содержимое
const imageTemplate = document.querySelector('#image').content;
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

//функция разворачивания картинки
function openImage(name, link) {
  const imageCopy = imageTemplate.querySelector('.popup').cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  imageCopy.querySelector('.popup__image').alt = name;
  imageCopy.querySelector('.popup__image').src = link;
  imageCopy.querySelector('.popup__description').textContent = name;

  // навешиваем возможность закрывая, удалять
  imageCopy.querySelector('.btn_el_close').addEventListener('click', function(evt) {
  const cardItem = evt.target.closest('.popup');
  cardItem.remove();
});

  gallery.after(imageCopy); // добавляет код шаблона после gallery
}

// функционал карточки (лайки, удаление, разворот картинки)
function cardFunctional(item, inpName, inpLink) {
  // навешиваем возможность "лайкать"
  item.querySelector('.btn_el_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('js-active');
  });

  // навешиваем возможность удалять
  item.querySelector('.btn_el_delete').addEventListener('click', function(evt) {
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
  });

  // навешиваем возможность разворачивать картинку на каждую картинку
  item.querySelector('.card__image').addEventListener('click', function() {
    openImage(inpName, inpLink); // используем функцию
  });
}

// ОТКРЫЛИ СТРАНИЦУ
// добавляем на страницу "стартовые" карточки
function addInitialCards(name, link) {
  const cardCopy = cardTemplate.querySelector('.card').cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  cardCopy.querySelector('.card__image').alt = name;
  cardCopy.querySelector('.card__image').src = link;
  cardCopy.querySelector('.card__title').textContent = name;

  cardFunctional(cardCopy, name, link); // добавляем карточке функционал

  gallery.prepend(cardCopy); // добавляем заполненный шаблон в DOM (в начало gallery)
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
editForm.addEventListener('submit', confirmChanges); // добавляем слушатель на форму


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// клик на ДОБАВИТЬ:
function addCard() {
  addPopup.classList.add('popup_opened'); // открываем попап
  inputCardName.value = ""; // при открытии поле должно быть пустым
  inputLink.value = ""; // при открытии поле должно быть пустым
}

// клик на СОЗДАТЬ (добавление карточки):
function createCard(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  const newCard = cardTemplate.querySelector('.card').cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  newCard.querySelector('.card__image').alt = inputCardName.value;
  newCard.querySelector('.card__image').src = inputLink.value;
  newCard.querySelector('.card__title').textContent = inputCardName.value;

  cardFunctional(newCard, inputCardName.value, inputLink.value); // добавляем карточке функционал

  gallery.prepend(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)

  addPopup.classList.remove('popup_opened'); // закрываем попап
}


addBtn.addEventListener('click', addCard); // добавляем слушатель на кнопку добавления карточки
addForm.addEventListener('submit', createCard); // добавляем слушатель на форму


