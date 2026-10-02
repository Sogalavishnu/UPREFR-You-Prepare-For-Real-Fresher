import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex items-center gap-4">
        <Logo size={64} />
        <h1 className="text-4xl font-semibold">About UPREFR</h1>
      </div>
      <p className="mt-6 text-lg leading-relaxed">
        UPREFR stands for <b>U Prepare For Real Fresher</b>. It is a personal project for freshers who want to practise
        the kind of questions placement interviews actually ask, without wading through pages of theory first.
      </p>
      <h2 className="mt-10 text-2xl font-semibold">What you get</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
        <li>Six core subjects: networks, data structures, databases, operating systems, system design and algorithms.</li>
        <li>Beginner, Medium and Advanced rounds in every subject.</li>
        <li>Timed questions with the right answer shown straight away.</li>
        <li>Your best score for each round saved to your account.</li>
      </ul>
      <h2 className="mt-10 text-2xl font-semibold">Who built it</h2>
      {/* TODO: replace with your own story - why you built it, what you learned */}
      <p className="mt-3 leading-relaxed">
        Designed and built by me as a portfolio project with React, Tailwind CSS and Supabase. Found a wrong answer or have
        an idea? <Link to="/contact" className="font-semibold text-pink-700 underline">Send a query</Link>.
      </p>
    </main>
  )
}
