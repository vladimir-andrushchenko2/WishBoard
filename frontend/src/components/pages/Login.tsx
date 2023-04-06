import Auth from '../elements/Auth'

type LoginProps = {
  onLogin: (email: string, password: string) => Promise<void>
}

function Login({ onLogin }: LoginProps) {
  return <Auth headerText="Вход" buttonText="Войти" onSubmitAuth={onLogin} />
}

export default Login
