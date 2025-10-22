'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardPerfil from '@/components/subComponents/CardPerfil'

import 'glider-js/glider.min.css'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-16">
      <NavBar />
      <div className="flex justify-start items-center gap-5 ml-32">
        <img src="/images/avatar.png" alt="User Avatar" />

        <div className="flex justify-center mb-5 flex-col ">
          <h1 className="text-2xl font-bold mb-5">Nome</h1>
          <p>Email: usuario@example.com</p>
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
