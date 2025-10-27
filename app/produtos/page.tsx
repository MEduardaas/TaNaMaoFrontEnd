'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import CardProducts from '@/components/subComponents/CardProducts'
import { apiRequest } from '@/lib/api'

type Produto = {
  id: number | string
  titulo: string
  categoria: string
  preco: number
}

export default function ProdutosPage() {
  const search = useSearchParams()
  const router = useRouter()
  const categoria = search?.get('categoria') || ''

  // const produtosFiltrados = async () => {
  //   try{
  //     const res = await apiRequest('/produtos/busca/:query', 'GET')
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  return (
    <Suspense fallback={<div>Carregando produtos...</div>}>
      <div className="min-h-screen flex flex-col gap-8">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">
              Produtos {categoria}{' '}
              {/* {categoria && (
                <span className="text-sm text-gray-500">
                  ({produtosFiltrados.length})
                </span>
              )} */}
            </h1>
            {categoria && (
              <button
                onClick={() => router.push('/')}
                className="text-sm text-blue-600 underline"
              >
                Limpar filtro
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* {produtosFiltrados.map((p: Produto) => (
              <Link key={p.id} href={`/produto/${p.id}`} className="block">
                <CardProducts
                  id={p.id}
                  title={p.titulo}
                  category={p.categoria}
                  price={p.preco}
                />
              </Link>
            ))} */}
          </div>
        </main>
        <Footer />
      </div>
    </Suspense>
  )
}
