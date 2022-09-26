import React, { useState } from "react";

function Login({ onLogin }) {
    const [formValue, setFormValue] = useState({ email: '', password: '' });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue(prevState => ({ ...prevState, [name]: value }));
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({ email: formValue.email, password: formValue.password });
        setFormValue({ email: '', password: '' });
    }

    return (
        <main className="main">
            <section className="auth">
                <h1 className="auth__title">Войти</h1>
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
                    <button type="submit" className="auth__btn">Войти</button>
                </form>
            </section>
        </main>
    );
}

export default Login;