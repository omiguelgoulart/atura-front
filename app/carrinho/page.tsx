"use client"

import { useCart } from "../components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [orderCompleted, setOrderCompleted] = useState(false)

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return

    // In a real app, this would send the order to a backend
    setOrderCompleted(true)
    clearCart()
  }

  if (orderCompleted) {
    return (
      <div className="container py-12 max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Pedido Finalizado</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Seu pedido foi finalizado com sucesso!</p>
            <p className="text-muted-foreground">
              Em um sistema real, você receberia um email de confirmação e informações sobre o envio.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-6">Adicione alguns perfumes para continuar</p>
          <Button asChild>
            <Link href="/">Explorar perfumes</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-lg border">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`}>
                  <div className="flex items-start gap-4 p-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/perfume/${item.id}`} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.size}ml • {item.type}
                      </div>
                      <div className="mt-1">Quantidade: {item.quantity}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    </div>
                  </div>
                  {index < cart.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
