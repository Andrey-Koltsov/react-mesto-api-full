import { useState } from "react";
import PopupWithForm from "../PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
    const [formValue, setFormValue] = useState({ name: "", link: "" });

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddCard({ name: formValue.name, link: formValue.link });
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='card-add'
            btnText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input className="popup__input popup__input_form_name"
                required
                id="input-card-name"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={formValue.name}
            />
            <span className="popup__error input-card-name-error" />
            <input className="popup__input popup__input_form_src"
                required
                id="input-card-src"
                type="url"
                minLength="2"
                name="link"
                placeholder="Ссылка на картинку"
                onChange={handleChange}
                value={formValue.link}
            />
            <span className="popup__error input-card-src-error" />
        </PopupWithForm>
    );
}

export default AddPlacePopup;