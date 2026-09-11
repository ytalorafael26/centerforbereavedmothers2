'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Signup() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [language, setLanguage] = useState('English')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (!supabase) {
      setMessage('The registration service is not configured yet.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          language,
        },
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    if (data.session) {
      router.push('/dashboard')
      return
    }

    setMessage(
      'Account created. Please check your email to confirm your account.'
    )
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold">Create your private space</h1>

        <p className="mt-2 text-slate-600">
          You choose what you share and what stays private.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />

          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />

          <input
            type="password"
            required
            minLength={6}
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option>English</option>
            <option>Português (Brasil)</option>
            <option>Español</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          {message && (
            <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              {message}
            </p>
          )}
        </form>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          By continuing, you acknowledge that this platform does not replace
          qualified medical or mental health care.
        </p>
      </div>
    </div>
  )
}
