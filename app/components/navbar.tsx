"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { SearchDialog } from "./search-dialog"

export default function Navbar() {
  const { cart } = useCart()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="font-bold text-xl">
          Atura
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <SearchDialog />
          <Button variant="outline" size="icon" asChild>
            <Link href="/carrinho" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
