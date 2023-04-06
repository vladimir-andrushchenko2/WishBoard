import { Link } from 'react-router-dom'
import Auth from '../elements/Auth'

type RegisterProps = {
  onRegister: (email: string, password: string) => Promise<void>
}

function Register({ onRegister }: RegisterProps) {
  return (
    <>
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
