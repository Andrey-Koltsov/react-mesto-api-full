import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import api from "../../utils/api.js";
import auth from '../../utils/auth.js';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import PopupWithForm from '../PopupWithForm';
import ImagePopup from '../ImagePopup';
import EditProfilePopup from '../EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup';
import Login from '../Login';
import Register from '../Register';
import ProtectedRoute from '../ProtectedRoute';
import InfoTooltip from '../InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isRegisterInfoPopupOpen, setRegisterInfoPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isRegisterSucefull, setRegisterSucefull] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          setUserEmail(data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => { console.log(err) });
  }, [history, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getCards()
        .then(data => setCards(data))
        .catch(err => console.log(err));
    }
  }, [loggedIn]);



  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);

    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(data => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setRegisterInfoPopupOpen(false);
  }

  function handleUpdateUser(userDataInputs) {
    setIsloading(true);
    api.setUserInfo(userDataInputs)
      .then(data => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsloading(false));
  }

  function handleUpdateAvatar(data) {
    setIsloading(true);
    api.setUserAvatar(data.avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsloading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsloading(true);
    api.createCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsloading(false));
  }

  function handleRegister({ email, password }) {
    if (!email || !password) {
      setRegisterSucefull(false);
      setRegisterInfoPopupOpen(true);
      return;
    }

    auth.register({ email, password })
      .then(data => {
        console.log(data);
        setRegisterSucefull(true);
      })
      .catch(err => {
        console.log(err)
        setRegisterSucefull(false);
      })
      .finally(() => {
        setRegisterInfoPopupOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }

    auth.authorize({ email, password })
      .then(data => {
        if (data.token) {
          console.log(data);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => { console.log(err) });
  }

  function handleSignOut() {
    auth.signout()
      .then(data => {
        history.push('/sign-in');
        setCurrentUser({});
        setLoggedIn(false);
      })
      .catch(err => { console.log(err) });
  }

  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser} >
        <Header email={userEmail} onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact path={"/"}
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} isLoading={isLoading} />

        <PopupWithForm title='Вы уверены?' name='card-remove' btnText='Удалить' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isSucefull={isRegisterSucefull} isOpen={isRegisterInfoPopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;