import { useReducer } from 'react'
import { useHistory } from 'react-router-dom'

import Auth from '../components/elements/Auth'
import InfoTooltip from '../popups/InfoTooltip'

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

  const history = useHistory()

  async function handleLogin(email: string, password: string) {
    try {
      await api.signIn(email, password)
      history.push('/')
    } catch {
      dispatchPopupAction({ type: 'open-error-tooltip' })
    }
  }

  return (
    <>
      <InfoTooltip
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        isOpen={
          popupState.openedPopup === 'error-tooltip' ||
          popupState.openedPopup === 'success-tooltip'
        }
        isSuccess={popupState.openedPopup === 'success-tooltip'}
      ></InfoTooltip>
      <Auth headerText="Вход" buttonText="Войти" onSubmitAuth={handleLogin} />
    </>
  )
}

export default Login
