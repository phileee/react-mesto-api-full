import React from 'react';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import * as auth from '../utils/Auth';


function App() {

  const [currentUser, setCurrentUser] = React.useState({
    about: "Загрузка",
    avatar: "https://static.tildacdn.com/tild3637-3531-4565-a161-653761663261/74H8gif.gif",
    name: "Загрузка"
  });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  const [isSignPopup, setIsSignPopup] = React.useState(false);
  const [successSign, setSuccessSign] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialUser()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          console.log(err);
        });
        
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSignPopup(false);
    setSuccessSign(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.setUser(name, about)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.toggleLike(card._id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => card._id !== c._id))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    if (/*localStorage.getItem('jwt')*/ document.cookie.slice(4)) {
      auth.checkToken(/*localStorage.getItem('jwt')*/)
        .then((res) => {
          if (res.status === 401) {
            navigate('/sign-in');
            setLoggedIn(false);
          } else {
            return res.json();
          }
        })
        .then((res) => {
          //localStorage.setItem('email', res.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(err => console.log(err));
    } else {
      navigate('/sign-in');
      setLoggedIn(false);
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="root">

        <Routes>
          <Route path='/sign-up' element={<Register onClose={closeAllPopups} isSignPopup={isSignPopup} setIsSignPopup={setIsSignPopup} successSign={successSign} setSuccessSign={setSuccessSign} />} />
          <Route path='/sign-in' element={<Login onClose={closeAllPopups} isSignPopup={isSignPopup} setIsSignPopup={setIsSignPopup} successSign={successSign} setSuccessSign={setSuccessSign} setLoggedIn={setLoggedIn} />} />
          <Route path='/' element={<ProtectedRoute loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteClick} setLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} buttonText='Да' />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
