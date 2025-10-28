'use client'
import Button from '@/components/subComponents/Button'
import LinkNavigation from '@/components/subComponents/LinkNavigation'
import ProductCart from '@/components/subComponents/ProductCart'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/Provider/useCart'
import { IProduto } from '@/types/product'
import {
  CirclePlus,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NavBar() {
  const [menuState, setMenuState] = useState(false)
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

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await apiRequest('/carrinho', 'GET')
        clearCart()

        if (res.carrinho && Array.isArray(res.carrinho)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res.carrinho.forEach(async (item: any) => {
            const resProduto = await apiRequest(
              `/produtos/${item.idProduto}`,
              'GET'
            )
            addItem(
              {
                idProduto: String(resProduto.produto._id),
                nome: resProduto.produto.nome,
                preco: resProduto.produto.preco,
                imagemUrl: resProduto.produto.imagemUrl
              },
              item.quantidade
            )
          })
        }
      } catch (error) {
        console.error('Erro ao buscar carrinho:', error)
      }
    }

    getCart()
  }, [apiRequest])

  const finishCart = () => {
    closeCart()
    window.location.href = '/Pagamento'
  }

  return (
    <nav className=" bg-primary w-full h-16 flex items-center justify-between px-2 mb-4 lg:px-18">
      <span className="flex items-center ">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={70} height={40} />
        </Link>
        {menuState ? (
          <X
            className="text-white m-4 hover:cursor-pointer "
            onClick={() => setMenuState(!menuState)}
          />
        ) : (
          <Menu
            className="text-white m-4 hover:cursor-pointer "
            onClick={() => setMenuState(!menuState)}
          />
        )}
        {menuState && (
          <div className="absolute top-16 left-0 lg:left-5 lg:rounded-lg w-full lg:max-w-fit bg-primary flex flex-col items-start gap-4  z-10">
            <LinkNavigation
              href="/Login"
              className="text-white font-bold text-2xl flex items-center p-2 lg:hidden"
            >
              <User className="text-white m-4 " />
              Olá, Faça seu login
            </LinkNavigation>
            <div className="flex flex-col gap-4 w-full lg:rounded-lg bg-white p-4 text-black">
              <h2 className="text-2xl">Minhas Compras</h2>
              <LinkNavigation href="/">Meus Pedidos</LinkNavigation>
              <LinkNavigation href="/">Meus Favoritos</LinkNavigation>

              <hr className="border-gray-300" />
              <h2 className="text-2xl">Destaques</h2>
              <LinkNavigation href="/">Mais Alugados</LinkNavigation>
              <LinkNavigation href="/">Recomendações</LinkNavigation>
              <LinkNavigation href="/">Mais vendidos</LinkNavigation>
              <hr className="border-gray-300" />
              <h2 className="text-2xl">Categorias</h2>
              <LinkNavigation href="/">Ferramentas</LinkNavigation>
              <LinkNavigation href="/">Eletrodomésticos</LinkNavigation>
              <LinkNavigation href="/">Eletrônicos</LinkNavigation>
              <LinkNavigation href="/">Festas e Eventos</LinkNavigation>
              <hr className="border-gray-300" />
              <h2 className="text-2xl">Ajuda e Configurações</h2>
              <LinkNavigation href="/" className="">
                Minha Conta
              </LinkNavigation>
              <LinkNavigation href="/" className="">
                Ajuda
              </LinkNavigation>
              {isLogged && (
                <button
                  className="bg-red-500 border-2 font-bold border-red-500 w-full text-white p-2 rounded-xl cursor-pointer hover:bg-white hover:text-red-500 transition-colors"
                  onClick={logout}
                >
                  Deslogar
                </button>
              )}
            </div>
          </div>
        )}
      </span>
      <span className="flex items-center max-w-2xl w-full">
        <input
          type="text"
          placeholder='O que você está procurando? Ex: "Parafusadeira 3/4"'
          className="bg-background placeholder-gray-500 text-black rounded-l-2xl  w-full  h-8 border-white focus:outline-none pl-4"
        />
        <div className="bg-background rounded-r-2xl h-8 hover:cursor-pointer flex items-center justify-center pr-3">
          <Search className=" text-black  " />
        </div>
      </span>

      <span className="hidden lg:flex items-center sm:pl-12">
        {!isLogged && (
          <>
            <LinkNavigation href="/Cadastrar" className="text-white mr-4">
              Crie sua conta
            </LinkNavigation>
            <LinkNavigation href="/Login" className="text-white">
              Entrar
            </LinkNavigation>
          </>
        )}

        <LinkNavigation href="/Perfil" className="">
          <User className="text-white m-4 hover:cursor-pointer" />
        </LinkNavigation>

        {isOpen ? (
          <ShoppingCart
            className="text-white m-4 hover:cursor-pointer "
            onClick={closeCart}
          />
        ) : (
          <ShoppingCart
            className="text-white m-4 hover:cursor-pointer "
            onClick={openCart}
          />
        )}
        <Heart className="text-white m-4 hover:cursor-pointer" />
        <LinkNavigation href="/CriarProduto">
          <CirclePlus className="text-white m-4 hover:cursor-pointer" />
        </LinkNavigation>
        {isOpen && (
          <div className="absolute top-16 right-0 lg:right-5 lg:rounded-lg w-full lg:max-w-fit bg-white flex flex-col items-start gap-4  z-10">
            <div className="flex flex-col gap-4 w-full lg:rounded-lg bg-white p-4 text-black">
              <h2 className="text-2xl">Meu Carrinho</h2>
              <hr className="border-gray-300" />
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
                        <ProductCart product={product} />
                      </li>
                    )
                  })
                )}
              </ul>
              {items.length > 0 && (
                <>
                  <hr className="border-gray-300" />
                  <div className="w-full flex justify-start items-center">
                    <span className="font-bold text-lg">Total: R$ </span>
                    <span className="font-bold text-lg">
                      {price.toFixed(2)}
                    </span>
                  </div>
                  <Button onClick={finishCart}>Finalizar Compra</Button>
                </>
              )}
            </div>
          </div>
        )}
      </span>
    </nav>
  )
}
