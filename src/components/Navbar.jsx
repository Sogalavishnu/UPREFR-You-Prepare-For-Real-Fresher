import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { subjects } from '../data/questions'
import Logo from './Logo'

const linkClass = ({ isActive }) =>
  'rounded-lg px-3 py-2 font-medium ' + (isActive ? 'text-pink-600' : 'hover:bg-pink-50')

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const go = (path) => {
    setMenu(false)
    setDropdown(false)
    navigate(path)
  }
  const subjectItems = subjects.map((s) => (
    <button
      key={s.slug}
      onClick={() => go(user ? `/subjects/${s.slug}` : '/login')}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-pink-50"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-pink-100 text-xs font-bold text-pink-700">{s.short}</span>
      {s.name}
    </button>
  ))
  const links = (
    <>
      <NavLink to={user ? '/home' : '/signup'} onClick={() => setMenu(false)} className={linkClass}>Take Quiz</NavLink>
      <NavLink to="/about" onClick={() => setMenu(false)} className={linkClass}>About</NavLink>
      {user && <NavLink to="/contact" onClick={() => setMenu(false)} className={linkClass}>Contact</NavLink>}
    </>
  )

  return (
    <header className="sticky top-0 z-30 border-b border-pink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to={user ? '/home' : '/'} className="flex items-center gap-2 font-serif text-xl font-semibold">
          <Logo /> UPREFR
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <div className="relative" onMouseLeave={() => setDropdown(false)}>
            <button onClick={() => setDropdown(!dropdown)} aria-expanded={dropdown} className="rounded-lg px-3 py-2 font-medium hover:bg-pink-50">
              Subjects ▾
            </button>
            {dropdown && (
              <div className="absolute left-0 top-full w-72 pt-1">
                <div className="rounded-xl border border-pink-200 bg-white p-2 shadow-lg">{subjectItems}</div>
              </div>
            )}
          </div>
          {links}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden font-medium sm:inline">Hi, {(user.displayName || 'there').split(' ')[0]}</span>
              <button onClick={async () => { await logout(); go('/') }} className="rounded-full border border-pink-300 px-4 py-1.5 text-sm font-medium text-pink-700 hover:bg-pink-50">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full border border-pink-300 px-4 py-1.5 text-sm font-medium text-pink-700 hover:bg-pink-50">Log in</Link>
              <Link to="/signup" className="rounded-full bg-pink-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-pink-700">Sign up</Link>
            </>
          )}
          <button className="rounded-lg border border-pink-200 p-2 md:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={menu ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
          </button>
        </div>
      </div>
      {menu && (
        <div className="border-t border-pink-100 px-4 pb-4 pt-2 md:hidden">
          <p className="px-3 py-1 text-xs font-medium text-mute">Subjects</p>
          {subjectItems}
          <div className="mt-2 flex flex-col border-t border-pink-100 pt-2">{links}</div>
        </div>
      )}
    </header>
  )
}
