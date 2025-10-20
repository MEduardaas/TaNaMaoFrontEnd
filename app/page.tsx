'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardCategories from '@/components/subComponents/CardCategories'
import CardProducts from '@/components/subComponents/CardProducts'
import { produtosTeste } from '../db/apiTest'
import Glider from 'react-glider'
import 'glider-js/glider.min.css'

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

      {/* Carrossel de Categorias */}
      <div id="categories" className="mb-10  h-full">
        <Glider
          draggable
          hasArrows
          hasDots
          slidesToShow={5}
          slidesToScroll={1}
          itemWidth={300}
          className="gap-5"
        >
          <CardCategories title="Móveis" />
          <CardCategories title="Eletrônicos" />
          <CardCategories title="Livros" />
          <CardCategories title="Serviços" />
          <CardCategories title="Jogos" />
          <CardCategories title="Brinquedos" />
          <CardCategories title="Automóveis" />
          <CardCategories title="Esportes" />
          <CardCategories title="Moda" />
          <CardCategories title="Beleza" />
        </Glider>
      </div>

      {/* Carrossel de Produtos */}
      <div id="products" className="mb-10">
        <Glider
          draggable
          hasArrows
          hasDots
          slidesToShow={4}
          slidesToScroll={1}
          className="gap-5"
        >
          {produtosTeste.map((produto: Produto) => (
            <CardProducts
              key={produto.id}
              title={produto.titulo}
              category={produto.categoria}
              price={produto.preco}
            />
          ))}
        </Glider>
      </div>

      <Footer />
    </div>
  )
}
