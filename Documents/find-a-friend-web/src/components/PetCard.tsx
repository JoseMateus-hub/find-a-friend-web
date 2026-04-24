import { Pet } from '@/types/pet'
import Link from 'next/link'

interface PetCardProps {
  pet: Pet
}

export function PetCard({ pet }: PetCardProps) {
  return (
  <Link href={`/pets/${pet.id}`}>
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer">
      <h2 className="text-xl font-bold text-zinc-900">{pet.name}</h2>

      <p className="mt-2 text-zinc-600">{pet.about}</p>

      <div className="mt-4 space-y-1 text-sm text-zinc-700">
        <p>Cidade: {pet.city}</p>
        <p>Idade: {pet.age}</p>
        <p>Porte: {pet.size}</p>
        <p>Energia: {pet.energy}</p>
      </div>
    </div>
  </Link>
)
}