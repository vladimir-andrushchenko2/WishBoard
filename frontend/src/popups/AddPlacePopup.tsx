import { useState } from 'react'
import PopupWithForm from './PopupWithForm'

type AddPlacePopupProps = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  onAddPlace: (name: string, link: string) => void
}

function AddPlacePopup({ isOpen, onClose, onAddPlace }: AddPlacePopupProps) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLink(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onAddPlace(name, link)

    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="gallery-add"
      title="New Card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Create new card'}
    >
      <label className="pop-up__form-field">
        <input
          id="picture-name-input"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="pop-up__input pop-up__input_type_name"
          placeholder="Title"
          minLength={2}
          maxLength={30}
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
          placeholder="Url of the picture"
          required
        />
        <span className="pop-up__input-error picture-source-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
