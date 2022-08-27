function PopupWithForm({name, title, isOpen, children, onClose, buttonText, onSubmit}) {
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"} id={"popup-" + name}>
        <div className="popup__box">
          <h2 className="popup__header">{title}</h2>
            <form className="popup__form" name={"popup-" + name} id={"popup-form-" + name} onSubmit={onSubmit} >
              {children}
              <button className="popup__button" type="submit">{buttonText}</button>
            </form>
          <button className="popup__close" type="button" id={name + "-close"} onClick={onClose}/>
        </div>
      </div>
  );
}

export default PopupWithForm;
