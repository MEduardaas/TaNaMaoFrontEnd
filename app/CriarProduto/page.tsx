'use client'
import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import Button from '@/components/subComponents/Button'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { accessToken, loading } = useAuth()

  if (!accessToken) {
    window.location.href = '/Login'
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="flex flex-col h-full gap-16">
      <NavBar />
      <div className="flex gap-8  font-bold items-center justify-center">
        <form className="flex flex-col gap-4 border-2 border-gray-300 rounded-lg p-10 text-lg">
          <h1 className="text-4xl">Criação de Produto</h1>
          <p className="text-xl text-gray-600 ">
            Preencha os campos com as informações do seu produto.{' '}
          </p>

          <label htmlFor="nome">Nome do Produto</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite o nome do produto"
            className="border-2 border-gray-300 rounded-lg p-2"
          />

          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            className="border-2 border-gray-300 rounded-lg p-2"
          >
            <option value="">Selecione uma categoria</option>
            <option value="moveis">Móveis</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="livros">Livros</option>
            <option value="jogos">Jogos</option>
            <option value="brinquedos">Brinquedos</option>
            <option value="automoveis">Automóveis</option>
            <option value="esportes_lazer">Esportes</option>
            <option value="moda">Moda</option>
            <option value="beleza">Beleza</option>
            <option value="ferramentas">Ferramentas</option>
            <option value="eletrodomesticos">Eletrodomésticos</option>
          </select>

          <label htmlFor="tipoVenda">Tipo de Venda</label>
          <select
            id="tipoVenda"
            className="border-2 border-gray-300 rounded-lg p-2"
          >
            <option value="">Selecione um tipo de venda</option>
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
          </select>

          <label htmlFor="preco">Preço do Produto</label>
          <input
            type="text"
            id="preco"
            placeholder="Digite o preço do produto"
            className="border-2 border-gray-300 rounded-lg p-2"
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            placeholder="Digite a descrição do produto"
            className="border-2 border-gray-300 rounded-lg p-2"
          />

          <label htmlFor="imagem">Imagem do Produto</label>
          <input
            type="file"
            id="imagem"
            accept="image/png, image/jpeg"
            className="border-2 border-gray-300 rounded-lg p-2"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="termos"
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="termos">Li e aceito os termos e condições.</label>
          </div>
          <Link href="/">
            <p className="text-gray-600 hover:underline">Ler termos</p>
          </Link>
          <div className="w-full px-50">
            <Button>Criar produto</Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
