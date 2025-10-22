'use client'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import { notFound } from 'next/navigation'
import Button from '@/components/subComponents/Button'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'

type Props = {
  params: { id: string }
}

export default function ProdutoDetalhe({ params }: Props) {
  const [produto, setProduto] = useState<any>({})

  useEffect(() => {
    const fetchProduto = async () => {
      const response = await apiRequest(`/produtos/${params.id}`, 'GET')
      setProduto(response.produto)
    }
    fetchProduto()
  }, [])

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center">
            {/* Placeholder imagem */}
            <img
              src={produto.imagemUrl}
              alt={produto.nome}
              className="h-full object-contain"
            />
          </div>

          <div className="w-full">
            <div className="w-1/2">
              <h1 className="text-2xl font-bold mb-2">{produto.nome}</h1>
              <p className="bg-green-200 text-green-900 rounded-md max-w-max p-2 text-sm text-gray-600 mb-2">
                {produto.categoria}
              </p>
              <p>Quantidade Disponiveis: {produto.quantidade}</p>
              <h2 className="text-xl font-bold">Preço de Compra</h2>
              <p className="text-xl font-bold mb-2">R$ {produto.precoCompra}</p>
              <Button>Adicionar ao Carrinho</Button>

              <h2 className="text-xl font-bold mt-4">Preço de Aluguel</h2>
              <p className="text-xl font-bold mb-2">
                R$ {produto.precoAluguel}
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
