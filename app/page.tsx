'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardCategories from '@/components/subComponents/CardCategories'
import CardProducts from '@/components/subComponents/CardProducts'

import { Carousel } from 'primereact/carousel'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'
import { IProduto } from '@/types/product'

export default function Home() {
  const [produtos, setProdutos] = useState<Array<IProduto & { _id?: string }>>(
    []
  )

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await apiRequest('/', 'GET')
      setProdutos(response.produtos)
    }

    fetchProdutos()
  }, [])

  return (
    <div className="flex flex-col h-full gap-5">
      <NavBar />

      <main className="mx-2 md:mx-15 ">
        {/* Carrossel de Categorias */}
        <div id="categories" className="mb-10 flex flex-col gap-5">
          <h2 className="md:pl-12 text-2xl">Categorias</h2>
          <Carousel
            value={[
              { title: 'Moveis' },
              { title: 'Eletronicos' },
              { title: 'Livros' },
              { title: 'Servicos' },
              { title: 'Jogos' },
              { title: 'Brinquedos' },
              { title: 'Automoveis' },
              { title: 'Esportes' },
              { title: 'Moda' },
              { title: 'Beleza' },
              { title: 'Ferramentas' }
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
            itemTemplate={(category: { title: string }) => (
              <CardCategories title={category.title} />
            )}
          />
        </div>

        {/* Carrossel de Produtos */}
        <div id="products" className="mb-10 flex flex-col gap-5">
          <h2 className="md:pl-12 text-2xl">Mais Vendidos</h2>
          <Carousel
            value={produtos}
            numVisible={4}
            numScroll={1}
            responsiveOptions={[
              { breakpoint: '1200px', numVisible: 4, numScroll: 1 },
              { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
              { breakpoint: '768px', numVisible: 2, numScroll: 1 },
              { breakpoint: '560px', numVisible: 1, numScroll: 1 }
            ]}
            className="custom-carousel"
            circular
            itemTemplate={(
              product: IProduto & { _id?: string; idProduto?: string }
            ) => (
              <div className="px-2 flex justify-center">
                <div className="w-60">
                  <CardProducts
                    key={product._id ?? product.idProduto}
                    id={product._id ?? product.idProduto}
                    title={product.nome}
                    category={product.categoria}
                    tipoVenda={product.tipoVenda}
                    preco={product.preco}
                    quantidadeVendida={product.quantidadeVendida}
                    imagemUrl={product.imagemUrl}
                  />
                </div>
              </div>
            )}
          />
        </div>
        {/* Carrossel de Produtos */}
        <div id="products" className="mb-10 flex flex-col gap-5">
          <h2 className="md:pl-12 text-2xl">Bem Avaliados</h2>
          <Carousel
            value={produtos}
            numVisible={4}
            numScroll={1}
            responsiveOptions={[
              { breakpoint: '1200px', numVisible: 4, numScroll: 1 },
              { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
              { breakpoint: '768px', numVisible: 2, numScroll: 1 },
              { breakpoint: '560px', numVisible: 1, numScroll: 1 }
            ]}
            className="custom-carousel"
            circular
            itemTemplate={(
              product: IProduto & { _id?: string; idProduto?: string }
            ) => (
              <div className="px-2 flex justify-center">
                <div className="w-60">
                  <CardProducts
                    key={product._id ?? product.idProduto}
                    id={product._id ?? product.idProduto}
                    title={product.nome}
                    category={product.categoria}
                    tipoVenda={product.tipoVenda}
                    preco={product.preco}
                    quantidadeVendida={product.quantidadeVendida}
                    imagemUrl={product.imagemUrl}
                  />
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
