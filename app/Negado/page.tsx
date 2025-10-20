import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import Button from '@/components/subComponents/Button'
import LinkNavigation from '@/components/subComponents/LinkNavigation'
import Image from 'next/image'
import React from 'react'

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <NavBar />
      <div className="mt-12 flex flex-col items-center justify-center">
        <Image src="/images/401.png" alt="401" width={200} height={200} />
        <h1 className="text-4xl font-bold text-indigo-400 mt-8">
          Acesso Negado!
        </h1>
        <p className="text-sm text-black py-8 ">
          Você não tem permissão para acessar esta página.
        </p>
        <LinkNavigation href="/Login">
          <Button>Voltar para o Login</Button>
        </LinkNavigation>
      </div>
      <Footer />
    </main>
  )
}
