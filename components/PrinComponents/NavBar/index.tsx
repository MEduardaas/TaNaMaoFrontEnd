'use client'
import LinkNavigation from '@/components/subComponents/LinkNavigation'
import {
  CirclePlus,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function NavBar() {
  const [menuState, setMenuState] = useState(false)
  const [cartState, setCartState] = useState(false)
  return (
    <nav className="fixed top-0 bg-primary w-full h-16 flex items-center justify-between pr-4 lg:px-18">
      <span className="flex items-center ">
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
            </div>
          </div>
        )}
        <MapPin className="text-white m-4 hover:cursor-pointer" />
      </span>
      <span className="flex items-center max-w-2xl w-full">
        <input
          type="text"
          placeholder='O que você está procurando? Ex: "Parafusadeira 3/4"'
          className="bg-background placeholder-gray-500 text-black rounded-l-2xl  w-full  h-7 border-white focus:outline-none pl-4"
        />
        <div className="bg-background rounded-r-2xl h-7 hover:cursor-pointer flex items-center justify-center pr-3">
          <Search className=" text-black  " />
        </div>
      </span>

      <span className="hidden lg:flex items-center sm:pl-12">
        <LinkNavigation href="/Cadastrar" className="text-white mr-4">
          Crie sua conta
        </LinkNavigation>
        <LinkNavigation href="/Login" className="text-white">
          Entrar
        </LinkNavigation>
        <LinkNavigation href="/Perfil" className="">
          <User className="text-white m-4 hover:cursor-pointer" />
        </LinkNavigation>
        {cartState ? (
          <ShoppingCart
            className="text-white m-4 hover:cursor-pointer "
            onClick={() => setCartState(!cartState)}
          />
        ) : (
          <ShoppingCart
            className="text-white m-4 hover:cursor-pointer "
            onClick={() => setCartState(!cartState)}
          />
        )}
        <Heart className="text-white m-4 hover:cursor-pointer" />
        <CirclePlus className="text-white m-4 hover:cursor-pointer" />
        {cartState && (
          <div className="absolute top-16 right-0 lg:right-5 lg:rounded-lg w-full lg:max-w-fit bg-white flex flex-col items-start gap-4  z-10">
            <div className="flex flex-col gap-4 w-full lg:rounded-lg bg-white p-4 text-black">
              <h2 className="text-2xl">Meu Carrinho</h2>
              <hr className="border-gray-300" />
              <ul>
                <li>Seu carrinho está vazio</li>
              </ul>
            </div>
          </div>
        )}
      </span>
    </nav>
  )
}
