type ImagePopupProps = {
  card?: Card
  onClose: React.MouseEventHandler<HTMLButtonElement>
}

function ImagePopup({ card, onClose }: ImagePopupProps) {
  return (
    <div
      className={`pop-up pop-up_type_show-card pop-up_darker-background ${
        card ? 'pop-up_opened' : ''
      }`}
    >
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <img
          className="pop-up__image"
          src={`${card ? card.link : '#'}`}
          alt={card?.name}
        />
        <p className="pop-up__image-caption">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
