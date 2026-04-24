'use client'

import { FormEvent, useEffect, useState } from 'react'
import { PetCard } from '@/components/PetCard'
import { fetchPets } from '@/services/api'
import { Pet } from '@/types/pet'

export default function Home() {
  const [city, setCity] = useState('Fortaleza')
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadPets(selectedCity: string) {
    try {
      setIsLoading(true)
      setError('')

      const data = await fetchPets(selectedCity)
      setPets(data)
    } catch {
      setError('Não foi possível buscar os pets.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    loadPets(city)
  }

  useEffect(() => {
    loadPets('Fortaleza')
  }, [])

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-zinc-900">
          Pets para adoção 🐶
        </h1>

        <p className="mt-2 text-zinc-600">
          Encontre um novo amigo perto de você.
        </p>

        <form onSubmit={handleSearch} className="mt-8 flex gap-3">
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Digite sua cidade"
            className="w-full max-w-sm rounded-xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Buscar
          </button>
        </form>

        {isLoading && (
          <p className="mt-8 text-zinc-600">Buscando pets...</p>
        )}

        {error && (
          <p className="mt-8 text-red-500">{error}</p>
        )}

        {!isLoading && !error && pets.length === 0 && (
          <p className="mt-8 text-zinc-600">
            Nenhum pet encontrado para essa cidade.
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
    </main>
  )
}