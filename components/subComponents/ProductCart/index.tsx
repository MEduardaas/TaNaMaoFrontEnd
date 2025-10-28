import { useApi } from '@/hooks/useApi'
import { useCart } from '@/Provider/useCart'
import { IProduto } from '@/types/product'
import { Trash2 } from 'lucide-react'
import React from 'react'

export default function ProductCart({ product }: { product: IProduto }) {
  const { removeItem } = useCart()
  const { apiRequest } = useApi()

  const handleRemove = async () => {
    try {
      const res = await apiRequest(`/carrinho`, 'DELETE', {
        idProduto: String(product.idProduto)
      })
      removeItem(String(product.idProduto))
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error)
    }
  }

  return (
    <div className=" w-full flex flex-col sm:flex-row justify-between items-center my-2 gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="w-60">{product.nome}</h1>
        <p>R${product.preco}</p>
      </div>
      <div className="flex gap-4 items-center">
        <img
          src={product.imagemUrl}
          alt={product.nome}
          className="w-16 h-16 object-cover"
        />
        <div className="flex flex-col justify-center items-center">
          <p>QTD</p>
          <p>{product.quantidade}</p>
        </div>
        <span onClick={handleRemove} className="cursor-pointer">
          <Trash2 />
        </span>
      </div>
    </div>
  )
}
