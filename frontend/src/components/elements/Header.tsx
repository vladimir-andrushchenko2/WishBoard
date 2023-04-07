import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type HeaderProps = PropsWithChildren<{
  isBurgerVisible: boolean
  isMenuOpen: boolean
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>
}>

function Header({
  isBurgerVisible,
  children,
  isMenuOpen,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className={`header ${!isBurgerVisible ? 'header_auth' : ''}`}>
      <div className="header__container">
        <div className="logo"></div>
        {isBurgerVisible && (
          <button
            onClick={onMenuClick}
            className={`burger ${isMenuOpen ? 'burger_active' : ''}`}
            type="button"
            aria-label="меню"
          >
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </button>
        )}
      </div>

      {children}
    </header>
  )
}

export default Header
