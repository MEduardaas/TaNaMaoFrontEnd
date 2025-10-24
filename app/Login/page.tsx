'use client'
import Button from '@/components/subComponents/Button'
import Input from '@/components/subComponents/Input'
import LinkNavigation from '@/components/subComponents/LinkNavigation'
import { Failed } from '@/components/subComponents/Popup'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/api'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({ email: '', senha: '' })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(form)
    const res = await apiRequest('/login', 'POST', form)
    if (res.accessToken) {
      window.location.href = '/Perfil'
    } else {
      setMessage(res.error ? res.error : 'Erro desconhecido')
    }
  }
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
        className="relative bg-background h-full w-full xl:w-1/2 flex justify-center items-center py-5 px-2"
      >
        <Link
          href="/"
          className="absolute top-4 left-4 z-50 bg-black text-white p-2 rounded-full shadow"
          aria-label="Voltar"
        >
          <ArrowLeft />
        </Link>
        <form
          onSubmit={handleSubmit}
          className="h-min p-10 pb-4  w-full max-w-96 flex flex-col justify-center items-center mx-auto gap-4 text-black border-2 border-gray-300 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl  font-light mb-4">Entrar</h1>
          <div className="w-full flex justify-center items-start flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Email"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <label htmlFor="password">Senha</label>
            <Input
              type="password"
              placeholder="**********"
              onChange={e => setForm({ ...form, senha: e.target.value })}
            />
            <LinkNavigation href="/" className="text-blue-500 font-bold">
              Esqueceu a senha?
            </LinkNavigation>
          </div>
          <Button>Entrar</Button>
          {message && <Failed>{message}</Failed>}
          <p className="text-gray-500">
            Não possui uma conta?{' '}
            <LinkNavigation href="/Cadastrar" className="text-blue-500">
              Crie uma conta
            </LinkNavigation>
          </p>
        </form>
      </div>
    </div>
  )
}
