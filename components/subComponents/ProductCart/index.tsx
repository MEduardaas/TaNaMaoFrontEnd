import { IProduto } from '@/types/product'
import { Trash2 } from 'lucide-react'
import React from 'react'

export default function ProductCart({ product }: { product: IProduto }) {
  return (
    <div className="flex justify-between my-2">
      <div className="flex flex-col gap-2">
        <h1>{product.nome}</h1>
        <p>R${product.preco}</p>
      </div>
      <div className="flex gap-2">
        <img src={product.imagemUrl} alt={product.nome} />
        <span>
          <Trash2 />
        </span>
      </div>
    </div>
  )
}
