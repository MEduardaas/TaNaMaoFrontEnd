'use client'
import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import Button from '@/components/subComponents/Button'
import ProductPayment from '@/components/subComponents/ProductPayment'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/Provider/useCart'
import { IProduto } from '@/types/product'
import { useEffect, useState } from 'react'

export default function Page() {
  const { isOpen, openCart, closeCart, items, addItem, clearCart } = useCart()
  const { accessToken, logout } = useAuth()
  const isLogged = !!accessToken
  const { apiRequest } = useApi()
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const total = items.reduce((sum, it) => {
      const preco = Number(it.preco ?? 0)
      const quantidade = Number(it.quantidade ?? 0)
      return sum + preco * quantidade
    }, 0)
    setPrice(total)
  }, [items])
  return (
    <div className="flex flex-col items-start h-full gap-16 ">
      <NavBar />
      <div className="w-full px-5 md:px-30 flex flex-col gap-8 font-bold">
        <p className="text-4xl">Finalizar compra</p>

        <div className="flex flex-col gap-4">
          <div className="w-full md:w-[660px]  flex flex-col gap-4 items-center">
            <ul className="w-full">
              {items.length === 0 ? (
                <li>Seu carrinho está vazio</li>
              ) : (
                items.map(item => {
                  const product: IProduto = {
                    idProduto: item.idProduto,
                    idVendedor: '',
                    nome: item.nome || 'Produto',
                    categoria: '',
                    tipoVenda: 0,
                    preco: item.preco ?? 0,
                    descricao: '',
                    imagemUrl: item.imagemUrl || '/images/placeholder.png',
                    quantidade: item.quantidade ?? 0,
                    quantidadeVendida: 0,
                    avaliacoes: []
                  }

                  return (
                    <li
                      key={String(item.idProduto)}
                      className="w-full flex justify-between items-center"
                    >
                      <ProductPayment product={product} />
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>
        <p className="text-xl">Total: R$ {price.toFixed(2)}</p>
        <form className="flex flex-col gap-4 ">
          <p className="text-xl">Forma de pagamento:</p>
          <div className="flex flex-col sm:flex-row gap-4 w-80">
            <Button>Pix</Button>
            <Button>Cartão</Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
