import { Link } from 'react-router-dom';
import Auth from './Auth';
import InfoTooltip from './InfoTooltip';

function Register({ onRegister, onCloseRegisterTooltip, isTooltipOpen, tooltipShowsSuccess }) {
  return (
    <>
      <InfoTooltip onClose={onCloseRegisterTooltip} isOpen={isTooltipOpen} isSuccess={tooltipShowsSuccess}></InfoTooltip>
      <Auth headerText="Регистрация" buttonText="Зарегистрироваться" onSubmitAuth={onRegister} />
      <Link className='auth__link' to='/sing-in'>Уже зарегистрированы? Войти</Link>
    </>
  );
}

export default Register;
