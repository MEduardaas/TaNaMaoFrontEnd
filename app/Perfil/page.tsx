'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardPerfil from '@/components/subComponents/CardPerfil'
import { useAuth } from '@/hooks/useAuth'
import { useApi } from '@/hooks/useApi'
import Carregando from '@/app/Carregando/page'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const { accessToken, loading } = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null)
  const { apiRequest } = useApi()

  useEffect(() => {
    if (loading) return

    const fetchUser = async () => {
      try {
        const res = await apiRequest('/perfil', 'GET')
        setUser(res.user)
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      }
    }

    fetchUser()
  }, [apiRequest, accessToken, loading])

  if (loading) return <Carregando />

  if (!accessToken) {
    window.location.href = '/Login'
  }

  return (
    <div className="flex flex-col h-full gap-16">
      <NavBar />
      <div className="flex justify-start items-center gap-5 ml-32">
        <img src="/images/avatar.png" alt="User Avatar" />

        <div className="flex justify-center mb-5 flex-col ">
          <h1 className="text-2xl font-bold mb-5">
            {user ? user.nome : 'Usuário'}
          </h1>
          <p>Email: {user ? user.email : 'Email'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full px-32">
        <Link href="/MinhasInformacoes">
          <CardPerfil
            title="Minhas Informações"
            description="Informações pessoais como nome, telefone e endereço."
          />
        </Link>

        <Link href="/DadosDaConta">
          <CardPerfil
            title="Dados da Conta"
            description="Dados que representam a conta no TaNaMao."
          />
        </Link>

        <Link href="/Seguranca">
          <CardPerfil
            title="Segurança"
            description="Configure suas preferências de segurança."
          />
        </Link>

        <Link href="/Historico">
          <CardPerfil
            title="Histórico"
            description="Endereços salvos na sua conta."
          />
        </Link>
      </div>

      <Footer />
    </div>
  )
}
