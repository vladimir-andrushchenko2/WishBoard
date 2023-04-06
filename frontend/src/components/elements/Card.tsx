import { useContext } from 'react'

import { CurrentUserContext } from '../../contexts/CurrentUserContext'

type CardProps = {
  card: Card
  onCardClick: () => void
  onCardDelete: (cardToDelete: Card) => void
  onCardLike: (card: Card) => void
}

function Card({ card, onCardClick, onCardLike, onCardDelete }: CardProps) {
  const currentUser = useContext(CurrentUserContext) as User | undefined

  const { link, name } = card

  const isOwn = card.owner._id === currentUser?._id
  const isLiked = card.likes.some((i) => i._id === currentUser?._id)

  function handleCardLike() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
    <li className="gallery__item card">
      <img className="card__picture" src={link} alt={name} />
      <button
        className="show-btn"
        aria-label="show-image"
        onClick={onCardClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      </button>
      <button
        aria-label="delete button"
        onClick={handleCardDelete}
        type="button"
        className={`button card__delete-button ${
          isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'
        }`}
      ></button>
      <div className="card__info">
        <h2 className="card__caption">{name}</h2>
        <div className="">
          <button
            aria-label="like the card"
            type="button"
            className={`button card__like-button ${
              isLiked ? 'card__like-button_active' : ''
            }`}
            onClick={handleCardLike}
          ></button>
          <div className="card__likes">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card
