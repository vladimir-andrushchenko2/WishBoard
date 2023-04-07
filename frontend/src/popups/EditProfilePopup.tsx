import { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

type EditProfilePopupProps = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  onUpdateUser: ({ name, about }: { name: string; about: string }) => void
  currentUser: User
}

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  currentUser,
}: EditProfilePopupProps) {
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onUpdateUser({
      name,
      about: description,
    })
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
          minLength={2}
          maxLength={30}
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
          minLength={2}
          maxLength={30}
          required
        />
        <span className="pop-up__input-error subtitle-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
