import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { levels, subjects } from '../data/questions'
import { getProgress } from '../lib/db'

export default function Home() {
  const { user } = useAuth()
  const [progress, setProgress] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    getProgress(user.uid).then(setProgress).catch(() => setError('Could not load your progress.'))
  }, [user.uid])

  const scores = Object.values(progress)
  const average = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length)) : 0

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-4xl font-semibold md:text-5xl">Hi {(user.displayName || 'there').split(' ')[0]}, ready to practise?</h1>
      <p className="mt-2 text-lg text-mute">
        {scores.length} of 18 levels attempted{scores.length ? ` · average score ${average}%` : ''}
      </p>
      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}

      <section className="mt-8 rounded-3xl bg-pink-50 p-6 md:p-10">
        <h2 className="text-3xl font-semibold">About UPREFR</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">
          UPREFR stands for U Prepare For Real Fresher. It gives you practical interview questions in six core subjects,
          so you can practise the way placements really test you.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ['50 questions per subject', '20 Beginner, 20 Medium and 10 Advanced.'],
            ['Timed practice', '30 seconds a question, with the answer shown straight away.'],
            ['Track your progress', 'Your best score for every level is saved to your account.'],
          ].map(([title, text]) => (
            <div key={title} className="border-l-4 border-pink-400 pl-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-mute">{text}</p>
            </div>
          ))}
        </div>
        <Link to="/about" className="mt-6 inline-block rounded-full bg-pink-600 px-6 py-2.5 font-semibold text-white hover:bg-pink-700">
          See more about UPREFR →
        </Link>
      </section>

      <h2 id="subjects" className="mb-4 mt-10 text-2xl font-semibold">Choose a subject</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <li key={s.slug}>
            <Link to={`/subjects/${s.slug}`} className="block h-full rounded-2xl border-2 border-pink-100 p-5 hover:border-pink-500 hover:bg-pink-50">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-pink-600 font-bold text-white">{s.short}</span>
              <p className="mt-4 text-lg font-semibold leading-snug">{s.name}</p>
              <div className="mt-3 flex gap-1.5" aria-label="Levels attempted">
                {levels.map((l, i) => (
                  <span key={l} title={l} className={'h-2 flex-1 rounded-full ' + (progress[`${s.slug}-${i}`] != null ? 'bg-pink-500' : 'bg-pink-100')} />
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
