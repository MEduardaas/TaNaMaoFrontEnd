'use client'
import Footer from "@/components/PrinComponents/Footer";
import NavBar from "@/components/PrinComponents/NavBar";
import Button from "@/components/subComponents/Button";
import Image from "next/image";


export default function page() {
    return(<div className="flex flex-col items-start h-full gap-16 ">
     <NavBar />
     <div className="w-max mt-[50px] pl-[90px] flex flex-col gap-8 font-bold">
            <p className="text-4xl">Finalizar compra</p>
           
          <div className="flex flex-col gap-4">
            <div className="w-[660px] bg-gray-400/30  p-6 flex flex-col gap-4 items-center shadow-sm">
            <Image src="/images/retanguloPagamento.png" alt="Pagamento" width={900} height={400} className="mx-auto"/>
            <Image src="/images/retanguloPagamento.png" alt="Pagamento" width={900} height={400} className="mx-auto"/>
            </div>
          </div>
           <p className="text-xl">Total: R$ 100,00</p>
        <form className="flex flex-col gap-4 ">
                <p className="text-xl">Forma de pagamento:</p>
            <div className="flex gap-4 w-full p-4">
                <Button>Pix</Button>
                <Button>Cartão</Button>
            </div>
        </form>
     </div>
        <Footer />
    </div>)
}