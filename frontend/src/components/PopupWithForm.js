function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`pop-up pop-up_type_${name} ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className="pop-up__container">
        <button
          type="button"
          className="button pop-up__close-btn"
          aria-label="Закрыть"
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
  );
}

export default PopupWithForm;
