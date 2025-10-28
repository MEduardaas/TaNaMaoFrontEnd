import {
  Armchair,
  Baby,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gamepad2,
  Hammer,
  RefreshCwOff,
  Shirt,
  Smartphone,
  WandSparkles
} from 'lucide-react'
import Link from 'next/link'

export default function CardCategories({ title }: { title: string }) {
  let icon = null
  switch (title) {
    case 'Móveis':
      icon = <Armchair className="w-10 h-10" />
      break
    case 'Eletrônicos':
      icon = <Smartphone className="w-10 h-10" />
      break
    case 'Livros':
      icon = <BookOpen className="w-10 h-10" />
      break
    case 'Ferramentas':
      icon = <Hammer className="w-10 h-10" />
      break
    case 'Serviços':
      icon = <BriefcaseBusiness className="w-10 h-10" />
      break
    case 'Jogos':
      icon = <Gamepad2 className="w-10 h-10" />
      break
    case 'Brinquedos':
      icon = <Baby className="w-10 h-10" />
      break
    case 'Automóveis':
      icon = <CarFront className="w-10 h-10" />
      break
    case 'Esportes':
      icon = <Dumbbell className="w-10 h-10" />
      break
    case 'Moda':
      icon = <Shirt className="w-10 h-10" />
      break
    case 'Beleza':
      icon = <WandSparkles className="w-10 h-10" />
      break
    case 'Ferramentas':
      icon = <Hammer className="w-10 h-10" />
      break
    default:
      icon = <RefreshCwOff className="w-10 h-10" />
      break
  }

  return (
    <Link
      href={{ pathname: '/produtos', query: { categoria: title } }}
      className="flex flex-col items-center justify-center gap-2  p-4 rounded-lg max-w-max"
    >
      <div className="bg-primary p-6 rounded-full text-white">{icon}</div>
      <h4>{title}</h4>
    </Link>
  )
}
