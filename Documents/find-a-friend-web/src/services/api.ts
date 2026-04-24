import { Pet } from '@/types/pet'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

export async function fetchPets(city: string): Promise<Pet[]> {
  const response = await fetch(`${API_URL}/pets?city=${city}`)
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