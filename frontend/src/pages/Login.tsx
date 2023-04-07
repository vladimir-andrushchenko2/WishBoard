import { useReducer } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import Auth from '../components/elements/Auth'
import InfoTooltip from '../popups/InfoTooltip'
import Header from '../components/elements/Header'

import {
  initialState as initialPopupState,
  popupReducer,
} from '../reducers/popupReducer'

import { api } from '../utils/api'

function Login() {
  const [popupState, dispatchPopupAction] = useReducer(
    popupReducer,
    initialPopupState
  )

  const navigate = useNavigate()

  async function handleLogin(email: string, password: string) {
    try {
      await api.signIn(email, password)
      navigate('/')
    } catch {
      dispatchPopupAction({ type: 'open-error-tooltip' })
    }
  }

  return (
    <div className="page">
      <Header isBurgerVisible={false} isMenuOpen={false}>
        <Link className="header__action" to="/register">
          Регистрация
        </Link>
      </Header>
      <InfoTooltip
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        isOpen={
          popupState.openedPopup === 'error-tooltip' ||
          popupState.openedPopup === 'success-tooltip'
        }
        isSuccess={popupState.openedPopup === 'success-tooltip'}
      ></InfoTooltip>
      <Auth headerText="Вход" buttonText="Войти" onSubmitAuth={handleLogin} />
    </div>
  )
}

export default Login
