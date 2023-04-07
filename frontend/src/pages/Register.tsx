import { Link } from 'react-router-dom'
import Auth from '../components/elements/Auth'
import InfoTooltip from '../popups/InfoTooltip'
import { useReducer } from 'react'
import { useHistory } from 'react-router-dom'

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

  function handleCloseRegisterTooltip() {
    if (popupState.openedPopup === 'success-tooltip') {
      dispatchPopupAction({ type: 'close-all' })
      history.push('/sign-in')
    } else {
      dispatchPopupAction({ type: 'close-all' })
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

  const history = useHistory()

  return (
    <>
      <InfoTooltip
        onClose={handleCloseRegisterTooltip}
        isOpen={
          popupState.openedPopup === 'error-tooltip' ||
          popupState.openedPopup === 'success-tooltip'
        }
        isSuccess={popupState.openedPopup === 'success-tooltip'}
      ></InfoTooltip>
      <Auth
        headerText="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmitAuth={handleRegister}
      />
      <Link className="auth__link" to="/sing-in">
        Уже зарегистрированы? Войти
      </Link>
    </>
  )
}

export default Register
