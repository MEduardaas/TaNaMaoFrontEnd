import Link from 'next/link'
import React from 'react'
import Button from '../Button'
import { useCart } from '@/Provider/useCart'
import { useApi } from '@/hooks/useApi'

export default function CardProducts({
  id,
  title,
  category,
  tipoVenda,
  preco,
  quantidadeVendida,
  imagemUrl
}: {
  id?: number | string
  title: string
  category: string
  tipoVenda: number
  preco: number
  quantidadeVendida?: number
  imagemUrl: string
}) {
  const { addItem, openCart } = useCart()
  const { apiRequest } = useApi()

  const handleAddToCart = async () => {
    try {
      try {
        const res = await apiRequest('/carrinho', 'POST', {
          idProduto: String(id),
          quantidade: 1
        })

        addItem(
          {
            idProduto: String(id),
            nome: title,
            preco,
            imagemUrl
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
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 border-gray-300 border-2 p-4 rounded-lg max-w-max min-h-max">
      <Link href={`/produto/${id}`} className="flex flex-col gap-2">
        <img
          src={imagemUrl}
          alt="Categorias"
          className="rounded-lg shadow-md"
        />
        <h4>{title}</h4>
      </Link>
      <p className="text-gray-500">{category}</p>
      <p className="font-bold">Tipo de Venda: {tipoVenda}</p>
      <p className="font-bold">Preço: ${preco}</p>
      <p className="text-green-600">Vendidos: {quantidadeVendida}</p>
      <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
    </div>
  )
}
