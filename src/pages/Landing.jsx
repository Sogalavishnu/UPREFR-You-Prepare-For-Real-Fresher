import { Link } from 'react-router-dom'
import { subjects } from '../data/questions'

const points = [
  ['Timed like the real thing', 'Thirty seconds a question keeps you honest.'],
  ['Three levels each', 'Start at Beginner, then push into Advanced.'],
  ['Answers straight away', 'See what was right and where you slipped.'],
]

export default function Landing() {
  return (
    <>
      <section className="wash relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 pb-28 pt-16 text-center md:pt-24">
          <p className="font-serif text-xl italic text-pink-700">You Prepare For Real Fresher</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            Bridge the gap between classroom theory and real placement interviews.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Practical questions across six core CS subjects, made for freshers who want to walk in ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="rounded-full bg-pink-600 px-7 py-3 font-semibold text-white hover:bg-pink-700">Sign up free</Link>
            <Link to="/login" className="rounded-full border-2 border-pink-600 px-7 py-3 font-semibold text-pink-700 hover:bg-white">Log in</Link>
          </div>
        </div>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute bottom-0 left-0 block h-12 w-full">
          <path d="M0 30C240 70 480 0 720 30S1200 60 1440 20V60H0Z" fill="#fff" />
        </svg>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 text-center">
        <p className="font-brush text-5xl uppercase leading-tight text-pink-600 sm:text-6xl md:text-7xl">You prepare for real fresher</p>
        <svg viewBox="0 0 200 12" className="mx-auto mt-3 h-3 w-48 text-pink-300" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M3 7c14-8 20 6 34 0s20 6 34 0 20 6 34 0 20 6 34 0 20 6 24 2" />
        </svg>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold">Six subjects, one goal</h2>
          <p className="max-w-[16rem] -rotate-2 rounded-md border border-pink-200 bg-pink-100 px-4 py-3 text-sm">
            Tip: finish Beginner first, then move up a level.
          </p>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <li key={s.slug}>
              <Link to="/login" className="flex items-center gap-4 rounded-2xl border-2 border-pink-100 p-4 hover:border-pink-500 hover:bg-pink-50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-pink-600 font-bold text-white">{s.short}</span>
                <span className="font-semibold leading-snug">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-12 md:grid-cols-3">
        {points.map(([title, text]) => (
          <div key={title} className="border-l-4 border-pink-400 pl-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-1 text-mute">{text}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-pink-100 py-8 text-center text-sm text-mute">
        UPREFR · U Prepare For Real Fresher
      </footer>
    </>
  )
}
