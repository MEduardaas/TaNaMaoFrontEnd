'use client'
import NavBar from '@/components/PrinComponents/NavBar'
import Footer from '@/components/PrinComponents/Footer'
import { useParams } from 'next/navigation'
import Button from '@/components/subComponents/Button'
import { useEffect, useState } from 'react'
import { useCart } from '@/Provider/useCart'
import Avaliacao from '@/components/subComponents/Avaliacao'
import StarRating from '@/components/subComponents/StarRating'
import { useApi } from '@/hooks/useApi'
import { IProduto } from '@/types/product'

export default function ProdutoDetalhe() {
  const [produto, setProduto] = useState<IProduto | null>(null)
  const { openCart, addItem } = useCart()
  const { apiRequest } = useApi()
  const params = useParams()
  const produtoId = params.id
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')

  const fetchProduto = async () => {
    if (!produtoId) return
    const response = await apiRequest(`/produtos/${produtoId}`, 'GET')
    // Preencher nome do usuário nas avaliações quando necessário
    const produtoCarregado = response.produto
    if (produtoCarregado?.avaliacoes?.length) {
      const ids = Array.from(
        new Set(
          produtoCarregado.avaliacoes
            .map((a: any) => a.idUsuario)
            .filter(Boolean)
        )
      ) as string[]

      const nameMap: Record<string, string> = {}
      await Promise.all(
        ids.map(async id => {
          const idStr = String(id)
          try {
            const userRes = await apiRequest(`/usuarios/${idStr}`, 'GET')
            // Suporte a diferentes formatos de resposta: { usuario: { nome } } ou { nome }
            console.log('Resposta do usuário para ID', userRes)
            nameMap[idStr] = userRes.user?.nome || userRes.nome || 'Usuário'
          } catch (err) {
            console.warn('Não foi possível buscar nome do usuário', idStr, err)
            nameMap[idStr] = 'Usuário'
          }
        })
      )

      produtoCarregado.avaliacoes = produtoCarregado.avaliacoes.map(
        (a: any) => ({
          ...a,
          nome: a.nome || nameMap[a.idUsuario] || 'Usuário'
        })
      )
    }

    setProduto(produtoCarregado)
    console.log('Produto carregado:', produtoCarregado)
  }

  useEffect(() => {
    fetchProduto()
  }, [apiRequest, produtoId])

  if (!produto) return <div>Carregando...</div>
  const isVenda =
    typeof produto.tipoVenda === 'string'
      ? produto.tipoVenda === 'venda'
      : produto.tipoVenda === 1

  const handleAddToCart = async () => {
    try {
      console.log('Adicionar ao carrinho:', produtoId)
      try {
        const res = await apiRequest('/carrinho', 'POST', {
          idProduto: String(produtoId),
          quantidade: 1
        })

        addItem(
          {
            idProduto: String(produtoId),
            nome: produto?.nome ?? '',
            preco: produto?.preco,
            imagemUrl: produto?.imagemUrl
          },
          1
        )

        openCart()
      } catch (err) {
        console.error(
          'Erro na API ao adicionar ao carrinho (não bloqueia UI):',
          err
        )
      }
      openCart()
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await apiRequest(
        `/produtos/${produtoId}/avaliacoes`,
        'POST',
        {
          nota: rating,
          comentario: message
        }
      )
      // Após criar a avaliação, recarrega o produto para exibir a nova avaliação
      setMessage('')
      setRating(0)
      await fetchProduto()
      console.log('Avaliação enviada com sucesso:', res)
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center">
            {/* Placeholder imagem */}
            <img
              src={produto.imagemUrl}
              alt={produto.nome}
              className="h-full object-contain"
            />
          </div>

          <div className="w-full">
            <div className="w-1/2">
              <h1 className="text-2xl font-bold mb-2">{produto.nome}</h1>
              <p className="bg-green-200 text-green-900 rounded-md max-w-max p-2 text-sm text-gray-600 mb-2">
                {produto.categoria}
              </p>
              <p>Quantidade vendida: {produto.quantidadeVendida}</p>
              {isVenda ? (
                <>
                  <h2 className="text-xl font-bold">Preço de Compra</h2>
                </>
              ) : (
                <h2 className="text-xl font-bold mt-4">Preço de Aluguel</h2>
              )}

              <p className="text-xl font-bold mb-2">R$ {produto.preco}</p>
              <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
            </div>
            <div className="w-full border-2 border-gray-300 rounded-lg p-5 mt-6">
              <h1 className="text-lg font-bold">Descrição</h1>
              <ul>
                <li>{produto.descricao}</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold my-4">Comentário</h2>
          <form
            onSubmit={handleSubmitReview}
            className="w-100 flex flex-col gap-1"
          >
            <div className="mb-4">
              <p className="text-xl mb-2">Classificação</p>
              <StarRating value={rating} onChange={v => setRating(v)} />
            </div>

            <div className="mb-2">
              <p className="text-xl">Mensagem</p>
              <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-2 mt-2"
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className="w-50">
              <Button>Enviar</Button>
            </div>
          </form>
          {produto.avaliacoes?.length === 0 ? (
            <p>Nenhuma avaliação ainda.</p>
          ) : (
            produto.avaliacoes?.map(avaliacao => (
              <Avaliacao
                key={Math.random()}
                nome={avaliacao.nome}
                nota={avaliacao.nota}
                comentario={avaliacao.comentario}
                data={new Date(avaliacao.time).toLocaleDateString('pt-BR')}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
