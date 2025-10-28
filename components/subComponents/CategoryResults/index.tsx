'use client'

import React, { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'
import CardProducts from '@/components/subComponents/CardProducts'
import { IProduto } from '@/types/product'

type Props = {
  categoria: string
}

export default function CategoryResults({ categoria }: Props) {
  const [produtos, setProdutos] = useState<IProduto[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProdutos = async () => {
      const cat = (categoria || '').trim()
      if (!cat) {
        setProdutos([])
        return
      }

      setLoading(true)
      try {
        const res = await apiRequest(
          `/produtos/categoria/${encodeURIComponent(cat)}`,
          'GET'
        )
        setProdutos(res.produtos || [])
      } catch (err) {
        console.error('Erro ao buscar produtos por categoria:', err)
        setProdutos([])
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [categoria])

  return (
    <div>
      {categoria ? (
        <>
          <div className="mb-4 text-sm text-gray-500">
            {loading ? 'Buscando...' : `${produtos.length} resultados`}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map(
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
        </>
      ) : (
        <div className="text-gray-500">
          Selecione uma categoria para ver produtos.
        </div>
      )}
    </div>
  )
}
