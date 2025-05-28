import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProdutoItf } from "../utils/types/ProdutoItf"



export function CardPerfume({ data }: { data: ProdutoItf }) {
  return (
    <Link key={data.id} href={`/perfume/${data.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg rounded-xl">
        <div className="relative aspect-square">
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

