import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = `card__remove ${isOwn ? '' : 'card__remove_disabled'}`;
    const isLiked = card.likes.some(item => item === currentUser._id);
    const cardLikeButtonClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick} />
            <div className="card__body">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Понравилось" onClick={handleLikeClick} />
                    <span className="card__like-count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;