'use client'
import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import Button from '@/components/subComponents/Button'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Carregando from '@/app/Carregando/page'
import { useRouter } from 'next/navigation'
import { useApi } from '@/hooks/useApi'
import { useEffect } from 'react'

export default function Page() {
  const { accessToken, loading } = useAuth()
  const router = useRouter()
  const { apiRequest } = useApi()

  const fetchPayment = async () => {
    try {
      const res = await apiRequest('/pedidos', 'POST')
      return res
    } catch (error) {
      console.error('Erro ao buscar dados do pagamento:', error)
    }
  }

  useEffect(() => {
    fetchPayment()
  }, [])

  if (loading) return <Carregando />

  if (!accessToken) {
    window.location.href = '/Login'
  }
  return (
    <div className="flex flex-col items-center  h-full gap-16  ">
      <NavBar />
      <div className="w-max  flex flex-col  gap-8">
        <Image
          src="/images/success.png"
          alt="Sucesso"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold text-center mt-4">
          Pagamento concluído!
        </h1>
        <p className="text-xl text-gray-600 text-center mt-2">
          Seu pagamento foi efetuado e o produto ja estara sendo preparado.
        </p>

        <Button onClick={() => router.push('/')}>Voltar para menu</Button>
      </div>
      <Footer />
    </div>
  )
}
