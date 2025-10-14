'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardPerfil from '@/components/subComponents/CardPerfil'

import 'glider-js/glider.min.css'
import { History, IdCard , Lock, User, } from 'lucide-react'
import React from 'react'

export default function Page() {
  return (

   
    <div className="flex flex-col h-full gap-16 mt-20">
      <NavBar />
      <div className="flex justify-center items-center mt-10 mb-10 gap-10">

        <img src="/images/avatar.png" alt="User Avatar" />

        <div className="flex justify-center mb-8 flex-col ">
            <h1 className="text-3xl font-bold mb-8">Nome</h1>
            <p>Email: usuario@example.com</p>
             </div>

      </div>

       <CardPerfil
        title="Minhas Informações"
        description="Informações pessoais como nome, telefone e endereço."
      />

      <CardPerfil
        title="Dados da Conta"
        description="Dados que representam a conta no TaNaMao."
      />

      <CardPerfil
        title="Segurança"
        description="Configure suas preferências de segurança."
      />

        <CardPerfil
          title="Histórico"
          description="Endereços salvos na sua conta."
        />
    

    <Footer />
    </div>
     
       
  )
}
