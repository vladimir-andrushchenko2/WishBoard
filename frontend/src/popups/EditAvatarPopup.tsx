import { useState } from 'react'
import PopupWithForm from './PopupWithForm'

type EditAvatarPopupProps = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  onUpdateAvatar: ({ avatar }: { avatar: string }) => void
}

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}: EditAvatarPopupProps) {
  const [url, setUrl] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onUpdateAvatar({
      avatar: url,
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit-profile-picture"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
    >
      <label className="pop-up__form-field">
        <input
          id="update-profile-picture-input"
          type="url"
          name="source"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          className="pop-up__input pop-up__input_type_picture-source"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="pop-up__input-error update-profile-picture-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
