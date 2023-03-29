import { useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const { link, name } = card;

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="gallery__item card">
      <img className="card__picture" src={link} alt={name} onClick={() => onCardClick(card)} />
      <button onClick={handleCardDelete} type="button" className={`button card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`}></button>
      <div className="card__info">
        <h2 className="card__caption">{name}</h2>
        <div className="">
          <button
            type="button"
            className={`button card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
            onClick={handleCardLike}
          ></button>
          <div className="card__likes">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;
