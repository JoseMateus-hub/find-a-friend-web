'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/services/api'

const AGE_OPTIONS = ['Filhote', '1 ano', '2 anos', '3 anos', '4 anos ou mais']
const SIZE_OPTIONS = ['Pequeno', 'Médio', 'Grande']
const ENERGY_OPTIONS = ['Baixa', 'Média', 'Alta']
const INDEPENDENCE_OPTIONS = ['Baixa', 'Média', 'Alta']
const ENVIRONMENT_OPTIONS = ['Apartamento', 'Espaço amplo']

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    about: '',
    age: '',
    size: '',
    energy: '',
    independence: '',
    environment: '',
    city: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) router.push('/login')
  }, [router])

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar pet.')
      }

      setSuccess(true)
      setForm({
        name: '',
        about: '',
        age: '',
        size: '',
        energy: '',
        independence: '',
        environment: '',
        city: '',
      })
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <section className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900">
            Cadastrar novo pet 🐾
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-500 hover:text-red-500"
          >
            Sair
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input label="Nome" value={form.name} onChange={(v) => handleChange('name', v)} />
          <Textarea label="Sobre" value={form.about} onChange={(v) => handleChange('about', v)} />
          <Input label="Cidade" value={form.city} onChange={(v) => handleChange('city', v)} />

          <SelectGroup label="Idade" options={AGE_OPTIONS} selected={form.age} onChange={(v) => handleChange('age', v)} />
          <SelectGroup label="Porte" options={SIZE_OPTIONS} selected={form.size} onChange={(v) => handleChange('size', v)} />
          <SelectGroup label="Energia" options={ENERGY_OPTIONS} selected={form.energy} onChange={(v) => handleChange('energy', v)} />
          <SelectGroup label="Independência" options={INDEPENDENCE_OPTIONS} selected={form.independence} onChange={(v) => handleChange('independence', v)} />
          <SelectGroup label="Ambiente" options={ENVIRONMENT_OPTIONS} selected={form.environment} onChange={(v) => handleChange('environment', v)} />

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">Pet cadastrado com sucesso! 🎉</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar pet'}
          </button>
        </form>
      </section>
    </main>
  )
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-zinc-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none focus:border-orange-500"
      />
    </div>
  )
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-zinc-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        rows={3}
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none focus:border-orange-500"
      />
    </div>
  )
}

function SelectGroup({ label, options, selected, onChange }: { label: string; options: string[]; selected: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              selected === option
                ? 'border-orange-500 bg-orange-500 text-white'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-orange-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}