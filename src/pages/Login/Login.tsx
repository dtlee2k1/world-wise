import { useState, useEffect } from 'react'
import styles from './Login.module.css'
import PageNav from '../../components/PageNav'
import Button from '../../components/Button'
import { useAuth } from '../../utils/customHooks'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  // get methods from authContext
  const { login, isAuthenticated } = useAuth()
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState<string>('thailee@example.com')
  const [password, setPassword] = useState<string>('qwerty')

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) login(email, password)
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  )
}