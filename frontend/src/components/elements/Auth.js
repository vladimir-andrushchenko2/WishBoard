import { useRef } from 'react';
import { useState } from 'react';

function Auth({ headerText, buttonText, onSubmitAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const emailErrorRef = useRef();
  const passwordErrorRef = useRef();

  function handleEmailChange({ target }) {
    setIsEmailValid(target.validity.valid);
    emailErrorRef.current.textContent = target.validationMessage;
    setEmail(target.value);
  }

  function handlePasswordChange({ target }) {
    setIsPasswordValid(target.validity.valid);
    passwordErrorRef.current.textContent = target.validationMessage;
    setPassword(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitAuth(email, password);
    setEmail('');
    setPassword('');
  }

  const someInputsEmpty = [email, password].some(element => element.length === 0);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className='auth__header'>{headerText}</h1>
        <form className='auth__form' onSubmit={handleSubmit} noValidate>
          <input className='auth__input' type="email" name="email" value={email} placeholder='Email' onChange={handleEmailChange} autoComplete="username" />
          <p className='auth__input-error' ref={emailErrorRef}></p>
          <input className='auth__input' minLength={8} type="password" name="password" value={password} placeholder='Пароль' onChange={handlePasswordChange} autoComplete="current-password" />
          <p className='auth__input-error' ref={passwordErrorRef}></p>
          <input className='auth__submit' type="submit" value={buttonText} disabled={!isPasswordValid || !isEmailValid || someInputsEmpty} />
        </form>
      </div>
    </div>
  )
}

export default Auth;
