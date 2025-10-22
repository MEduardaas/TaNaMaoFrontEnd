import { History, IdCard, Lock, RefreshCwOff, User } from 'lucide-react'
import Link from 'next/link'
import LinkNavigation from '../LinkNavigation'

export default function CardPerfil({
  title,
  description
}: {
  title: string
  description: string
}) {
  let icon = null
  switch (title) {
    case 'Dados da Conta':
      icon = <RefreshCwOff className="w-10 h-10" />

      break
    case 'Usuário':
      icon = <User className="w-10 h-10" />
      break
    case 'Minhas Informações':
      icon = <IdCard className="w-10 h-10" />
      break
    case 'Segurança':
      icon = <Lock className="w-10 h-10" />
      break
    case 'Histórico':
      icon = <History className="w-10 h-10" />
      break
    default:
      icon = <RefreshCwOff className="w-10 h-10" />
      break
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-500 hover:scale-105 flex items-start gap-4 w-124 h-40">
      {icon}
      <div>
        <h2 className="text-xl  mb-4">{title}</h2>
        <p>{description} </p>
      </div>
    </div>
  )
}
