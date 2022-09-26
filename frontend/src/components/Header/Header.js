import { Link, Route } from "react-router-dom";
import logo from "../../images/logo/logo.svg";

function Header({ email, onSignOut }) {
    return (
        <header className="header">
            <a href="/#">
                <img src={logo} alt="Логотип Место" className="logo" />
            </a>
            <div className="header__auth">
                <Route exact path='/'>
                    <span className="header__auth-email">{email}</span>
                    <button className="header__link" onClick={onSignOut}>Выйти</button>
                </Route>
                <Route exact path='/sign-in'>
                    <Link to='/sign-up' className="header__link">Регистрация</Link>
                </Route>
                <Route exact path='/sign-up'>
                    <Link to='/sign-in' className="header__link">Войти</Link>
                </Route>
            </div>
        </header>
    );
}

export default Header;