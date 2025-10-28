'use client'
import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import Button from '@/components/subComponents/Button'
import { Copy } from 'lucide-react'
import Image from 'next/image'

export default function page() {
  return (
    <div className="flex flex-col items-start h-full gap-16 ">
      <NavBar />
      <div className="w-full px-5 md:px-30 flex flex-col items-center gap-8 font-bold">
        <p className="text-4xl">Finalizar compra</p>
        <div className="p-4 border-2 border-black rounded-2xl">
          <Image
            src="/images/qr-code.png"
            alt="Pagamento via Pix"
            width={200}
            height={100}
          />
        </div>
        <h2 className="text-2xl">Codigo Pix</h2>
        <div className="bg-gray-300 rounded-2xl p-2 flex justify-between items-center max-w-max gap-2">
          <p>qeweqwesafs1342345sdgfasdfg25aghfh8d0gh8xf9g80s...</p>
          <Copy />
        </div>
        <p className="text-lg">Nome da Instituição: TaNaMao</p>
        <p className="text-lg">CNPJ: 28.409.509/0001-01 </p>
        <div className="w-40">
          <Button onClick={() => (window.location.href = '/Sucesso')}>
            Concluir
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
