'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardPerfil from '@/components/subComponents/CardPerfil'
import LinkNavigation from '@/components/subComponents/LinkNavigation'

import 'glider-js/glider.min.css'
import { History, IdCard , Lock, User, } from 'lucide-react'
import React from 'react'

export default function Page() {
  return (
   
    <div className="flex flex-col h-full gap-16 mt-20">
      <NavBar />
      <div className="flex justify-start items-center mt-10 gap-5 ml-32">

        <img src="/images/avatar.png" alt="User Avatar" />

        <div className="flex justify-center mb-5 flex-col ">
            <h1 className="text-2xl font-bold mb-5">Nome</h1>
            <p>Email: usuario@example.com</p>
        </div>

      </div>

      <div className="flex justify-center gap-20 mb-20">
        <div> 
          <CardPerfil
          title="Minhas Informações"
          description="Informações pessoais como nome, telefone e endereço."
        />

      <LinkNavigation href="/DadosDaConta" >
      <CardPerfil
        title="Dados da Conta"
        description="Dados que representam a conta no TaNaMao."/>
      </LinkNavigation>
      </div>

      <div>

        <LinkNavigation href="/Seguranca" >
          <CardPerfil
        title="Seguranca"
        description="Configure suas preferências de segurança."
        />
        </LinkNavigation>

      <LinkNavigation href="/Historico">
        <CardPerfil
          title="Historico"
          description="Endereços salvos na sua conta."/>
          </LinkNavigation>
        </div>
        
        </div>
    
    <Footer />
    </div>
  )
}
