export default class UserInfo{
  // принимает элементы (!) с селекторами (имя, подпись, аватар)
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  // возвращает объект с данными пользователя
  getUserInfo(){
     return {
         name: this._name.textContent,
         about:  this._about.textContent,
         avatar: this._avatar.src
     }
  }

  // обновить инфо на странице (принимает новые данные пользователя, которые нужно получить с сервера)
  setUserInfo(data) {
     this._name.textContent = data.name;
     this._about.textContent = data.about;
     this._avatar.src = data.avatar
   }
 }
