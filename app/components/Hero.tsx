"use client"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/31707005/pexels-photo-31707005/free-photo-of-perfume-em-spray.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          filter: "brightness(0.6)",
        }}
      />
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubra sua essência</h1>
          <p className="text-lg text-gray-300 mb-8">
            Fragrâncias exclusivas que contam histórias e despertam emoções. Encontre o perfume que combina com você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-full text-sm font-medium">
              Explorar Coleção
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-sm font-medium"
            >
              Lançamentos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
