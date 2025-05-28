"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { SearchBar } from "../components/search-bar"
import { ProdutoItf } from "../utils/types/ProdutoItf"
import { useEffect, useState } from "react";
import LoginButton from "./LoginButton"; 


export default function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const [, setProduto] = useState<ProdutoItf[]>([])


  async function buscaDados() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`)
      const dados = await response.json()
      console.log(dados)
      setProduto(dados)
  }
  useEffect(() => {
    buscaDados()
  }
  , [])



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between gap-4">
        
        {/* Logo (alinhada à esquerda em telas pequenas, centralizada em médias+) */}
        <div className="flex-1 flex justify-start md:justify-center">
          <Link href="/" className="font-bold text-xl">
            Atura
          </Link>
        </div>

        {/* Search (ocupa espaço proporcional e fica centralizado) */}
        <div className="hidden md:flex flex-[2] justify-center">
          <SearchBar />
        </div>

        {/* Carrinho (sempre à direita) */}
        <div className="flex-1 flex justify-end mr-6">
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
         <LoginButton />
        </div>
        
      </div>
    </header>
  )
}
