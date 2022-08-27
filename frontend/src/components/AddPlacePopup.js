import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [place, setPlace] = React.useState('');
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    setPlace('');
    setUrl('');
    }, [isOpen])
  

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({name: place, link: url});
  } 
  
  return (
    <PopupWithForm name='card' title='Новое место' isOpen={isOpen} onClose={onClose} buttonText='Создать' onSubmit={handleSubmit}>
      <input className="popup__input" type="text" name="name" id="card-name" minLength="2" maxLength="30" required placeholder="Название" onChange={handlePlaceChange} value={place} />
      <span className="card-name-error popup__input-error"></span>
      <input className="popup__input" type="url" name="link" id="card-url" required placeholder="Сcылка на картинку" onChange={handleUrlChange} value={url}/>
      <span className="card-url-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
