'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import NavBar from '@/components/PrinComponents/NavBar'
import { useRouter } from 'next/navigation'
import Footer from '@/components/PrinComponents/Footer'
import CardProducts from '@/components/subComponents/CardProducts'
import { apiRequest } from '@/lib/api'
import { IProduto } from '@/types/product'

export default function ProdutosPage() {
  const search = useSearchParams()
  const query = search?.get('query') || ''
  const [produtosFiltrados, setProdutosFiltrados] = useState<IProduto[]>([])

  useEffect(() => {
    const doSearch = async () => {
      const q = (query || '').trim()
      if (!q) {
        setProdutosFiltrados([])
        return
      }
      try {
        const res = await apiRequest(
          `/produtos/busca/${encodeURIComponent(q)}`,
          'GET'
        )
        setProdutosFiltrados(res.produtos || [])
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        setProdutosFiltrados([])
      }
    }

    doSearch()
  }, [query])

  const router = useRouter()

  return (
    <div className="flex flex-col justify-between h-full">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Produtos{query ? ` — ${query}` : ''}
            {query && (
              <span className="text-sm text-gray-500">
                ({produtosFiltrados.length})
              </span>
            )}
          </h1>
          {query && (
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
