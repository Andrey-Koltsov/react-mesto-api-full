function PopupWithForm({ name, title, btnText, isOpen, onClose, children, onSubmit, isLoading }) {
    const currentBtnText = isLoading ? 'Загрузка...' : btnText;
    return (
        <div className={`popup popup_place_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__btn-close" type="button" aria-label="Закрыть" onClick={onClose} />
                <h3 className="popup__title">{title}</h3>
                <form className="popup__form" name={`form-${name}`} noValidate onSubmit={onSubmit}>
                    <fieldset className="popup__input-container">{children}</fieldset>
                    <button className={`popup__btn-submit ${isLoading ? 'popup__btn-submit_disabled' : ''}`} disabled={isLoading} type="submit" aria-label={currentBtnText}>{currentBtnText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;