import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { addQuery, getMyQueries } from '../lib/db'

export default function Contact() {
  const { user } = useAuth()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState({ text: '', ok: false })
  const [mine, setMine] = useState([])

  const load = () => getMyQueries(user.uid).then(setMine).catch(() => {})
  useEffect(() => { load() }, [user.uid])

  async function send(e) {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) return setStatus({ text: 'Fill in both fields.', ok: false })
    try {
      await addQuery(user, subject.trim(), message.trim())
      setSubject(''); setMessage('')
      setStatus({ text: 'Query sent. Thank you!', ok: true })
      load()
    } catch {
      setStatus({ text: 'Could not send your query. Please try again.', ok: false })
    }
  }

  const field = 'mt-1 w-full rounded-lg border-2 border-pink-100 px-3 py-2.5 focus:border-pink-500 focus:outline-none'

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-5 py-10 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold">Contact us</h1>
        <p className="mb-5 mt-2 text-mute">Ask a question or report an issue. Your query is saved to our database.</p>
        <form onSubmit={send} className="rounded-2xl border-2 border-pink-200 p-6">
          <label className="block text-sm font-medium">Subject
            <input className={field} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>
          <label className="mt-3 block text-sm font-medium">Message
            <textarea rows={5} className={field} value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <p className={'min-h-6 pt-2 text-sm font-medium ' + (status.ok ? 'text-green-700' : 'text-rose-700')}>{status.text}</p>
          <button className="rounded-full bg-pink-600 px-6 py-2.5 font-semibold text-white hover:bg-pink-700">Send query</button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold lg:mt-[4.6rem]">Your queries</h2>
        {mine.length === 0 ? <p className="mt-3 text-mute">Nothing sent yet.</p> : (
          <ul className="mt-3 space-y-3">
            {mine.map((x) => (
              <li key={x.id} className="rounded-xl border-2 border-pink-100 p-4">
                <p className="font-semibold">{x.subject}</p>
                <p className="text-sm text-mute">{x.message}</p>
                <p className="mt-2 text-xs text-mute">{new Date(x.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
