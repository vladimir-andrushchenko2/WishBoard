import { useEffect, useState, useReducer } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

import Header from './elements/Header'
import Main from './pages/Main'
import Footer from './elements/Footer'
import ProtectedRoute from './utils/ProtectedRoute'
import Register from './pages/Register'
import Login from './pages/Login'

import {
  initialState as initialPopupState,
  popupReducer,
} from '../reducers/popupReducer'

import { api } from '../utils/api'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Popups from './popups/Popups'

function App() {
  const [popupState, dispatchPopupAction] = useReducer(
    popupReducer,
    initialPopupState
  )

  const [currentUser, setCurrentUser] = useState<User>()

  const [cards, setCards] = useState<Card[]>([])

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const history = useHistory()

  function handleSignOut() {
    api
      .signOut()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.error(err))
    setIsLoggedIn(false)
  }

  function handleRegister(email: string, password: string) {
    return api
      .signUp(email, password)
      .then(() => {
        dispatchPopupAction({ type: 'open-success-tooltip' })
        history.push('/sign-in')
      })
      .catch((err) => {
        console.error(err)
        dispatchPopupAction({ type: 'open-error-tooltip' })
      })
  }

  async function handleLogin(email: string, password: string) {
    try {
      await api.signIn(email, password)
      setIsLoggedIn(true)

      history.push('/')
    } catch {
      dispatchPopupAction({ type: 'open-error-tooltip' })
    }
  }

  function handleCloseLoginTooltip() {
    dispatchPopupAction({ type: 'close-all' })
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

  // I use this to check if user has a valid jwt cookie
  // not to force user to login again upon reload
  useEffect(() => {
    api
      .getUserInfo()
      .then(() => {
        setIsLoggedIn(true)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((initialCards: Card[]) => {
          setCards(initialCards)
        })
        .catch((err) => console.error(err))
    } else {
      setCards([])
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((user: User) => {
          setCurrentUser(user)
          setIsLoggedIn(true)
        })
        .catch((err) => console.error(err))
    } else {
      // удаляю данные о пользователе если пользователь вышел
      // для этого в зависимостях isLoggedIn
      setCurrentUser(undefined)
    }
  }, [isLoggedIn])

  useEffect(() => {
    function closePopUpOnEsc({ key }: { key: string }) {
      if (key === 'Escape') {
        // closeAllPopups()
        dispatchPopupAction({
          type: 'close-all',
        })
      }
    }

    document.addEventListener('keydown', closePopUpOnEsc)

    return () => {
      document.removeEventListener('keydown', closePopUpOnEsc)
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Popups
        popupState={popupState}
        dispatchPopupAction={dispatchPopupAction}
        cards={cards}
        setCards={setCards}
        setCurrentUser={setCurrentUser}
      />

      <div className="page">
        <Header onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            checkCallback={() => isLoggedIn}
            redirectPath="/sign-in"
            dispatchPopupAction={dispatchPopupAction}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <ProtectedRoute
            path="/sign-in"
            component={Login}
            checkCallback={() => !isLoggedIn}
            redirectPath="/main"
            onLogin={handleLogin}
            onCloseLoginTooltip={handleCloseLoginTooltip}
            isTooltipOpen={
              popupState.openedPopup === 'success-tooltip' ||
              popupState.openedPopup === 'error-tooltip'
            }
            tooltipShowsSuccess={popupState.openedPopup === 'success-tooltip'}
          />

          <ProtectedRoute
            path="/sign-up"
            component={Register}
            checkCallback={() => !isLoggedIn}
            redirectPath="/main"
            onRegister={handleRegister}
          />

          <Route path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        {isLoggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
