import Auth from '../elements/Auth'
import InfoTooltip from '../popups/InfoTooltip'

type LoginProps = {
  onLogin: (email: string, password: string) => Promise<void>
  onCloseLoginTooltip: () => void
  isTooltipOpen: boolean
  tooltipShowsSuccess: boolean
}

function Login({
  onLogin,
  onCloseLoginTooltip,
  isTooltipOpen,
  tooltipShowsSuccess,
}: LoginProps) {
  return (
    <>
      <InfoTooltip
        onClose={onCloseLoginTooltip}
        isOpen={isTooltipOpen}
        isSuccess={tooltipShowsSuccess}
      ></InfoTooltip>
      <Auth headerText="Вход" buttonText="Войти" onSubmitAuth={onLogin} />
    </>
  )
}

export default Login
