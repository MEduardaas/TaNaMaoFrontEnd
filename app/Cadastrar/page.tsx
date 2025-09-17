'use client'
import Button from '@/components/subComponents/Button'
import Input from '@/components/subComponents/Input'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center h-screen w-screen">
      <div
        id="left"
        className="bg-[url('/images/bg.png')] bg-cover h-1/3 sm:h-2/3 xl:h-full w-full xl:w-1/2 xl:p-5 flex justify-center items-center px-2"
      >
        <Image
          src="/images/logo.png"
          alt="Background"
          width={300}
          height={300}
          className="xl:w-md"
          quality={100}
        />
      </div>
      <div
        id="right"
        className="relative bg-white h-full w-full xl:w-1/2 flex justify-center items-center py-5 px-2"
      >
        <Link
          href="/"
          className="absolute top-10 sm:top-4 left-4 z-50 bg-black text-white p-2 rounded-full shadow"
          aria-label="Voltar"
        >
          <ArrowLeft />
        </Link>
        <form className="h-min p-10 pb-4  w-full max-w-96 flex flex-col justify-center items-center mx-auto gap-4 text-black border-2 border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-4xl  font-light mb-4">Registrar</h1>
          <div className="w-full flex justify-center items-start flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              placeholder="Nome Completo"
              onChange={e => console.log(e.target.value)}
            />
            <label htmlFor="cpf">CPF</label>
            <Input
              type="text"
              placeholder="123.456.789-00"
              onChange={e => console.log(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Email"
              onChange={e => console.log(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
            <Input
              type="password"
              placeholder="**********"
              onChange={e => console.log(e.target.value)}
            />
            <label htmlFor="password">Confirmar Senha</label>
            <Input
              type="password"
              placeholder="**********"
              onChange={e => console.log(e.target.value)}
            />
          </div>
          <Button>Criar</Button>
          <p className="text-gray-500">
            Já possui uma conta?{' '}
            <Link href="/Login" className="text-blue-500 hover:underline">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
