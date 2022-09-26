function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_place_card-image ${Object.keys(card).length ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_place_image">
                <button className="popup__btn-close" type="button" aria-label="Закрыть" onClick={onClose} />
                <img src={card.link} alt={card.name} className="popup__image" />
                <p className="popup__image-description">{card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;