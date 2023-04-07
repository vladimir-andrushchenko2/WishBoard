import { useState, useReducer } from 'react'

import Header from './components/elements/Header'
import Footer from './components/elements/Footer'

import ImagePopup from './popups/ImagePopup'
import EditProfilePopup from './popups/EditProfilePopup'
import EditAvatarPopup from './popups/EditAvatarPopup'
import AddPlacePopup from './popups/AddPlacePopup'

import Main from './pages/Main'

import { redirect, useNavigate, useLoaderData } from 'react-router-dom'

export async function loader() {
  try {
    const [currentUser, cards] = await Promise.all([
      api.getUserInfo(),
      api.getCards(),
    ])

    return { currentUser, cards }
  } catch (err) {
    console.log(err)
    return redirect('/login')
  }
}

import {
  initialState as initialPopupState,
  popupReducer,
} from './reducers/popupReducer'

import { api } from './utils/api'

function App() {
  const [popupState, dispatchPopupAction] = useReducer(
    popupReducer,
    initialPopupState
  )

  const { currentUser: loadedUser, cards: loadedCards } = useLoaderData() as {
    currentUser: User
    cards: Card[]
  }

  const [cards, setCards] = useState<Card[]>(loadedCards)
  const [currentUser, setCurrentUser] = useState(() => loadedUser)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()

  function handleAddPlaceSubmit(name: string, link: string) {
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        dispatchPopupAction({
          type: 'close-all',
        })
      })
      .catch((err) => console.error(err))
  }

  function handleSignOut() {
    api
      .signOut()
      .then((res) => {
        console.log(res)
        navigate('/login')
      })
      .catch((err) => console.error(err))
  }

  function handleCardLike(card: Card) {
    if (!currentUser) {
      throw new Error('Impossible to like a card without current user selected')
    }

    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    function updateCards(updatedCard: Card) {
      setCards(
        cards.map((card) => (card._id === updatedCard._id ? updatedCard : card))
      )
    }

    if (!isLiked) {
      api
        .putCardLike(card._id)
        .then(updateCards)
        .catch((err) => console.error(err))
    } else {
      api
        .deleteCardLike(card._id)
        .then(updateCards)
        .catch((err) => console.error(err))
    }
  }

  function handleCardDelete(cardToDelete: Card) {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardToDelete._id))
      })
      .catch((err) => console.error(err))
  }

  function handleUpdateUser({ name, about }: { name: string; about: string }) {
    api
      .patchUserInfo(name, about)
      .then((updatedUser: User) => {
        setCurrentUser(updatedUser)
        dispatchPopupAction({
          type: 'close-all',
        })
      })
      .catch((err) => console.error(err))
  }

  function handleUpdateAvatar({ avatar }: { avatar: string }) {
    api
      .patchUserAvatar(avatar)
      .then((updatedUser: User) => {
        setCurrentUser(updatedUser)
        dispatchPopupAction({
          type: 'close-all',
        })
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <EditProfilePopup
        isOpen={popupState.openedPopup === 'edit-profile'}
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        onUpdateUser={handleUpdateUser}
        currentUser={currentUser}
      />

      <AddPlacePopup
        isOpen={popupState.openedPopup === 'add-place'}
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={popupState.openedPopup === 'edit-avatar'}
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={
          popupState.openedPopup === 'show-image'
            ? popupState.selectedCard
            : undefined
        }
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
      />

      <div className="page">
        <Header
          isBurgerVisible={true}
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`header__menu ${
              isMenuOpen ? '' : 'header__menu_hidden'
            }`}
          >
            <span className="header__user-email">{currentUser.email}</span>
            <button className="header__sign-out" onClick={handleSignOut}>
              Выйти
            </button>
          </div>
        </Header>

        <Main
          dispatchPopupAction={dispatchPopupAction}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          currentUser={currentUser}
        />

        <Footer />
      </div>
    </>
  )
}

export default App
