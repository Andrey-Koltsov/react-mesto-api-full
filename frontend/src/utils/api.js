class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    setUserAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    createCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
            .then(this._checkResponse);
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    likeCard(cardId, isLiked) {
        const method = isLiked ? 'PUT' : 'DELETE';
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            credentials: 'include',
            method,
            headers: this._headers
        })
            .then(this._checkResponse);
    }
}

// const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
//     headers: {
//       authorization: '10f3c5e9-427f-4c5d-b986-8f6bfc1bfc5c',
//       'Content-Type': 'application/json'
//     }
// });

const api = new Api({
    baseUrl: 'https://api.koltsov.nomorepartiesxyz.ru',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;