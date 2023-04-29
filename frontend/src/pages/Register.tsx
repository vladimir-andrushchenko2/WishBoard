import { Link } from 'react-router-dom'
import Auth from '../components/elements/Auth'
import InfoTooltip from '../popups/InfoTooltip'
import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/elements/Header'

import {
  initialState as initialPopupState,
  popupReducer,
} from '../reducers/popupReducer'

import { api } from '../utils/api'

function Register() {
  const [popupState, dispatchPopupAction] = useReducer(
    popupReducer,
    initialPopupState
  )

  const navigate = useNavigate()

  function handleCloseRegisterTooltip() {
    dispatchPopupAction({ type: 'close-all' })

    if (popupState.openedPopup === 'success-tooltip') {
      navigate('/login')
    }
  }

  function handleRegister(email: string, password: string) {
    return api
      .signUp(email, password)
      .then(() => {
        dispatchPopupAction({ type: 'open-success-tooltip' })
      })
      .catch((err) => {
        console.error(err)
        dispatchPopupAction({ type: 'open-error-tooltip' })
      })
  }

  return (
    <div className="page">
      <Header isBurgerVisible={false} isMenuOpen={false}>
        <Link className="header__action" to="/login">
          Login
        </Link>
      </Header>
      <InfoTooltip
        onFailMsg="Somethis went wrong. Maybe user with such email is already registered"
        onSuccessMsg="You successfully registered, you will be redirected to the login page"
        onClose={handleCloseRegisterTooltip}
        isOpen={
          popupState.openedPopup === 'error-tooltip' ||
          popupState.openedPopup === 'success-tooltip'
        }
        isSuccess={popupState.openedPopup === 'success-tooltip'}
      ></InfoTooltip>
      <Auth
        headerText="Register"
        buttonText="Register"
        onSubmitAuth={handleRegister}
      />
      <Link className="auth__link" to="/login">
        Already registered? Login
      </Link>
    </div>
  )
}

export default Register
