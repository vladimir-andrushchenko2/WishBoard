import Auth from './Auth';
import InfoTooltip from './InfoTooltip';

function Login({ onLogin, onCloseLoginTooltip, isTooltipOpen, tooltipShowsSuccess }) {
  return (
    <>
      <InfoTooltip onClose={onCloseLoginTooltip} isOpen={isTooltipOpen} isSuccess={tooltipShowsSuccess}></InfoTooltip>
      <Auth headerText="Вход" buttonText="Войти" onSubmitAuth={onLogin} />
    </>
  );
}

export default Login;
