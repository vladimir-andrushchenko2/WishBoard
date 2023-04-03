import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace(name, link);

    setName('');
    setLink('');
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="gallery-add" title="Новое место" isOpen={isOpen} onClose={onClose} buttonText={'Создать'}>
      <label className="pop-up__form-field">
        <input
          id="picture-name-input"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="pop-up__input pop-up__input_type_name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="pop-up__input-error picture-name-input-error"></span>
      </label>
      <label className="pop-up__form-field">
        <input
          id="picture-source-input"
          type="url"
          name="source"
          value={link}
          onChange={handleLinkChange}
          className="pop-up__input pop-up__input_type_picture-source"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="pop-up__input-error picture-source-input-error"></span>
      </label>
    </PopupWithForm>

  )
}

export default AddPlacePopup;
