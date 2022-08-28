import React from 'react';
import Header from './Header';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, setLoggedIn}) {

  const { avatar, name, about } = React.useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleExit = () => {
    auth.deauthorize()
    .then((res) => {
      if (res) {
        localStorage.removeItem('email');
        setLoggedIn(false);
        navigate('/sign-in');
      } else {
        throw new Error('Ошибка выхода')
      }
    })
    .catch((err) => console.log(err)
    )
  }

  return (
    <>
      <Header>
        <p className='header__email' >{localStorage.getItem('email')}</p>
        <button className='header__button' onClick={handleExit} >Выйти</button>
      </Header>
      <main className="main">
        <section className="profile">
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="аватар" src={avatar} />
          </button>
          <div className="profile__info">
            <div className="profile__name-inline">
              <h1 className="profile__name">{name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__prename">{about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace} />
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))};
        </section>
      </main>
    </>
  );
}

export default Main;
