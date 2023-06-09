import successSign from '../assets/ui-elements/success.svg'
import failureSign from '../assets/ui-elements/fail.svg'

type InfoTooltipProps = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  isSuccess: boolean
}

function InfoTooltip({ isOpen, onClose, isSuccess }: InfoTooltipProps) {
  const backgroundImage = {
    backgroundImage: `url(${isSuccess ? successSign : failureSign})`,
  }
  const message = isSuccess
    ? 'You successfully registered, you will be redirected to the login page'
    : 'Somethis went wrong. Maybe user with such email is already registered'

  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <div className="pop-up__tooltip">
          <div className="pop-up__tooltip-sign" style={backgroundImage}></div>
          <h2 className="pop-up__tooltip-message">{message}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
