import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = '';
    }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  
  return (
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
      <input className="popup__input" type="url" name="link" id="avatar-url" required placeholder="Сcылка на картинку" ref={avatarRef} />
      <span className="avatar-url-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
