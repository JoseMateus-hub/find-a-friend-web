'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchPetById } from '@/services/api'
import { Pet } from '@/types/pet'

export default function PetPage() {
  const params = useParams()
  const [pet, setPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPet() {
      try {
        const data = await fetchPetById(params.id as string)
        setPet(data)
      } finally {
        setIsLoading(false)
      }
    }
    loadPet()
  }, [params.id])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-10">
        <p className="text-zinc-600">Carregando...</p>
      </main>
    )
  }

  if (!pet) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-10">
        <p className="text-red-500">Pet não encontrado.</p>
      </main>
    )
  }

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse em adotar o pet ${pet.name}.`,
  )
  const whatsappLink = `https://wa.me/55${pet.org.whatsapp}?text=${whatsappMessage}`

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-orange-500 hover:underline">
          ← Voltar para a listagem
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-zinc-900">{pet.name}</h1>
        <p className="mt-4 text-zinc-600">{pet.about}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-zinc-500">Cidade</p>
            <p className="font-semibold text-zinc-800">{pet.city}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Idade</p>
            <p className="font-semibold text-zinc-800">{pet.age}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Porte</p>
            <p className="font-semibold text-zinc-800">{pet.size}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Energia</p>
            <p className="font-semibold text-zinc-800">{pet.energy}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Independência</p>
            <p className="font-semibold text-zinc-800">{pet.independence}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Ambiente</p>
            <p className="font-semibold text-zinc-800">{pet.environment}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900">
            Responsável pela adoção
          </h2>
          <p className="mt-2 text-zinc-700">ONG: {pet.org.name}</p>
          <p className="text-zinc-700">Endereço: {pet.org.address}</p>

          
            <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white"
          >
            Entrar em contato via WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}