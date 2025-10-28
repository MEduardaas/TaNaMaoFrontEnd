'use client'
import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'
import Button from '@/components/subComponents/Button'
import Input from '@/components/subComponents/Input'
import ProductPayment from '@/components/subComponents/ProductPayment'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/Provider/useCart'
import { IProduto } from '@/types/product'
import { Cartao, Endereco, IUserPublic } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Carregando from '@/app/Carregando/page'

export default function Page() {
  const { items } = useCart()
  const { accessToken, loading } = useAuth()
  const router = useRouter()
  const isLogged = !!accessToken
  const { apiRequest } = useApi()
  const [price, setPrice] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix')

  const defaultEndereco: Endereco = {
    telefone: '',
    cep: '',
    rua: '',
    complemento: '',
    cidade: '',
    estado: ''
  }

  const [cartao, setCartao] = useState<Cartao>({
    numero: '',
    nomeTitular: '',
    validade: '',
    cvc: '',
    tipoPagamento: 'credito'
  })

  const [user, setUser] = useState<IUserPublic & { endereco: Endereco[] }>({
    nome: '',
    email: '',
    cpf: '',
    endereco: [defaultEndereco]
  })

  const fetchUser = async () => {
    try {
      const res = await apiRequest('/perfil', 'GET')
      console.log('Dados do usuário:', res.user)
      setUser({
        nome: res.user.nome || '',
        email: res.user.email || '',
        cpf: res.user.cpf || '',
        endereco:
          Array.isArray(res.user.endereco) && res.user.endereco.length > 0
            ? [res.user.endereco[0]]
            : [defaultEndereco]
      })
      console.log(user)
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [apiRequest, accessToken])

  useEffect(() => {
    const total = items.reduce((sum, it) => {
      const preco = Number(it.preco ?? 0)
      const quantidade = Number(it.quantidade ?? 0)
      return sum + preco * quantidade
    }, 0)
    setPrice(total)
  }, [items])

  const fetchPayment = async () => {
    try {
      const res = await apiRequest('/pedidos', 'POST')
      return res
    } catch (error) {
      console.error('Erro ao buscar dados do pagamento:', error)
    }
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (paymentMethod === 'pix') {
      fetchPayment()
      router.push('/Pix')
    } else {
      fetchPayment()
      router.push('/Sucesso')
    }
  }

  if (loading) return <Carregando />

  if (!accessToken) {
    window.location.href = '/Login'
  }
  return (
    <div className="flex flex-col items-start h-full gap-16 ">
      <NavBar />
      <div className="w-full px-5 md:px-30 flex flex-col items-center gap-8 font-bold">
        <p className="text-4xl">Finalizar compra</p>

        <div className="flex flex-col gap-4">
          <div className="w-full md:w-[660px]  flex flex-col gap-4 items-center">
            <ul className="w-full">
              {items.length === 0 ? (
                <li>Seu carrinho está vazio</li>
              ) : (
                items.map(item => {
                  const product: IProduto = {
                    idProduto: item.idProduto,
                    idVendedor: '',
                    nome: item.nome || 'Produto',
                    categoria: '',
                    tipoVenda: 0,
                    preco: item.preco ?? 0,
                    descricao: '',
                    imagemUrl: item.imagemUrl || '/images/placeholder.png',
                    quantidade: item.quantidade ?? 0,
                    quantidadeVendida: 0,
                    avaliacoes: []
                  }

                  return (
                    <li
                      key={String(item.idProduto)}
                      className="w-full flex justify-between items-center"
                    >
                      <ProductPayment product={product} />
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>
        <p className="text-xl">Total: R$ {price.toFixed(2)}</p>
        <form
          onSubmit={handlePayment}
          className="w-full md:w-1/2 flex flex-col gap-4 "
        >
          <p className="text-2xl">Forma de pagamento:</p>
          <div className="flex flex-col text-lg sm:flex-row items-center gap-4 w-80">
            <input
              type="radio"
              name="payment"
              value="pix"
              onClick={() => setPaymentMethod('pix')}
              defaultChecked
              className="w-5 h-5"
            />
            Pix
            <input
              type="radio"
              name="payment"
              value="card"
              onClick={() => setPaymentMethod('card')}
              className="w-5 h-5"
            />
            Cartão
          </div>
          {paymentMethod === 'pix' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="cpf">CPF</label>
              <Input
                type="text"
                value={user.cpf || ''}
                onChange={e => setUser({ ...user, cpf: e.target.value })}
                placeholder="000.000.000-00"
                disabled={true}
              />
            </div>
          )}
          {paymentMethod === 'card' && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col md:flex-row  gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="numeroCartao">Numero do Cartão</label>
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cartao.numero}
                    onChange={e =>
                      setCartao({ ...cartao, numero: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col max-w-max">
                  <label htmlFor="cvc">CVC</label>
                  <Input
                    type="text"
                    value={cartao.cvc}
                    onChange={e =>
                      setCartao({ ...cartao, cvc: e.target.value })
                    }
                    placeholder="000"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="nomeTitular">Nome do Titular</label>
                  <Input
                    type="text"
                    placeholder="Nome do Titular"
                    value={cartao.nomeTitular}
                    onChange={e =>
                      setCartao({ ...cartao, nomeTitular: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col max-w-max">
                  <label htmlFor="dataValidade">Data de Validade</label>
                  <Input
                    type="text"
                    value={cartao.validade}
                    onChange={e =>
                      setCartao({ ...cartao, validade: e.target.value })
                    }
                    placeholder="MM/AA"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="cpf">CPF</label>
                  <Input
                    type="text"
                    value={user.cpf || ''}
                    onChange={e => setUser({ ...user, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col min-w-max">
                  <label htmlFor="tipoPagamento">Tipo Pagamento</label>
                  <select
                    name="tipoPagamento"
                    id="tipoPagamento"
                    value={cartao.tipoPagamento || 'credito'}
                    onChange={e =>
                      setCartao({ ...cartao, tipoPagamento: e.target.value })
                    }
                    className="border border-gray-300 text-black placeholder-gray-300 bg-transparent p-3 rounded-xl w-full "
                  >
                    <option value="credito">Crédito</option>
                    <option value="debito">Débito</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Endereco</h2>

            <label htmlFor="rua">Rua</label>
            <Input
              type="text"
              value={user.endereco?.[0]?.rua || ''}
              onChange={e =>
                setUser({
                  ...user,
                  endereco: [{ ...user.endereco?.[0], rua: e.target.value }]
                })
              }
              placeholder="Nome da rua"
            />

            <div className="flex flex-col md:flex-row  gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="cidade">Cidade</label>
                <Input
                  type="text"
                  value={user.endereco?.[0]?.cidade || ''}
                  onChange={e =>
                    setUser({
                      ...user,
                      endereco: [
                        { ...user.endereco?.[0], cidade: e.target.value }
                      ]
                    })
                  }
                  placeholder="Nome da cidade"
                />
              </div>

              <div className="flex flex-col max-w-max">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  value={user.endereco?.[0]?.estado || ''}
                  onChange={e =>
                    setUser({
                      ...user,
                      endereco: [
                        { ...user.endereco?.[0], estado: e.target.value }
                      ]
                    })
                  }
                  className="border border-gray-300 text-black placeholder-gray-300 bg-transparent p-3 rounded-xl w-full "
                >
                  <option value="">Selecione o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row  gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="cep">CEP</label>
                <Input
                  type="text"
                  placeholder="CEP"
                  value={user.endereco[0]?.cep}
                  onChange={e =>
                    setUser({
                      ...user,
                      endereco: [{ ...user.endereco[0], cep: e.target.value }]
                    })
                  }
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="telefone">Telefone</label>
                <Input
                  type="text"
                  value={user.endereco?.[0]?.telefone || ''}
                  onChange={e =>
                    setUser({
                      ...user,
                      endereco: [
                        {
                          ...user.endereco?.[0],
                          telefone: e.target.value
                        }
                      ]
                    })
                  }
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>
          <Button>Finalizar Compra</Button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
