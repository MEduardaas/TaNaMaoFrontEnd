'use client'
import LinkNavigation from '@/components/LinkNavigation'
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

export default function Home() {
  const [menuState, setMenuState] = useState(false)

  return (
    <div className="flex flex-col min-h-screen gap-16">
      <nav className="bg-primary w-full h-16 flex items-center justify-between pr-4 lg:px-18">
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
              <Link
                href="/Login"
                className="text-white font-bold text-2xl hover:cursor-pointer flex items-center p-2 lg:hidden"
              >
                <User className="text-white m-4 " />
                Olá, Faça seu login
              </Link>
              <div className="flex flex-col gap-4 w-full lg:rounded-lg bg-white p-4 text-black">
                <h2 className="text-2xl">Minhas Compras</h2>
                <Link href="/" className="hover:underline">
                  Meus Pedidos
                </Link>
                <Link href="/" className="hover:underline">
                  Meus Favoritos
                </Link>

                <hr className="border-gray-300" />
                <h2 className="text-2xl">Destaques</h2>
                <Link href="/" className="hover:underline">
                  Mais Alugados
                </Link>
                <Link href="/" className="hover:underline">
                  Recomendações
                </Link>
                <Link href="/" className="hover:underline">
                  Mais vendidos
                </Link>
                <hr className="border-gray-300" />
                <h2 className="text-2xl">Categorias</h2>
                <Link href="/" className="hover:underline">
                  Ferramentas
                </Link>
                <Link href="/" className="hover:underline">
                  Eletrodomésticos
                </Link>
                <Link href="/" className="hover:underline">
                  Eletrônicos
                </Link>
                <Link href="/" className="hover:underline">
                  Festas e Eventos
                </Link>
                <hr className="border-gray-300" />
                <h2 className="text-2xl">Ajuda e Configurações</h2>
                <Link href="/" className="hover:underline">
                  Minha Conta
                </Link>
                <Link href="/" className="hover:underline">
                  Ajuda
                </Link>
              </div>
            </div>
          )}
          <MapPin className="text-white m-4 hover:cursor-pointer" />
        </span>
        <span className="flex items-center max-w-2xl w-full">
          <input
            type="text"
            placeholder='O que você está procurando? Ex: "Parafusadeira 3/4"'
            className="bg-white placeholder-gray-500 text-black rounded-l-2xl  w-full  h-7 border-white focus:outline-none pl-4"
          />
          <div className="bg-white rounded-r-2xl h-7 hover:cursor-pointer flex items-center justify-center pr-3">
            <Search className=" text-black  " />
          </div>
        </span>

        <span className="hidden lg:flex items-center sm:pl-12">
          <LinkNavigation href="/Cadastrar">Crie sua conta</LinkNavigation>
          <LinkNavigation href="/Login">Entrar</LinkNavigation>
          <User className="text-white m-4 hover:cursor-pointer" />
          <ShoppingCart className="text-white m-4 hover:cursor-pointer" />
          <Heart className="text-white m-4 hover:cursor-pointer" />
          <CirclePlus className="text-white m-4 hover:cursor-pointer" />
        </span>
      </nav>
    </div>
  )
}
