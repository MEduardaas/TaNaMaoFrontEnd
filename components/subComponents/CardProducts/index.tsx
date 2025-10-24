import Link from 'next/link'
import React from 'react'
import Button from '../Button'

export default function CardProducts({
  id,
  title,
  category,
  precoCompra,
  precoAluguel,
  quantidadeVendida,
  imagemUrl
}: {
  id: number | string
  title: string
  category: string
  precoCompra: number
  precoAluguel: number
  quantidadeVendida: number
  imagemUrl: string
}) {
  const handleAddToCart = () => {
    // Lógica para adicionar o produto ao carrinho

    console.log(`Produto ${id} adicionado ao carrinho`)
  }
  return (
    <div className="flex flex-col items-start gap-2 border-gray-300 border-2 p-4 rounded-lg max-w-max min-h-max">
      <Link href={`/produto/${id}`}>
        <img
          src={imagemUrl}
          alt="Categorias"
          className="rounded-lg shadow-md"
        />
        <h4>{title}</h4>
      </Link>
      <p className="text-gray-500">{category}</p>
      <p className="font-bold">Comprar: ${precoCompra}</p>
      <p className="font-bold">Aluguel: ${precoAluguel}</p>
      <p className="text-green-600">Vendidos: {quantidadeVendida}</p>
      <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
    </div>
  )
}
