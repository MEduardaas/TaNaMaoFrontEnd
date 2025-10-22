'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardCategories from '@/components/subComponents/CardCategories'
import CardProducts from '@/components/subComponents/CardProducts'
import { produtosTeste } from '../db/apiTest'

import { Carousel } from 'primereact/carousel'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([])

  useEffect(() => {
    // Simulando uma chamada à API para buscar produtos
    const fetchProdutos = async () => {
      const response = await apiRequest('/', 'GET')
      setProdutos(response.produtos)
    }

    fetchProdutos()
  }, [])

  console.log(produtos)

  return (
    <div className="flex flex-col h-full gap-16">
      <NavBar />

      <main className="mx-2 md:mx-15 ">
        {/* Carrossel de Categorias */}
        <div id="categories" className="mb-10 flex flex-col gap-5">
          <h2 className="md:pl-12 text-2xl">Categorias</h2>
          <Carousel
            value={[
              { title: 'Móveis' },
              { title: 'Eletrônicos' },
              { title: 'Livros' },
              { title: 'Serviços' },
              { title: 'Jogos' },
              { title: 'Brinquedos' },
              { title: 'Automóveis' },
              { title: 'Esportes' },
              { title: 'Moda' },
              { title: 'Beleza' }
            ]}
            numVisible={10}
            numScroll={1}
            responsiveOptions={[
              { breakpoint: '1600px', numVisible: 8, numScroll: 1 },
              { breakpoint: '1200px', numVisible: 6, numScroll: 1 },
              { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
              { breakpoint: '560px', numVisible: 3, numScroll: 1 },
              { breakpoint: '480px', numVisible: 2, numScroll: 1 }
            ]}
            className="custom-carousel"
            circular
            itemTemplate={(category: any) => (
              <CardCategories title={category.title} />
            )}
          />
        </div>

        {/* Carrossel de Produtos */}
        <div id="products" className="mb-10 flex flex-col gap-5">
          <h2 className="md:pl-12 text-2xl">Mais Vendidos</h2>
          <Carousel
            value={produtosTeste}
            numVisible={6}
            numScroll={1}
            responsiveOptions={[
              { breakpoint: '1600px', numVisible: 5, numScroll: 1 },
              { breakpoint: '1200px', numVisible: 4, numScroll: 1 },
              { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
              { breakpoint: '768px', numVisible: 2, numScroll: 1 },
              { breakpoint: '560px', numVisible: 1, numScroll: 1 }
            ]}
            className="custom-carousel"
            circular
            itemTemplate={() => (
              <div className="px-2 flex justify-center">
                <div className="w-full max-w-[260px]">
                  {produtos.map(product => (
                    <CardProducts
                      key={product._id}
                      id={product._id}
                      title={product.nome}
                      category={product.categoria}
                      precoCompra={product.precoCompra}
                      precoAluguel={product.precoAluguel}
                      quantidadeVendida={product.quantidadeVendida}
                      imagemUrl={product.imagemUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          />
        </div>
        {/* Carrossel de Produtos */}
        <div id="products" className="mb-10 flex flex-col gap-5">
          <h2 className="md:pl-12 text-2xl">Bem Avaliados</h2>
          <Carousel
            value={produtosTeste}
            numVisible={6}
            numScroll={1}
            responsiveOptions={[
              { breakpoint: '1600px', numVisible: 5, numScroll: 1 },
              { breakpoint: '1200px', numVisible: 4, numScroll: 1 },
              { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
              { breakpoint: '768px', numVisible: 2, numScroll: 1 },
              { breakpoint: '560px', numVisible: 1, numScroll: 1 }
            ]}
            className="custom-carousel"
            circular
            itemTemplate={() => (
              <div className="px-2 flex justify-center">
                <div className="w-full max-w-[260px]">
                  {produtos.map(product => (
                    <CardProducts
                      key={product._id}
                      id={product._id}
                      title={product.nome}
                      category={product.categoria}
                      precoCompra={product.precoCompra}
                      precoAluguel={product.precoAluguel}
                      quantidadeVendida={product.quantidadeVendida}
                      imagemUrl={product.imagemUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
