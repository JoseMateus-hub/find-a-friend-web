'use client'

import { FormEvent, useEffect, useState } from 'react'
import { PetCard } from '@/components/PetCard'
import { fetchPets, PetFilters } from '@/services/api'
import { Pet } from '@/types/pet'

const AGE_OPTIONS = ['Filhote', '1 ano', '2 anos', '3 anos', '4 anos ou mais']
const SIZE_OPTIONS = ['Pequeno', 'Médio', 'Grande']
const ENERGY_OPTIONS = ['Baixa', 'Média', 'Alta']
const INDEPENDENCE_OPTIONS = ['Baixa', 'Média', 'Alta']
const ENVIRONMENT_OPTIONS = ['Apartamento', 'Espaço amplo']

export default function Home() {
  const [city, setCity] = useState('')
  const [filters, setFilters] = useState<Omit<PetFilters, 'city'>>({})
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function loadPets(selectedCity: string, selectedFilters: Omit<PetFilters, 'city'>) {
    try {
      setIsLoading(true)
      setError('')
      const data = await fetchPets({ city: selectedCity, ...selectedFilters })
      setPets(data)
      setSearched(true)
    } catch {
      setError('Não foi possível buscar os pets.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    if (!city.trim()) return
    loadPets(city, filters)
  }

  function handleFilterChange(key: keyof Omit<PetFilters, 'city'>, value: string) {
    const updated = { ...filters, [key]: filters[key] === value ? undefined : value }
    setFilters(updated)
    if (city.trim()) loadPets(city, updated)
  }

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
            onChange={(e) => setCity(e.target.value)}
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

        {searched && (
          <div className="mt-6 flex flex-wrap gap-6">
            <FilterGroup
              label="Idade"
              options={AGE_OPTIONS}
              selected={filters.age}
              onChange={(v) => handleFilterChange('age', v)}
            />
            <FilterGroup
              label="Porte"
              options={SIZE_OPTIONS}
              selected={filters.size}
              onChange={(v) => handleFilterChange('size', v)}
            />
            <FilterGroup
              label="Energia"
              options={ENERGY_OPTIONS}
              selected={filters.energy}
              onChange={(v) => handleFilterChange('energy', v)}
            />
            <FilterGroup
              label="Independência"
              options={INDEPENDENCE_OPTIONS}
              selected={filters.independence}
              onChange={(v) => handleFilterChange('independence', v)}
            />
            <FilterGroup
              label="Ambiente"
              options={ENVIRONMENT_OPTIONS}
              selected={filters.environment}
              onChange={(v) => handleFilterChange('environment', v)}
            />
          </div>
        )}

        {isLoading && <p className="mt-8 text-zinc-600">Buscando pets...</p>}
        {error && <p className="mt-8 text-red-500">{error}</p>}
        {!isLoading && !error && searched && pets.length === 0 && (
          <p className="mt-8 text-zinc-600">Nenhum pet encontrado.</p>
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

interface FilterGroupProps {
  label: string
  options: string[]
  selected?: string
  onChange: (value: string) => void
}

function FilterGroup({ label, options, selected, onChange }: FilterGroupProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-zinc-700">{label}</p>
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