import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import { produtosTeste } from '@/db/apiTest'
import { notFound } from 'next/navigation'
import Button from '@/components/subComponents/Button'

type Props = {
  params: { id: string }
}

export default function ProdutoDetalhe({ params }: Props) {
  const id = Number(params.id)
  const produto = produtosTeste.find(p => Number(p.id) === id)

  if (!produto) return notFound()

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center">
            {/* Placeholder imagem */}
            <span className="text-gray-500">Imagem do produto</span>
          </div>

          <div className="w-full">
            <div className="w-1/2">
              <h1 className="text-2xl font-bold mb-2">{produto.titulo}</h1>
              <p className="bg-green-200 text-green-900 rounded-md max-w-max p-2 text-sm text-gray-600 mb-2">
                {produto.categoria}
              </p>
              <p>Quantidade Disponiveis: {produto.quantidade}</p>
              <h2 className="text-xl font-bold">Preço de Compra</h2>
              <p className="text-xl font-bold mb-2">
                R$ {produto.precoCompra.toFixed(2)}
              </p>
              <Button>Adicionar ao Carrinho</Button>

              <h2 className="text-xl font-bold mt-4">Preço de Aluguel</h2>
              <p className="text-xl font-bold mb-2">
                R$ {produto.precoAluguel.toFixed(2)}
              </p>

              <Button>Alugar</Button>
            </div>
            <div className="w-full border-2 border-gray-300 rounded-lg p-5 mt-6">
              <h1 className="text-lg font-bold">Descrição</h1>
              <ul>
                <li>{produto.descricao}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
