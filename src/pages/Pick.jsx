import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { levels, subjects } from '../data/questions'
import { getProgress } from '../lib/db'

const blurbs = ['Warm-up basics', 'Interview staples', 'Tough follow-ups']

export default function Pick() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [progress, setProgress] = useState({})
  const subject = subjects.find((s) => s.slug === slug)

  useEffect(() => {
    getProgress(user.uid).then(setProgress).catch(() => {})
  }, [user.uid])

  if (!subject) return <Navigate to="/home" replace />

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <Link to="/home" className="text-sm font-medium text-pink-700 underline">All subjects</Link>
      <h1 className="mt-3 text-4xl font-semibold">{subject.name}</h1>
      <p className="mt-2 text-mute">Pick a level. Each round has up to 10 random questions, 30 seconds each.</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {levels.map((level, i) => {
          const best = progress[`${slug}-${i}`]
          return (
            <li key={level}>
              <Link to={`/quiz/${slug}/${i}`} className="block h-full rounded-2xl border-2 border-pink-100 p-5 hover:border-pink-500 hover:bg-pink-50">
                <p className="text-sm font-medium text-pink-700">{'●'.repeat(i + 1)}{'○'.repeat(2 - i)}</p>
                <h2 className="mt-2 text-2xl font-semibold">{level}</h2>
                <p className="mt-1 text-mute">{blurbs[i]}</p>
                <p className="mt-4 text-sm font-medium">{best != null ? `Best score: ${best}%` : 'Not attempted yet'}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
