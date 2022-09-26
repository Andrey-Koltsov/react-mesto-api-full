import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import PopupWithForm from "../PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [formValue, setFormValue] = useState({ name: "", about: "" });
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setFormValue({ name: currentUser.name, about: currentUser.about })
    }, [currentUser, isOpen]);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue(prevState => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: formValue.name,
            about: formValue.about,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='profile'
            btnText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input className="popup__input popup__input_form_name"
                id="input-profile-name"
                required
                type="text"
                name="name"
                minLength="2"
                maxLength="40"
                placeholder="Введите имя"
                onChange={handleChange}
                value={formValue.name || ''}
            />
            <span className="popup__error input-profile-name-error" />
            <input className="popup__input popup__input_form_job"
                id="input-profile-job"
                required
                type="text"
                name="about"
                minLength="2"
                maxLength="200"
                placeholder="Введите описание профиля"
                onChange={handleChange}
                value={formValue.about || ''}
            />
            <span className="popup__error input-profile-job-error" />
        </PopupWithForm>
    );
}

export default EditProfilePopup;