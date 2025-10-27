'use client'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import { useParams } from 'next/navigation'
import Button from '@/components/subComponents/Button'
import { useEffect, useState } from 'react'
import { useCart } from '@/Provider/useCart'
import Avaliacao from '@/components/subComponents/Avaliacao'
import { useApi } from '@/hooks/useApi'
import { IProduto } from '@/types/product'

export default function ProdutoDetalhe() {
  const [produto, setProduto] = useState<IProduto | null>(null)
  const { openCart, addItem } = useCart()
  const { apiRequest } = useApi()
  const params = useParams()
  const produtoId = params.id

  useEffect(() => {
    const fetchProduto = async () => {
      if (!produtoId) return
      const response = await apiRequest(`/produtos/${produtoId}`, 'GET')
      setProduto(response.produto)
    }
    fetchProduto()
  }, [apiRequest, produtoId])

  if (!produto) return <div>Carregando...</div>
  const isVenda =
    typeof produto.tipoVenda === 'string'
      ? produto.tipoVenda === 'venda'
      : produto.tipoVenda === 1

  const handleAddToCart = async () => {
    try {
      console.log('Adicionar ao carrinho:', produtoId)
      try {
        const res = await apiRequest('/carrinho', 'POST', {
          idProduto: String(produtoId),
          quantidade: 1
        })

        addItem(
          {
            idProduto: String(produtoId),
            nome: produto?.nome ?? '',
            preco: produto?.preco,
            imagemUrl: produto?.imagemUrl
          },
          1
        )

        openCart()
      } catch (err) {
        console.error(
          'Erro na API ao adicionar ao carrinho (não bloqueia UI):',
          err
        )
      }
      openCart()
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    }
  }

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
              <p>Quantidade vendida: {produto.quantidadeVendida}</p>
              {isVenda ? (
                <>
                  <h2 className="text-xl font-bold">Preço de Compra</h2>
                </>
              ) : (
                <h2 className="text-xl font-bold mt-4">Preço de Aluguel</h2>
              )}

              <p className="text-xl font-bold mb-2">R$ {produto.preco}</p>
              <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
            </div>
            <div className="w-full border-2 border-gray-300 rounded-lg p-5 mt-6">
              <h1 className="text-lg font-bold">Descrição</h1>
              <ul>
                <li>{produto.descricao}</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mt-4">Avaliacoes</h2>
          <Avaliacao nome="kleberson" nota={5} comentario="Ótimo produto!" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
