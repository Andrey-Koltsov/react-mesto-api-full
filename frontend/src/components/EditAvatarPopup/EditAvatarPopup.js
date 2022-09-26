import { useRef } from "react";
import PopupWithForm from "../PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const urlRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      btnText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input className="popup__input popup__input_form_src"
        required
        id="input-avatar-src"
        type="url"
        minLength="2"
        name="card-src"
        placeholder="Ссылка на новый аватар"
        ref={urlRef}
      />
      <span className="popup__error input-avatar-src-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;