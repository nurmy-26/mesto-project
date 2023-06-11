const profilePopup = document.querySelector('.popup_type_profile-info'); // попап редактирования профиля
const cardPopup = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки
const imagePopup = document.querySelector('.popup_type_image-open'); // попап разворачивания картинки
const imageFull = document.querySelector('.popup__image'); // изображение из попапа
const descriptionFull = document.querySelector('.popup__description'); // подпись к изображению

const profileBtn = document.querySelector('.btn_el_edit');
const newCardBtn = document.querySelector('.btn_el_add');
const closeBtnList = document.querySelectorAll('.btn_el_close');

const profileName = document.querySelector('.profile__name');
const profileDetail = document.querySelector('.profile__description');

const profileForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
const inputName = profileForm.querySelector('.popup__input_type_name');
const inputDetail = profileForm.querySelector('.popup__input_type_description');

const cardForm = document.querySelector('.popup__add-form'); // находим форму в DOM
const inputCardName = cardForm.querySelector('.popup__input_type_name');
const inputLink = cardForm.querySelector('.popup__input_type_description');

const cardTemplate = document.querySelector('#card').content; // выбрали шаблон с id card и сохранили его содержимое
const card = cardTemplate.querySelector('.card'); // шаблон карточки
const gallery = document.querySelector('.gallery');

// открыть попап
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// закрыть попап
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// функция "вставить карточку" в начало галереи
function pasteCard(card) {
  gallery.prepend(card);
}

//функция разворачивания картинки
function openImage(name, link) {
  imageFull.src = link; // при открытии заполняем значение поля указанным на странице
  imageFull.alt = name;
  descriptionFull.textContent = name;

  openPopup(imagePopup);
}

// функционал карточки (лайки, удаление, разворот картинки)
function addFunctional(item, inpName, inpLink) {
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
function addInitialCards(object) { // принимает на вход объект
  const cardCopy = card.cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  cardCopy.querySelector('.card__image').alt = object.name;
  cardCopy.querySelector('.card__image').src = object.link;
  cardCopy.querySelector('.card__title').textContent = object.name;


  addFunctional(cardCopy, object.name, object.link); // добавляем карточке функционал

  pasteCard(cardCopy); // добавляем заполненный шаблон в DOM (в начало gallery)
}

// пропускаем массив с карточками через forEach с применением функции, добавляющей карточки
initialCards.forEach((item) => {
  addInitialCards(item); // параметры - ключи name и link текущего элемента массива
});


// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// клик на РЕДАКТИРОВАТЬ:
function editProfile() {
  openPopup(profilePopup); // открываем попап
  inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице
}

// клик на любую кнопку ЗАКРЫТЬ:
closeBtnList.forEach(function(item) {
  const itemPopup = item.closest('.popup'); // нашли родителя с нужным классом
  item.addEventListener('click', () => closePopup(itemPopup)); // закрываем попап при нажатии на крестик
});

// клик на СОХРАНИТЬ (редактирование профиля):
function confirmChanges(evt) {
    evt.preventDefault(); // отмена стандартной отправки формы

    profileName.textContent = inputName.value; // меняем имя на введенное
    profileDetail.textContent = inputDetail.value; // меняем подпись на введенную

    closePopup(profilePopup); // закрываем попап
}

profileBtn.addEventListener('click', editProfile); // добавляем слушатель на кнопку редактирования профиля
profileForm.addEventListener('submit', confirmChanges); // добавляем слушатель на форму


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// клик на ДОБАВИТЬ:
function addCard() {
  openPopup(cardPopup); // открываем попап
  inputCardName.value = ""; // при открытии поле должно быть пустым
  inputLink.value = ""; // при открытии поле должно быть пустым
}

// клик на СОЗДАТЬ (добавление карточки):
function createCard(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  const newCard = card.cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон, беря значения из заполненных полей
  newCard.querySelector('.card__image').alt = inputCardName.value;
  newCard.querySelector('.card__image').src = inputLink.value;
  newCard.querySelector('.card__title').textContent = inputCardName.value;

  addFunctional(newCard, inputCardName.value, inputLink.value); // добавляем карточке функционал

  pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)

  closePopup(cardPopup); // закрываем попап
}


newCardBtn.addEventListener('click', addCard); // добавляем слушатель на кнопку добавления карточки
cardForm.addEventListener('submit', createCard); // добавляем слушатель на форму
