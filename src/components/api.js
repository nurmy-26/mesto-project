import {request} from './utils.js'
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '1d14bffe-bdb7-44a2-9581-cfef3f9374d4', // мой токен
    'Content-Type': 'application/json'
  }
}

// загрузка информации о профиле с сервера
export function getProfileInfo(config) {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

// получение начальных карточек
export function getInitialCards(config) {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

// отредактировать данные профиля (имя и инфо) на сервере
export function patchProfileInfo(config, profileName, profileAbout) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  });
}

// добавить новую карточку на сервер
export function postNewCard(config, cardName, cardLink) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}

// удалить карточку с сервера
export function deleteCard(config, cardObj) {
  return request(`${config.baseUrl}/cards/${cardObj._id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// лайкнуть карточку на сервере
export function likeCard(config, cardObj) {
  return request(`${config.baseUrl}/cards/likes/${cardObj._id}`, {
    method: 'PUT',
    headers: config.headers
  });
}

// убрать лайк на сервере
export function dislikeCard(config, cardObj) {
  return request(`${config.baseUrl}/cards/likes/${cardObj._id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// сохранить аватар на сервере
export function saveAvatar(config, avatarLink) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  });
}

// временная!!!
// получить инфо о карточке
export function getCardInfo(config, cardObj) {
  return request(`${config.baseUrl}/cards/${cardObj._id}`, {
    headers: config.headers
  })
}

/*
getProfileInfo(config)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
  */
