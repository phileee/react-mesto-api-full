import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const {_id} = React.useContext(CurrentUserContext);

  return (
    <article className="element">
      <img className="element__image" alt={card.name} src={card.link} onClick={() => onCardClick(card)} />
      {(card.owner === _id) && <button className="element__trash" type="button" onClick={() => onCardDelete(card)} />}
      <div className="element__bottom">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__likes">
          <button className={card.likes.some(i => i === _id) ? "element__like element__like_active" : "element__like"} type="button" onClick={() => onCardLike(card)}/>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
