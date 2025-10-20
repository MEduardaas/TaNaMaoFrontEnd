import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import { produtosTeste } from '@/db/apiTest'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export default function ProdutoDetalhe({ params }: Props) {
  const id = Number(params.id)
  const produto = produtosTeste.find((p) => Number(p.id) === id)

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

          <div>
            <h1 className="text-2xl font-bold mb-2">{produto.titulo}</h1>
            <p className="text-sm text-gray-600 mb-4">Categoria: {produto.categoria}</p>
            <p className="text-xl font-semibold mb-6">R$ {produto.preco.toFixed(2)}</p>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Comprar</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
