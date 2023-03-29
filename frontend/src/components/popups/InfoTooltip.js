import successSign from '../../ui-elements/success.svg';
import failureSign from '../../ui-elements/fail.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const backgroundImage = { backgroundImage: `url(${isSuccess ? successSign : failureSign})` };
  const message = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Закрыть"
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

export default InfoTooltip;
