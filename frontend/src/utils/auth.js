class Auth {
    constructor(url) {
        this._url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    }

    register({ password, email }) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponse);
    }

    authorize({ password, email }) {
        return fetch(`${this._url}/signin`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponse);
    }

    getContent() {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
        })
            .then(this._checkResponse);
    }

    signout() {
        return fetch(`${this._url}/signout`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(this._checkResponse);
    }
}

const auth = new Auth('http://localhost:3001');
export default auth;