function ImagePopup({card, onClose}) {
  return (
    <div className={card ? 'popup popup_opened popup_dark-overlay' : 'popup popup_dark-overlay'} id="popup-figure">
      <figure className="popup__figure">
        <button className="popup__close popup__close_figure" type="button" id="image-close" onClick={onClose}/>
        <img className="popup__figure-image" src={card ? card.link : ''} alt={card ? card.name : ''} />
        <figcaption className="popup__figure-caption">{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
