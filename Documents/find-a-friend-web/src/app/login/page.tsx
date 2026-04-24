'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_URL } from '@/services/api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Email ou senha inválidos.')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">
          Entrar na sua conta 🐾
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Acesse o painel da sua ONG para cadastrar pets.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contato@ong.com"
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-orange-500 hover:underline">
            Cadastre sua ONG
          </Link>
        </p>
      </div>
    </main>
  )
}