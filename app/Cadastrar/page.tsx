'use client'
import Button from '@/components/subComponents/Button'
import Input from '@/components/subComponents/Input'
import LinkNavigation from '@/components/subComponents/LinkNavigation'
import { apiRequest } from '@/lib/api'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await apiRequest('/cadastro', 'POST', form)
      console.log(res.status)
      if (res.status === 201) {
        window.location.href = '/Login'
        return
      } else {
        console.log(res.status)
        setMessage(res.error ? res.error : 'Erro desconhecido')
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor')
      return
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
        />
      </div>
      <div
        id="right"
        className="relative bg-background h-full w-full xl:w-1/2 flex justify-center items-center py-5 px-2"
      >
        <Link
          href="/"
          className="absolute top-10 sm:top-4 left-4 z-50 bg-black text-white p-2 rounded-full shadow"
          aria-label="Voltar"
        >
          <ArrowLeft />
        </Link>
        <form
          onSubmit={handleSubmit}
          className="h-min p-10 pb-4  w-full max-w-96 flex flex-col justify-center items-center mx-auto gap-4 text-black border-2 border-gray-300 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl  font-light mb-4">Registrar</h1>
          <div className="w-full flex justify-center items-start flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              placeholder="Nome Completo"
              onChange={e => setForm({ ...form, nome: e.target.value })}
            />
            <label htmlFor="cpf">CPF</label>
            <Input
              type="text"
              placeholder="123.456.789-00"
              onChange={e => setForm({ ...form, cpf: e.target.value })}
            />
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
            <label htmlFor="password">Confirmar Senha</label>
            <Input
              type="password"
              placeholder="**********"
              onChange={e =>
                setForm({ ...form, confirmacaoSenha: e.target.value })
              }
            />
          </div>
          <Button>Criar</Button>
          {message && <p className="text-red-500">{message}</p>}
          <p className="text-gray-500">
            Já possui uma conta?{' '}
            <LinkNavigation href="/Login" className="text-blue-500">
              Faça login
            </LinkNavigation>
          </p>
        </form>
      </div>
    </div>
  )
}
