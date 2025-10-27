'use client'
import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import { useState } from 'react'
export default function Page() {
    
  const [abaAtiva, setAbaAtiva] = useState("Compras");

  const produtos: Record<string, { id: number; nome: string; preco: string; imagem: string }[]> = {
    Compras: [],
    Vendas: [],
    Aluguéis: [],
  };
  return (
       <div className="flex flex-col h-full gap-16">
          <NavBar />
    <div className="flex flex-col ml-10 mt-10 font-sans">
    <h1 className="text-4xl p-4">Histórico</h1>
      <div className="flex gap-6 border-b border-gray-200 mb-4 w-1/2">
        {["Compras", "Vendas", "Aluguéis"].map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`pb-2 text-gray-700 font-medium ${
              abaAtiva === aba
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {aba}
          </button>
        ))}
      </div>
      <div className="p-8 shadow-md rounded-2xl w-64 border bg-white">
        {produtos[abaAtiva].map((p) => (
          <div key={p.id} className="flex items-center mb-3 gap-3">
            <div>
              <p className="font-semibold text-gray-800">{p.nome}</p>
              <p className="text-gray-500 text-sm">{p.preco}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
       <Footer />
    </div>
  );
}
