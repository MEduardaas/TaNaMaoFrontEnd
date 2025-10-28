'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import CardProducts from '@/components/subComponents/CardProducts'
import { apiRequest } from '@/lib/api'
import { IProduto } from '@/types/product'

export default function ProdutosPage() {
  const search = useSearchParams()
  const router = useRouter()
  const categoria = search?.get('categoria') || ''
  const [produtosFiltrados, setProdutosFiltrados] = useState<IProduto[]>([])

  useEffect(() => {
    const fetchProdutosFiltrados = async () => {
      try {
        console.log('Categoria selecionada:', categoria)
        const res = await apiRequest(`/produtos/categoria/${categoria}`, 'GET')
        setProdutosFiltrados(res.produtos)
        console.log(res.produtos)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProdutosFiltrados()
  }, [categoria])

  return (
    <div className="flex flex-col justify-between h-full">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Produtos {categoria}{' '}
            {categoria && (
              <span className="text-sm text-gray-500">
                ({produtosFiltrados.length})
              </span>
            )}
          </h1>
          {categoria && (
            <button
              onClick={() => router.push('/')}
              className="text-sm text-blue-600 underline"
            >
              Limpar filtro
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map(
            (product: IProduto & { _id?: string; idProduto?: string }) => (
              <CardProducts
                key={product._id ?? product.idProduto}
                id={product._id ?? product.idProduto}
                title={product.nome}
                category={product.categoria}
                tipoVenda={product.tipoVenda}
                preco={product.preco}
                quantidadeVendida={product.quantidadeVendida}
                imagemUrl={product.imagemUrl}
              />
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
