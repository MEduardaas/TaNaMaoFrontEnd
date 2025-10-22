'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import CardSeguranca from '@/components/subComponents/CardSeguranca'

import 'glider-js/glider.min.css'
import {ChevronRight} from 'lucide-react'
import React from 'react'

export default function Page() {
  return (
   
    <div className="flex flex-col min-h-screen gap-16 mt-20">
      <NavBar />
        <div className="flex flex-col mt-10 p-4 w-full ">

          <div className='w-full flex flex-col gap-6'>
          <CardSeguranca
          title="Tenho um problema de segurança"
          description=""
        
          />

          <CardSeguranca
          title="Métodos de verificação"
          description="Sua conta está protegida."
          />

          <CardSeguranca
          title="Desbloqueio do app"
          description="Use o método de desbloqueio do seu telefone para acessar sua conta."
          />

          <CardSeguranca
          title="Dispositivos vinculados"
          description="Gerencie os dispositivos onde você iniciou sessão."
          />

          <CardSeguranca
          title="Pessoas de confiança"
          description="Adicione pessoas para que reportem seus problemas de segurança."
          />

          <CardSeguranca
          title="Alerta de segurança"
          description="Revise seus alertas e os reportem seus problemas de segurança."
          />

          <CardSeguranca
          title="Permissões de localização"
          description="Mantenha sua localização ativa para prevenir riscos."
          />
          </div>
        </div>
    
    <Footer />
  </div>
       
  )
}