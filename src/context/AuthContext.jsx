import { createContext, useContext, useEffect, useState } from 'react'
import { configured, supabase } from '../supabase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// keep the same user shape the pages already use
const shape = (u) => u && { uid: u.id, email: u.email, displayName: u.user_metadata?.name || '' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(configured)

  useEffect(() => {
    if (!configured) return
    supabase.auth.getSession().then(({ data }) => {
      setUser(shape(data.session?.user))
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setUser(shape(session?.user)))
    return () => sub.subscription.unsubscribe()
  }, [])

  async function signup(name, email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    if (error) throw new Error(error.message)
    // happens when "Confirm email" is switched on in Supabase
    if (!data.session) throw new Error('Account created. Check your email to confirm it, then log in.')
  }

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  const logout = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, loading, configured, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
