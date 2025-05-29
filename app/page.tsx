import { Search, ShoppingCart, ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Atura
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Novidades
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Masculinos
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Femininos
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Marcas
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Ofertas
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar perfumes..."
                className="bg-gray-900 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-gray-700"
              />
            </div>
            <button className="relative p-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="bg-gray-800 text-white text-sm py-2 px-4 rounded-full hover:bg-gray-700 transition-colors">
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            filter: "brightness(0.6)",
          }}
        ></div>
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

      {/* Featured Categories */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Categorias em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Perfumes Masculinos",
                image: "/placeholder.svg?height=600&width=400",
                description: "Fragrâncias marcantes e sofisticadas",
              },
              {
                title: "Perfumes Femininos",
                image: "/placeholder.svg?height=600&width=400",
                description: "Delicadas e envolventes",
              },
              {
                title: "Coleções Exclusivas",
                image: "/placeholder.svg?height=600&width=400",
                description: "Edições limitadas e importadas",
              },
            ].map((category, index) => (
              <div key={index} className="group relative h-80 overflow-hidden rounded-lg cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Ver Produtos
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Mais Vendidos</h2>
            <Button variant="link" className="text-white flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Atura Noir",
                brand: "Atura",
                price: "R$ 399,90",
                image: "/placeholder.svg?height=400&width=400",
                rating: 5,
              },
              {
                name: "Essência do Mar",
                brand: "Atura",
                price: "R$ 289,90",
                image: "/placeholder.svg?height=400&width=400",
                rating: 4,
              },
              {
                name: "Noite Estrelada",
                brand: "Atura",
                price: "R$ 349,90",
                image: "/placeholder.svg?height=400&width=400",
                rating: 5,
              },
              {
                name: "Flor de Cerejeira",
                brand: "Atura",
                price: "R$ 319,90",
                image: "/placeholder.svg?height=400&width=400",
                rating: 4,
              },
            ].map((product, index) => (
              <div key={index} className="bg-black border border-gray-800 rounded-lg overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    size="sm"
                  >
                    Comprar
                  </Button>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">{product.brand}</p>
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {Array(product.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>
                  <p className="font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Receba Ofertas Exclusivas</h2>
            <p className="text-gray-300 mb-8">
              Cadastre-se para receber novidades, lançamentos e promoções especiais diretamente no seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-full py-3 px-4 text-sm focus:outline-none focus:border-gray-700"
              />
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full">Cadastrar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Atura Perfumes</h3>
              <p className="text-gray-400 text-sm">
                Fragrâncias exclusivas que contam histórias e despertam emoções. Encontre o perfume que combina com
                você.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Perfumes Masculinos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Perfumes Femininos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kits e Presentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Lançamentos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ofertas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Institucional</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Atendimento</h4>
              <p className="text-gray-400 text-sm mb-2">contato@atura.com.br</p>
              <p className="text-gray-400 text-sm mb-4">(11) 99999-9999</p>
              <p className="text-gray-400 text-sm">
                Horário de atendimento: <br />
                Segunda a Sexta, das 9h às 18h
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Atura Perfumes. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
