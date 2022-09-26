import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Card from "../Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="avatar" onClick={onEditAvatar}>
                    <div className="avatar__wrapper" />
                    <img src={currentUser.avatar} alt="" className="avatar__photo" />
                </div>
                <div className="profile__info">
                    <div className="profile__info-heading">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__btn-edit"
                            type="button"
                            aria-label="Редактировать"
                            onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    className="profile__btn-add"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}
                />
            </section>

            <section className="cards">
                <ul className="cards__grid">
                    {cards.map((card) => {
                        return <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;