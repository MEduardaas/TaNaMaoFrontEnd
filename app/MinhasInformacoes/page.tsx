'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'

import 'glider-js/glider.min.css'
import { useState } from 'react'
import Input from '@/components/subComponents/Input'
import Button from '@/components/subComponents/Button'

export default function Page() {
  return (
  <div className="flex flex-col h-full gap-18">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-4 ">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="md:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Minhas Informações</h2>
              <form className="flex flex-col gap-4  p-10">
               <label className="flex flex-col">
                  <label htmlFor="nome">Nome completo</label>
                  <input type="text" id="name" placeholder="Nome Completo"  className="border-2 border-gray-300 rounded-lg p-2"/>
                </label>

                <label className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="seu@email.com" className="border-2 border-gray-300 rounded-lg p-2" />
                </label>

               
                <label className="flex flex-col">
                  <label htmlFor="cpf">CPF</label>
                  <input type="text" id="cpf" placeholder="CPF" className="border-2 border-gray-300 rounded-lg p-2" />
                </label>

               <label className="flex flex-col">
                  <label htmlFor="telefone">Telefone</label>
                  <input type="text" id="telefone" placeholder="(00) 00000-0000" className="border-2 border-gray-300 rounded-lg p-2"/>
                </label>

              </form>
            </section>

            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Endereço</h2>
              <form >
                 <label className="flex flex-col">
                  <label htmlFor="cep">CEP</label>
                  <input type="text" id="cep" placeholder="00000000" className="border-2 border-gray-300 rounded-lg p-2" />
                </label>

                <label className="flex flex-col">
                  <label htmlFor="rua">Rua</label>
                  <input type="text" id="rua" placeholder="Nome da rua" className="border-2 border-gray-300 rounded-lg p-2" />
                </label>

                <label className="flex flex-col">
                  <label htmlFor="complemento">Complemento (opcional)</label>
                  <textarea name="complemento" id="complemento" className="border-2 border-gray-300 rounded-lg p-2" placeholder="Apto 123"></textarea>
                </label>

                 <label className="flex flex-col">
                  <label htmlFor="cidade">Cidade</label>
                  <input type="text" id="cidade" placeholder="Nome da cidade" className="border-2 border-gray-300 rounded-lg p-2" />
                </label>


                  <label className="flex flex-col">
                  <label htmlFor="estado">Estado</label>
                  <input type="text" id="estado" placeholder="Nome do estado" className="border-2 border-gray-300 rounded-lg p-2"/>
                </label>

              </form>
            </section>
           <div className="w-full px-50 ">
               <Button>Salvar</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>)
}

