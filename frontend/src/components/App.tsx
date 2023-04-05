import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './elements/Header';
import Main from './pages/Main';
import ImagePopup from './popups/ImagePopup';
import Footer from './elements/Footer';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ProtectedRoute from './utils/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';

import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState<Card>();

  const [currentUser, setCurrentUser] = useState<User>();

  const [cards, setCards] = useState<Card[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const [tooltipShowsSuccess, setTooltipShowsSuccess] = useState(false);

  const history = useHistory();

  function handleAddPlaceSubmit(name: string, link: string) {
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleSignOut() {
    // localStorage.removeItem('jwt');
    api.signOut().then((res) => {
      console.log(res);
    });
    setIsLoggedIn(false);
  }

  function handleRegister(email: string, password: string) {
    return api
      .signUp(email, password)
      .then(({ data }) => {
        setTooltipShowsSuccess(true);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        console.error(`Error status code ${err}`);
        setTooltipShowsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function handleCloseRegisterTooltip() {
    if (tooltipShowsSuccess) {
      setIsTooltipOpen(false);
      history.push('/sign-in');
    } else {
      setIsTooltipOpen(false);
    }
  }

  function handleLogin(email: string, password: string) {
    return api
      .signIn(email, password)
      .then(() => {
        setIsLoggedIn(true);

        history.push('/');
      })
      .catch((status) => {
        setTooltipShowsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function handleCloseLoginTooltip() {
    setIsTooltipOpen(false);
  }

  function handleCardLike(card: Card) {
    if (!currentUser) {
      throw new Error(
        'Impossible to like a card without current user selected',
      );
    }

    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function updateCards(updatedCard: Card) {
      setCards(
        cards.map((card) =>
          card._id === updatedCard._id ? updatedCard : card,
        ),
      );
    }

    if (!isLiked) {
      api
        .putCardLike(card._id)
        .then(updateCards)
        .catch((err) => console.error(err));
    } else {
      api
        .deleteCardLike(card._id)
        .then(updateCards)
        .catch((err) => console.error(err));
    }
  }

  function handleCardDelete(cardToDelete: Card) {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardToDelete._id));
      })
      .catch((err) => console.error(err));
  }

  // onClick={() => handleCardClick(card)}
  function handleCardClick(card: Card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }: { name: string; about: string }) {
    api
      .patchUserInfo(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar({ avatar }: { avatar: string }) {
    api
      .patchUserAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);

    setIsEditAvatarPopupOpen(false);

    setIsEditProfilePopupOpen(false);

    setSelectedCard(undefined);
  }

  // I use this to check if user has a valid jwt cookie
  // not to force user to login again upon reload
  useEffect(() => {
    api.getUserInfo().then(() => {
      setIsLoggedIn(true);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => console.error(err));
    } else {
      setCards([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser({ ...userInfo });
          setIsLoggedIn(true);
        })
        .catch((err) => console.error(err));
    } else {
      // удаляю данные о пользователе если пользователь вышел
      // для этого в зависимостях isLoggedIn
      setCurrentUser(undefined);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function closePopUpOnEsc({ key }: { key: string }) {
      if (key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closePopUpOnEsc);

    return () => {
      document.removeEventListener('keydown', closePopUpOnEsc);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <div className="page">
        <Header onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            checkCallback={() => isLoggedIn}
            redirectPath="/sign-in"
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
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
            isTooltipOpen={isTooltipOpen}
            tooltipShowsSuccess={tooltipShowsSuccess}
          />

          <ProtectedRoute
            path="/sign-up"
            component={Register}
            checkCallback={() => !isLoggedIn}
            redirectPath="/main"
            onRegister={handleRegister}
            onCloseRegisterTooltip={handleCloseRegisterTooltip}
            isTooltipOpen={isTooltipOpen}
            tooltipShowsSuccess={tooltipShowsSuccess}
          />

          <Route path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        {isLoggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
