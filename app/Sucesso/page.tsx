'use client'
import Footer from "@/components/PrinComponents/Footer";
import NavBar from "@/components/PrinComponents/NavBar";
import Button from "@/components/subComponents/Button";
import Image from "next/image";

export default function page() {
    return(<div className="flex flex-col items-center  h-full gap-16  ">
        <NavBar />
        <div className="w-max my-20 flex flex-col  gap-8">
            <Image src="/images/success.png" alt="Sucesso" width={300} height={300} className="mx-auto mt-24"/>
            <h1 className="text-4xl font-bold text-center mt-4">Pagamento concluído!</h1>
            <p className="text-xl text-gray-600 text-center mt-2">Seu pagamento foi efetuado e o produto ja estara sendo preparado.</p>

            <Button>Voltar para menu</Button>
        </div>
        <Footer />
    </div>)
}