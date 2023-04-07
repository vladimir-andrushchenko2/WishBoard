import { useRef, Dispatch } from 'react'

import { PopupReducerAction } from '../reducers/popupReducer'

import Card from '../components/elements/Card'

type MainProps = {
  dispatchPopupAction: Dispatch<PopupReducerAction>
  cards: Card[]
  onCardLike: (card: Card) => void
  onCardDelete: (cardToDelete: Card) => void
  currentUser: User
}

function Main({
  dispatchPopupAction,
  cards,
  onCardLike,
  onCardDelete,
  currentUser,
}: MainProps) {
  const avatarRef = useRef<HTMLImageElement>(null)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-container">
          <img
            ref={avatarRef}
            className="profile__picture"
            src={currentUser.avatar}
            alt="Profile"
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
            aria-label="Change profile"
            onClick={() => dispatchPopupAction({ type: 'open-edit-profile' })}
          ></button>
        </div>

        <p className="profile__subtitle">{currentUser.about}</p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Add wish"
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
              currentUser={currentUser}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
