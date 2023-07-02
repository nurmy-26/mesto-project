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

  openPopup(imagePopup); // и показываем попап с заполненным содержимым
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

// создание карточки
function makeCard(object) { // принимает на вход объект
  const cardCopy = card.cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  cardCopy.querySelector('.card__image').alt = object.name;
  cardCopy.querySelector('.card__image').src = object.link;
  cardCopy.querySelector('.card__title').textContent = object.name;

  addFunctional(cardCopy, object.name, object.link); // добавляем карточке функционал

  return cardCopy;
}

// пропускаем массив с начальными карточками через forEach с применением функций, создающей и добавляющей карточки
initialCards.forEach((item) => {
  const newCard = makeCard(item); // параметры - ключи name и link текущего элемента массива
  pasteCard(newCard);
});


// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// клик на РЕДАКТИРОВАТЬ:
function openProfilePopup() {
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

profileBtn.addEventListener('click', openProfilePopup); // добавляем слушатель на кнопку редактирования профиля
profileForm.addEventListener('submit', confirmChanges); // добавляем слушатель на форму


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// клик на ДОБАВИТЬ:
function openCardPopup() {
  openPopup(cardPopup); // открываем попап
  inputCardName.value = ""; // при открытии поле должно быть пустым
  inputLink.value = ""; // при открытии поле должно быть пустым
}

// клик на СОЗДАТЬ (добавление карточки):
function addCard(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  const cardObj = {name: inputCardName.value, link: inputLink.value}; // создаем объект из заполненных полей input
  const newCard = makeCard(cardObj); // пропускаем объект через функцию создания новой карточки

  pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)

  closePopup(cardPopup); // закрываем попап
}

newCardBtn.addEventListener('click', openCardPopup); // добавляем слушатель на кнопку добавления карточки
cardForm.addEventListener('submit', addCard); // добавляем слушатель на форму

// ------------------------- НОВЫЙ ФУНКЦИОНАЛ -------------------------------

// закрывать при клике по оверлею
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
})
