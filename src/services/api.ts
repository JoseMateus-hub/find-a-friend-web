import { Pet } from '@/types/pet'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

export interface PetFilters {
  city: string
  age?: string
  size?: string
  energy?: string
  independence?: string
  environment?: string
}

export async function fetchPets(filters: PetFilters): Promise<Pet[]> {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value)
  })

  const response = await fetch(`${API_URL}/pets?${params.toString()}`)
  const data = await response.json()
  return data.pets
}

export async function fetchPetById(id: string): Promise<Pet> {
  const response = await fetch(`${API_URL}/pets/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch pet: ${response.status}`)
  }

  const data = await response.json()
  return data.pet
}