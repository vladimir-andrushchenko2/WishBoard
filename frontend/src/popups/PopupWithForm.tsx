import { PropsWithChildren } from 'react'

type PopupWithFormProps = PropsWithChildren<{
  title: string
  name: string
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  buttonText: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
}>

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}: PopupWithFormProps) {
  return (
    <div
      className={`pop-up pop-up_type_${name} ${isOpen ? 'pop-up_opened' : ''}`}
    >
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <form
          className="pop-up__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="pop-up__header">{title}</h2>
          {children}
          <input
            type="submit"
            className="pop-up__save-button"
            value={buttonText}
          />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
