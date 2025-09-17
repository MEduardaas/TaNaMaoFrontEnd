'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardCategories from '@/components/subComponents/CardCategories'
import CardProducts from '@/components/subComponents/CardProducts'
import { produtosTeste } from '../db/apiTest'

type Produto = {
  id: string | number
  titulo: string
  categoria: string
  preco: number
}

export default function Home() {
  return (
    <div className="flex flex-col h-full gap-16">
      <NavBar />
      <div id="categories" className="flex gap-8 mt-18">
        <CardCategories title="Móveis" />
        <CardCategories title="Eletrônicos" />
        <CardCategories title="Livros" />
      </div>
      <div id="products" className="flex  gap-8 mb-10">
        {produtosTeste.map((produto: Produto) => (
          <CardProducts
            key={produto.id}
            title={produto.titulo}
            category={produto.categoria}
            price={produto.preco}
          />
        ))}
      </div>
      <Footer />
    </div>
  )
}
