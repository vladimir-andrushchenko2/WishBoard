import { useContext, useRef, Dispatch } from 'react'

import { PopupReducerAction } from '../reducers/popupReducer'

import Card from '../components/elements/Card'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

type MainProps = {
  dispatchPopupAction: Dispatch<PopupReducerAction>
  cards: Card[]
  onCardLike: (card: Card) => void
  onCardDelete: (cardToDelete: Card) => void
}

function Main({
  dispatchPopupAction,
  cards,
  onCardLike,
  onCardDelete,
}: MainProps) {
  const currentUser = useContext(CurrentUserContext) as User | undefined

  const avatarRef = useRef<HTMLImageElement>(null)

  if (!currentUser) {
    return <p>Loading ...</p>
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            ref={avatarRef}
            className="profile__picture"
            src={currentUser.avatar}
            alt="заставка профиля"
          />
          <button
            aria-label="change profile picture"
            className="profile__picture-overlay"
            onClick={() => dispatchPopupAction({ type: 'open-edit-avatar' })}
          ></button>
        </div>
        <div className="profile__title">
          <h1 className="profile__title-text">{currentUser.name}</h1>
          <button
            type="button"
            className="button profile__modify-button"
            aria-label="Изменить профиль"
            onClick={() => dispatchPopupAction({ type: 'open-edit-profile' })}
          ></button>
        </div>

        <p className="profile__subtitle">{currentUser.about}</p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить место"
          onClick={() => dispatchPopupAction({ type: 'open-add-place' })}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={() =>
                dispatchPopupAction({
                  type: 'open-show-image',
                  payload: { selectedCard: card },
                })
              }
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
