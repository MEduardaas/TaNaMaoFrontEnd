'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardCategories from '@/components/subComponents/CardCategories'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-16">
      <NavBar />
      <CardCategories title="Categoria 1" price={9.99} />
      <Footer />
    </div>
  )
}
