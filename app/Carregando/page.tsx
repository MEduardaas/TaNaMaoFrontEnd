import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import React from 'react'

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <NavBar />
      <div className="mt-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-indigo-400 my-15">
          Carregando ...
        </h1>
      </div>
      <Footer />
    </main>
  )
}
