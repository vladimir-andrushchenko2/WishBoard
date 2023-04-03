import React, { useContext, useRef } from 'react';

import Card from '../elements/Card';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarRef = useRef();

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
          <div className="profile__picture-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__title">
          <h1 className="profile__title-text">{currentUser.name}</h1>
          <button
            type="button"
            className="button profile__modify-button"
            aria-label="Изменить профиль"
            onClick={onEditProfile}
          ></button>
        </div>

        <p className="profile__subtitle">{currentUser.about}</p>

        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items">
          {cards.map(card =>
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;
