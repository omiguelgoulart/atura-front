'use client';

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useClienteStore } from "../context/ClienteContext"

export default function PerfilPage() {
  const router = useRouter()
  const { cliente, deslogaCliente } = useClienteStore()

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,4rem))] flex-col items-center justify-center bg-muted/20 p-4 py-8 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="items-center text-center pb-6">
          <Avatar className="h-28 w-28 border-2 border-primary/50 shadow-sm">
            <AvatarImage src="/default-avatar.png" alt={`Avatar de ${cliente.nome}`} />
            <AvatarFallback className="text-3xl">
              {cliente.nome?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4">
            <CardTitle className="text-3xl font-bold">{cliente.nome}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{cliente.email}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="pt-6 px-6 md:px-8">
          <Button
            onClick={() => {
              deslogaCliente()
              router.push("/")
            }}
            variant="destructive"
            className="w-full"
          >
            Sair
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
