import React from 'react'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import CategoryResults from '@/components/subComponents/CategoryResults'
import Link from 'next/link'

export default function ProdutosPage({
  searchParams
}: {
  searchParams?: { categoria?: string }
}) {
  const categoria = (searchParams?.categoria || '').trim()

  return (
    <div className="flex flex-col justify-between h-full">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Produtos {categoria}</h1>
          {categoria && (
            <Link href="/" className="text-sm text-blue-600 underline">
              Limpar filtro
            </Link>
          )}
        </div>

        <CategoryResults categoria={categoria} />
      </main>
      <Footer />
    </div>
  )
}
