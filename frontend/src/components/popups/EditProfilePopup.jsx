import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser?.name || '');
    setDescription(currentUser?.about || '');
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="pop-up__form-field">
        <input
          id="title-input"
          type="text"
          name="title"
          value={name}
          onChange={handleNameChange}
          className="pop-up__input pop-up__input_type_title"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="pop-up__input-error title-input-error"></span>
      </label>
      <label className="pop-up__form-field">
        <input
          id="subtitle-input"
          type="text"
          name="subtitle"
          value={description}
          onChange={handleDescriptionChange}
          className="pop-up__input pop-up__input_type_subtitle"
          placeholder="О Вас"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="pop-up__input-error subtitle-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
