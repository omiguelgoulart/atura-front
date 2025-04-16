"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { useState } from "react"
import { Check, ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  perfume: Perfume
}

export function AddToCartButton({ perfume }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(perfume)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={added}>
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Adicionado ao carrinho
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao carrinho
        </>
      )}
    </Button>
  )
}
