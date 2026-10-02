import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { levels, questions, subjects } from '../data/questions'
import { saveScore } from '../lib/db'

const SECONDS = 30
const ROUND = 10 // questions per round, picked at random from the level

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const build = (slug, level) =>
  shuffle(questions[slug][level]).slice(0, ROUND).map((x) => ({ q: x.q, a: x.a, options: shuffle([x.a, ...x.wrong]) }))

// keyed wrapper so moving to another level starts a fresh round
export default function Quiz() {
  const { slug, level } = useParams()
  return <QuizRound key={`${slug}-${level}`} />
}

function QuizRound() {
  const { slug, level } = useParams()
  const l = Number(level)
  const { user } = useAuth()
  const subject = subjects.find((s) => s.slug === slug)
  const valid = Boolean(subject && levels[l])

  const [qs, setQs] = useState(() => (valid ? build(slug, l) : []))
  const [n, setN] = useState(0)
  const [score, setScore] = useState(0)
  const [log, setLog] = useState([])
  const [left, setLeft] = useState(SECONDS)
  const [picked, setPicked] = useState(null) // option index, -1 = timed out
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!valid || picked !== null || finished) return
    if (left <= 0) return choose(-1)
    const t = setTimeout(() => setLeft(left - 1), 1000)
    return () => clearTimeout(t)
  }, [left, picked, finished])

  if (!valid) return <Navigate to="/home" replace />

  const q = qs[n]

  function choose(i) {
    if (picked !== null) return
    const ok = i >= 0 && q.options[i] === q.a
    if (ok) setScore((s) => s + 1)
    setPicked(i)
    setLog((old) => [...old, { q: q.q, a: q.a, ok, timedOut: i < 0 }])
  }

  function next() {
    if (n === qs.length - 1) {
      saveScore(user.uid, `${slug}-${l}`, Math.round((score / qs.length) * 100)).catch(() => {})
      setFinished(true)
    } else {
      setN(n + 1)
      setPicked(null)
      setLeft(SECONDS)
    }
  }

  function retry() {
    setQs(build(slug, l))
    setN(0); setScore(0); setLog([]); setLeft(SECONDS); setPicked(null); setFinished(false)
  }

  if (finished) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="text-center">
          <p className="mx-auto grid h-32 w-32 place-items-center rounded-full border-4 border-pink-500 bg-pink-50 font-serif text-5xl font-semibold text-pink-700">{score}/{qs.length}</p>
          <h1 className="mt-5 text-3xl font-semibold">{score === qs.length ? 'Perfect round!' : score / qs.length >= 0.6 ? 'Nice work!' : 'Good start'}</h1>
          <p className="text-mute">{subject.name} · {levels[l]}</p>
        </div>
        <ul className="mt-8 divide-y divide-pink-100 rounded-2xl border-2 border-pink-100">
          {log.map((x, i) => (
            <li key={i} className="flex justify-between gap-4 p-4">
              <div>
                <p className="font-medium">{x.q}</p>
                {!x.ok && <p className="mt-1 text-sm text-mute">Answer: {x.a}</p>}
              </div>
              <span className={'shrink-0 text-sm font-bold ' + (x.ok ? 'text-green-700' : 'text-rose-700')}>
                {x.ok ? 'Correct' : x.timedOut ? 'Timed out' : 'Wrong'}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={retry} className="rounded-full bg-pink-600 px-6 py-2.5 font-semibold text-white hover:bg-pink-700">Try again</button>
          {l < 2 && <Link to={`/quiz/${slug}/${l + 1}`} className="rounded-full border-2 border-pink-600 px-6 py-2.5 font-semibold text-pink-700 hover:bg-pink-50">Try {levels[l + 1]}</Link>}
          <Link to="/home" className="rounded-full border-2 border-pink-200 px-6 py-2.5 font-semibold hover:bg-pink-50">All subjects</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <div className="flex items-baseline justify-between text-sm">
        <p className="font-medium">{subject.name} · {levels[l]} · Question {n + 1} of {qs.length}</p>
        <p className={'font-bold tabular-nums ' + (left <= 8 ? 'text-rose-700' : '')}>0:{String(left).padStart(2, '0')}</p>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-pink-100">
        <div className="h-full rounded-full bg-pink-500 transition-[width] duration-1000 ease-linear" style={{ width: `${(left / SECONDS) * 100}%` }} />
      </div>

      <h1 className="mb-6 mt-8 text-2xl font-semibold leading-snug md:text-3xl">{q.q}</h1>
      <div className="grid gap-3">
        {q.options.map((o, i) => {
          const done = picked !== null
          const state = !done ? 'border-pink-100 hover:border-pink-500 hover:bg-pink-50'
            : o === q.a ? 'border-green-600 bg-green-50'
            : i === picked ? 'border-rose-600 bg-rose-50' : 'border-pink-100 opacity-70'
          return (
            <button key={o} disabled={done} onClick={() => choose(i)} className={'flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left ' + state}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">{'ABCD'[i]}</span>
              {o}
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-pink-50 p-4">
          <p><b>{picked < 0 ? "Time's up. " : q.options[picked] === q.a ? 'Correct! ' : 'Not quite. '}</b>Answer: {q.a}</p>
          <button autoFocus onClick={next} className="rounded-full bg-pink-600 px-6 py-2 font-semibold text-white hover:bg-pink-700">
            {n === qs.length - 1 ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </main>
  )
}
