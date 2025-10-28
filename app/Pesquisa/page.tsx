import React from 'react'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import SearchResults from '@/components/subComponents/SearchResults'
import Link from 'next/link'

export default function ProdutosPage({
  searchParams
}: {
  searchParams?: { query?: string }
}) {
  const query = (searchParams?.query || '').trim()

  return (
    <div className="flex flex-col justify-between h-full">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Produtos{query ? ` — ${query}` : ''}
          </h1>
          {query && (
            <Link href="/" className="text-sm text-blue-600 underline">
              Limpar filtro
            </Link>
          )}
        </div>

        <SearchResults query={query} />
      </main>
      <Footer />
    </div>
  )
}
