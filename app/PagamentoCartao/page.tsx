'use client'

import Footer from "@/components/PrinComponents/Footer";
import NavBar from "@/components/PrinComponents/NavBar";
import Button from "@/components/subComponents/Button";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />

      <div className="w-full max-w-[900px] mx-auto px-6 mt-10 flex flex-col gap-8 font-bold">
        <p className="text-4xl">Finalizar compra</p>

        {/* Retângulos de pagamento */}
        <div className="w-full bg-gray-400/30 p-6 flex flex-col gap-6 items-center shadow-sm rounded-lg">
          <Image
            src="/images/retanguloPagamento.png"
            alt="Pagamento"
            width={900}
            height={400}
            className="max-w-full h-auto rounded-md"
          />
          <Image
            src="/images/retanguloPagamento.png"
            alt="Pagamento"
            width={900}
            height={400}
            className="max-w-full h-auto rounded-md"
          />
        </div>
        <div className="w-full flex justify-start">
          <div>
            <p className="py-4">Total: R$ 100,00</p>
            <form className="flex flex-col gap-4">
              <p className="text">Forma de pagamento:</p>
              <div className="flex flex-wrap gap-4 py-2">
                <div className="w-[120px]">
                  <Button>Pix</Button>
                </div>
                <button
                  style={{
                    backgroundColor: "#16A34A",
                    color: "white",
                    border: "2px solid black",
                    fontWeight: "bold",
                    width: "120px",
                    padding: "8px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  className="hover:bg-white hover:text-black"
                >
                  Cartão
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Formulário de pagamento */}
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="numeroCartao" className="flex flex-col">Número do Cartão
                <input
                  type="text"
                  id="numeroCartao"
                  name="numeroCartao"
                  placeholder="0000 0000 0000 0000"
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  inputMode="numeric"
                  required
                />
              </label>
            </div>

            <div className="w-28 flex flex-col">
              <label htmlFor="cvc" className="flex flex-col">CVC
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  inputMode="numeric"
                  required
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label htmlFor="nomeTitular" className="flex-1 flex flex-col">Nome do Titular
                <input
                type="text"
                id="nomeTitular"
                name="nomeTitular"
                placeholder="Nome do Titular"
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </label>

            <label htmlFor="validade" className="flex flex-col">Validade
              <input
                type="text"
                id="validade"
                name="validade"
                className="border-2 border-gray-300 rounded-lg p-2 w-40"
                placeholder="MM/AAAA"
                required
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <label htmlFor="cpf" className="flex-1 flex flex-col">CPF

              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </label>

            <label htmlFor="tipoCartao" className="flex flex-col">Tipo de Cartão
              <select
                id="tipoCartao"
                name="tipoCartao"
                className="border-2 border-gray-300 rounded-lg p-2 w-40"
                required
              >
                <option value="" disabled selected>
                  Selecione
                </option>
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="amex">American Express</option>
                <option value="elo">Elo</option>
              </select>
            </label>
          </div>
        </form>

        {/* Endereço */}
        <div className="w-full mt-4">
          <p className="text-xl">Endereço de entrega</p>
          <form className="flex flex-col gap-4 w-full mt-2">
            <div className="flex flex-wrap gap-4 w-full">
              <div className="w-40 flex flex-col">
                <label htmlFor="cep" className="flex flex-col">CEP
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    placeholder="00000-000"
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                    inputMode="numeric"
                  />
                </label>
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="rua" className="flex flex-col">Rua
                  <input
                    type="text"
                    id="rua"
                    name="rua"
                    placeholder="Rua"
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 w-full">
              <div className="w-28 flex flex-col">
                <label htmlFor="numero" className="flex flex-col">Número
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    placeholder="123"
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                    inputMode="numeric"
                  />
                </label>
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="complemento" className="flex flex-col">Complemento
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    placeholder="Apto, Bloco, etc."
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 w-full">
              <div className="flex-1 flex flex-col">
                <label htmlFor="bairro" className="flex flex-col">Bairro
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    placeholder="Bairro"
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="cidade" className="flex flex-col">Cidade
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    placeholder="Cidade"
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
              </div>

              <div className="w-28 flex flex-col">
                <label htmlFor="estado" className="flex flex-col">Estado
                  <input
                    type="text"
                    id="estado"
                    name="estado"
                    placeholder="UF"
                    maxLength={2}
                    className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="p-4 w-full flex justify-center">
        <div className="w-full max-w-[400px]">
            <Button>Finalizar Pagamento</Button>
        </div>
        </div>
        </div>

      <Footer />
    </div>
  );
}
