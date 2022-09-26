import iconRegister from "../../images/icon/auth-register.svg";
import iconRegisterFailed from "../../images/icon/auth-register-failed.svg";

function InfoTooltip({ isSucefull, isOpen, onClose }) {
    return (
        <div className={`popup popup_place_auth ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_place_auth">
                <button className="popup__btn-close" type="button" aria-label="Закрыть" onClick={onClose} />
                <img src={isSucefull ? iconRegister : iconRegisterFailed} alt="" className="popup__icon" />
                <h3 className="popup__title popup__title_align_center">{isSucefull ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
            </div>
        </div>
    )
}

export default InfoTooltip;