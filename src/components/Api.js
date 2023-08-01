export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // универсальная функция проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // функция для универсального запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  // получение начальных карточек
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  // загрузка информации о профиле с сервера
  getProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  // отредактировать данные профиля (имя и инфо) на сервере
  patchProfileInfo(profileName, profileAbout) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileAbout
      })
    });
  }

  // добавить новую карточку на сервер
  postNewCard(cardName, cardLink) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    });
  }

  // удалить карточку с сервера
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // лайкнуть карточку на сервере
  likeCard(cardObj) {
    return this._request(`${this._baseUrl}/cards/likes/${cardObj._id}`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  // убрать лайк на сервере
  dislikeCard(cardObj) {
    return this._request(`${this._baseUrl}/cards/likes/${cardObj._id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // сохранить аватар на сервере
  saveAvatar(avatarLink) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }
}

