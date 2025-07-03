import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Produto from "../utils/types/ProdutoItf"




export function CardPerfume({ data }: { data: Produto }) {
  return (
    <Link key={data.id} href={`/perfume/${data.id}`}>
      <Card className="h-full flex flex-col justify-between overflow-hidden rounded-xl border transition-all hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-square bg-zinc-100">
          <img
            src={data.foto || "/placeholder.svg"}
            alt={data.nome}
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-lg">{data.nome}</h3>
          <p className="text-sm text-muted-foreground">{data.marca.nome}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="font-bold text-base">R$ {data.preco.toFixed(2).replace(".", ",")}</div>
          <div className="text-sm text-muted-foreground">{data.volumeMl}ml</div>
        </CardFooter>
      </Card>
    </Link>
  )
}

