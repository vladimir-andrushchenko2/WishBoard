import { useState } from 'react';
import { useContext } from 'react';
import { useLocation, Link, Switch, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header({ onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${isAuthPage ? 'header_auth' : ''}`}>
      <div className="header__container">
        <div className="logo"></div>
        <Switch>
          <Route exact path='/'>
            <button onClick={handleMenuClick} className={`burger ${isMenuOpen ? 'burger_active' : ''}`} type="button" aria-label="меню">
              <span className="burger__line"></span>
              <span className="burger__line"></span>
              <span className="burger__line"></span>
            </button>
          </Route>
        </Switch>
      </div>
      <Switch>
        <Route exact path='/'>
          <div className={`header__menu ${isMenuOpen ? '' : 'header__menu_hidden'}`}>
            <span className='header__user-email'>{currentUser?.protectedData?.email}</span>
            <button className='header__sign-out' onClick={onSignOut}>Выйти</button>
          </div>
        </Route>
        <Route path='/sign-in'>
          <Link className='header__action' to="sign-up">Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link className='header__action' to="sign-in">Войти</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
