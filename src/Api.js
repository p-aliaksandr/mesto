export default class Api {
        constructor({ baseUrl, headers }) {
          this.url = baseUrl;
          this.headers = headers;
    }
    
    // метод(получить информацию о пользователе)
    getInfoAboutUser() {
        return fetch(`${this.url}/users/me`, {
          method: 'GET', 
          headers: this.headers
    })
      .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
      .catch(err => {
        loader.classList.remove('popup_is-opened');
        alert('Ошибка: ' + err);
      })
    }

    // метод(получить начальный массив карточек)
    getInitialCards() {
      return fetch(`${this.url}/cards`, {
        method: 'GET',
        headers: this.headers
    })
      .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
    }

    // метод(Редактирование имени, должности)
    editProfileUser(formInfo) {
      return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
      body: JSON.stringify({
        name: formInfo.elements.name.value,
        about: formInfo.elements.job.value,
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();

        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
    }

    // метод(Редактирование аватара)
    editAvatarOnServer() {
      return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
      body: JSON.stringify({
        avatar: formAvatar.elements.linkAvatar.value
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
    }

    // метод(Добавление новой карточки)
    postCardOnServer(form) {
      return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: form.elements.namePlus.value,
          link: form.elements.link.value
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
    }

    // метод(Отображение количества лайков карточки)
    likeCardOnServer(cardId, queryMethod) {
      return fetch(`${this.url}/cards/like/${cardId}`, { 
        method: queryMethod, 
        headers: this.headers,
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
      .catch(err => {
        loader.classList.remove('popup_is-opened');
        alert('Ошибка: ' + err);
      })
    }

    // метод (удаление карточки)
    deleteCardFromServer(cardId) {
      return fetch(`${this.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
      })
      .then(data => {
        if(data.ok) {
          return data.json();
        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
    }

}

