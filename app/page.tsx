import LinkNavigation from '@/components/LinkNavigation'
import {
  CirclePlus,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-16">
      <nav className="bg-primary w-full h-16 flex items-center justify-between sm:px-18">
        <span className="flex items-center ">
          <Menu className="text-white m-4 hover:cursor-pointer" />
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

        <span className="flex items-center sm:pl-12">
          <LinkNavigation href="/Cadastrar">Crie sua conta</LinkNavigation>
          <LinkNavigation href="/login">Entrar</LinkNavigation>
          <User className="text-white m-4 hover:cursor-pointer" />
          <ShoppingCart className="text-white m-4 hover:cursor-pointer" />
          <Heart className="text-white m-4 hover:cursor-pointer" />
          <CirclePlus className="text-white m-4 hover:cursor-pointer" />
        </span>
      </nav>
    </div>
  )
}
