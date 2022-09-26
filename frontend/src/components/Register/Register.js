import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [formValue, setFormValue] = useState({ email: '', password: '' });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue(prevState => ({ ...prevState, [name]: value }));
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({ email: formValue.email, password: formValue.password });
        setFormValue({ email: '', password: '' });
    }

    return (
        <main className="main">
            <section className="auth">
                <h1 className="auth__title">Регистрация</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <fieldset className="auth__fildset">
                        <input
                            type="email"
                            name="email"
                            className="auth__input"
                            placeholder="email"
                            value={formValue.email}
                            onChange={handleChange}
                            autoComplete="on"
                        />
                        <input
                            type="password"
                            name="password"
                            className="auth__input"
                            placeholder="Пароль"
                            value={formValue.password}
                            onChange={handleChange}
                            autoComplete="on"
                        />
                    </fieldset>
                    <button type="submit" className="auth__btn">Зарегистрироваться</button>
                </form>
                <div className="auth__footer">
                    <p className="auth__text">Уже зарегистрированы?</p>
                    <Link to='/sign-in' className='auth__link'>Войти</Link>
                </div>
            </section>
        </main>
    )
}

export default Register;