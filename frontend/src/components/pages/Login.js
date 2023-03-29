import Auth from '../elements/Auth';
import InfoTooltip from '../popups/InfoTooltip';

function Login({ onLogin, onCloseLoginTooltip, isTooltipOpen, tooltipShowsSuccess }) {
  return (
    <>
      <InfoTooltip onClose={onCloseLoginTooltip} isOpen={isTooltipOpen} isSuccess={tooltipShowsSuccess}></InfoTooltip>
      <Auth headerText="Вход" buttonText="Войти" onSubmitAuth={onLogin} />
    </>
  );
}

export default Login;
