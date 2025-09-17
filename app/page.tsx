'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardCategories from '@/components/subComponents/CardCategories'
import CardProducts from '@/components/subComponents/CardProducts'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-16">
      <NavBar />
      <div id="categories" className="flex gap-8">
        <CardCategories title="Móveis" />
        <CardCategories title="Eletrônicos" />
        <CardCategories title="Livros" />
        <CardCategories title="Ferramentas" />
        <CardCategories title="Serviços" />
        <CardCategories title="Jogos" />
        <CardCategories title="Brinquedos" />
        <CardCategories title="Automóveis" />
        <CardCategories title="Outros" />
      </div>
      <div id="products" className="flex  gap-8">
        <CardProducts title="Categoria 1" price={9.99} />
        <CardProducts title="Categoria 2" price={19.99} />
        <CardProducts title="Categoria 3" price={29.99} />
        <CardProducts title="Categoria 4" price={39.99} />
      </div>

      <Footer />
    </div>
  )
}
