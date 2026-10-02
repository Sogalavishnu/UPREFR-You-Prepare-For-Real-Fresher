import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Auth({ mode }) {
  const isSignup = mode === 'signup'
  const { user, signup, login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/home" replace />

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (isSignup && !name.trim()) return setError('Please enter your name.')
    setBusy(true)
    try {
      if (isSignup) await signup(name.trim(), email.trim(), password)
      else await login(email.trim(), password)
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const field = 'mt-1 w-full rounded-lg border-2 border-pink-100 px-3 py-2.5 focus:border-pink-500 focus:outline-none'

  return (
    <div className="wash min-h-[calc(100vh-61px)] px-4 py-14">
      <form onSubmit={submit} className="mx-auto w-full max-w-md rounded-2xl border-2 border-pink-200 bg-white p-7">
        <h1 className="text-3xl font-semibold">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
        <p className="mb-5 mt-1 text-mute">
          {isSignup ? 'Sign up with your email to save your scores.' : 'Log in to pick up where you left off.'}
        </p>
        {isSignup && (
          <label className="mb-3 block text-sm font-medium">Name
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
        )}
        <label className="mb-3 block text-sm font-medium">Email
          <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        <label className="block text-sm font-medium">Password
          <input type="password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignup ? 'new-password' : 'current-password'} required />
        </label>
        <p className="min-h-6 pt-2 text-sm font-medium text-rose-700">{error}</p>
        <button disabled={busy} className="w-full rounded-full bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-60">
          {busy ? 'Please wait...' : isSignup ? 'Sign up' : 'Log in'}
        </button>
        <p className="mt-4 text-center text-sm">
          {isSignup ? 'Already have an account? ' : 'New here? '}
          <Link to={isSignup ? '/login' : '/signup'} className="font-semibold text-pink-700 underline">
            {isSignup ? 'Log in' : 'Create an account'}
          </Link>
        </p>
      </form>
    </div>
  )
}
