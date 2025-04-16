"use client"

import type { Perfume } from "@/lib/types"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CartItem = Perfume & { quantity: number }

interface CartContextType {
  cart: CartItem[]
  addToCart: (perfume: Perfume) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export function useCart() {
  return useContext(CartContext)
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (perfume: Perfume) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === perfume.id)

      if (existingItem) {
        // If item already exists, increase quantity
        return prevCart.map((item) => (item.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Otherwise add new item with quantity 1
        return [...prevCart, { ...perfume, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}
