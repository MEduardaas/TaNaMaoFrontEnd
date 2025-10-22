import LinkNavigation from '@/components/subComponents/LinkNavigation'
import { ArrowUp, Instagram } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white w-full max-h-max flex flex-col items-start gap-20 p-8 pb-10 lg:px-18">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          <div className="flex flex-col gap-2">
            <h5 className="mb-4 font-bold">Atendimento ao Cliente</h5>
            <LinkNavigation href="/" className="text-sm">
              Central de Ajuda
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Como Comprar
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Como Alugar
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Como trocar
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Garantia TaNaMão
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Metódos de Pagamento
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Fale Conosco
            </LinkNavigation>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="mb-4 font-bold">Sobre o TaNaMão</h5>
            <LinkNavigation href="/" className="text-sm">
              Sobre Nós
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Politíca de Privacidade
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Politíca TaNaMão
            </LinkNavigation>
            <LinkNavigation href="/" className="text-sm">
              Notícias
            </LinkNavigation>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="mb-4 font-bold">Siga-nos</h5>
            <LinkNavigation
              href="/"
              className="flex items-center gap-2 text-sm"
            >
              <Instagram />
              Instagram
            </LinkNavigation>
          </div>
          <div className="flex flex-col gap-2">
            <LinkNavigation
              href="/"
              className="mb-4 font-bold flex items-center gap-2"
            >
              <ArrowUp />
              Voltar ao inicio
            </LinkNavigation>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full text-sm">
        © 2023 Tanamao. Todos os direitos reservados.
      </div>
    </footer>
  )
}
