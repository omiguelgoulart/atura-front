export interface Perfume {
  id: string
  name: string
  brand: string
  description: string
  price: number
  size: number
  type: string
  rating: number
  image: string
  notes: {
    top: string
    heart: string
    base: string
  }
}
