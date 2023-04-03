import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit-profile-picture" title="Обновить аватар" isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'}>
      <label className="pop-up__form-field">
        <input
          id="update-profile-picture-input"
          type="url"
          name="source"
          ref={avatarRef}
          className="pop-up__input pop-up__input_type_picture-source"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="pop-up__input-error update-profile-picture-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
