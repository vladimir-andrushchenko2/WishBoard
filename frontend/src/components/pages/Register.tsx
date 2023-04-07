import { Link } from 'react-router-dom'
import Auth from '../elements/Auth'
import InfoTooltip from '../popups/InfoTooltip'

type RegisterProps = {
  onRegister: (email: string, password: string) => Promise<void>
  onCloseRegisterTooltip: () => void
  isTooltipOpen: boolean
  tooltipShowsSuccess: boolean
}

function Register({
  onRegister,
  onCloseRegisterTooltip,
  isTooltipOpen,
  tooltipShowsSuccess,
}: RegisterProps) {
  return (
    <>
      <InfoTooltip
        onClose={onCloseRegisterTooltip}
        isOpen={isTooltipOpen}
        isSuccess={tooltipShowsSuccess}
      ></InfoTooltip>
      <Auth
        headerText="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmitAuth={onRegister}
      />
      <Link className="auth__link" to="/sing-in">
        Уже зарегистрированы? Войти
      </Link>
    </>
  )
}

export default Register
