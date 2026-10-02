import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Pick from './pages/Pick'
import Quiz from './pages/Quiz'
import About from './pages/About'
import Contact from './pages/Contact'

function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <p className="p-16 text-center text-mute">Loading...</p>
  return user ? children : <Navigate to="/login" replace />
}

function SetupNotice() {
  return (
    <div className="mx-auto max-w-lg p-10">
      <h1 className="text-2xl font-semibold">Supabase is not configured yet</h1>
      <p className="mt-3 text-mute">
        Copy <code>.env.example</code> to <code>.env</code>, add your Supabase URL and anon key, and restart the dev server.
        On Vercel or Netlify, add the same two variables in the project settings.
      </p>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const { configured } = useAuth()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  if (!configured) return <SetupNotice />

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/subjects/:slug" element={<Protected><Pick /></Protected>} />
        <Route path="/quiz/:slug/:level" element={<Protected><Quiz /></Protected>} />
        <Route path="/contact" element={<Protected><Contact /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
