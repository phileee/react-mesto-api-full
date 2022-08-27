import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({name, about: description});
  } 
  
  return (
    <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
      <input className="popup__input" type="text" name="name" id="popup-username" required minLength="2" maxLength="40" placeholder="Введите имя" value={name || ''} onChange={handleNameChange} />
      <span className="popup-username-error popup__input-error"></span>
      <input className="popup__input" type="text" name="info" id="popup-description" required minLength="2" maxLength="200" placeholder="О себе" value={description || ''} onChange={handleDescriptionChange} />
      <span className="popup-description-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
