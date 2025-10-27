'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'

import Button from '@/components/subComponents/Button'
import Carregando from '@/app/Carregando/page'
import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { Endereco, IUserPublic } from '@/types/user'
import Input from '@/components/subComponents/Input'

export default function Page() {
  const { accessToken, loading } = useAuth()
  const { apiRequest } = useApi()
  const [message, setMessage] = useState('')
  const defaultEndereco: Endereco = {
    telefone: '',
    cep: '',
    rua: '',
    complemento: '',
    cidade: '',
    estado: ''
  }

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
  }, [apiRequest, accessToken, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiRequest('/perfil', 'PUT', user)
      setMessage('Informações atualizadas com sucesso.')
    } catch (error) {
      setMessage('Erro ao atualizar informações.')
    }
  }

  if (loading) return <Carregando />

  if (!accessToken) {
    window.location.href = '/Login'
  }

  return (
    <div className="flex flex-col h-full gap-18">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-4 ">
        <div className="flex flex-col sm:mx-10 gap-6 justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-4/5 flex flex-col gap-6 items-center"
          >
            <div className="flex gap-6 flex-col md:flex-row w-full">
              <section className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
                <h2 className="text-xl font-semibold mb-4">
                  Minhas Informações
                </h2>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <label htmlFor="nome">Nome completo</label>
                    <Input
                      type="text"
                      value={user.nome || ''}
                      onChange={e => setUser({ ...user, nome: e.target.value })}
                      placeholder="Nome Completo"
                    />
                  </label>

                  <label className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="email"
                      value={user.email || ''}
                      onChange={e =>
                        setUser({ ...user, email: e.target.value })
                      }
                      placeholder="seu@email.com"
                    />
                  </label>
                  <label className="flex flex-col">
                    <label htmlFor="cpf">CPF</label>
                    <Input
                      type="text"
                      value={user.cpf || ''}
                      onChange={e => setUser({ ...user, cpf: e.target.value })}
                      placeholder="000.000.000-00"
                      disabled={true}
                    />
                  </label>
                  <label className="flex flex-col">
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
                  </label>
                </div>
              </section>

              <section className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
                <h2 className="text-xl font-semibold mb-4">Endereço</h2>

                <label className="flex flex-col">
                  <label htmlFor="cep">CEP</label>
                  <Input
                    type="text"
                    value={user.endereco?.[0]?.cep || ''}
                    onChange={e =>
                      setUser({
                        ...user,
                        endereco: [
                          { ...user.endereco?.[0], cep: e.target.value }
                        ]
                      })
                    }
                    placeholder="000000-000"
                  />
                </label>

                <label className="flex flex-col">
                  <label htmlFor="rua">Rua</label>
                  <Input
                    type="text"
                    value={user.endereco?.[0]?.rua || ''}
                    onChange={e =>
                      setUser({
                        ...user,
                        endereco: [
                          { ...user.endereco?.[0], rua: e.target.value }
                        ]
                      })
                    }
                    placeholder="Nome da rua"
                  />
                </label>

                <label className="flex flex-col">
                  <label htmlFor="complemento">Complemento (opcional)</label>
                  <textarea
                    name="complemento"
                    id="complemento"
                    value={user.endereco?.[0]?.complemento || ''}
                    onChange={e =>
                      setUser({
                        ...user,
                        endereco: [
                          { ...user.endereco?.[0], complemento: e.target.value }
                        ]
                      })
                    }
                    className="border border-gray-300 text-black placeholder-gray-300 bg-transparent p-2 rounded-xl w-full"
                    placeholder="Apto 123"
                  ></textarea>
                </label>

                <label className="flex flex-col">
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
                </label>

                <label className="flex flex-col">
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
                    className="border border-gray-300 text-black placeholder-gray-300 bg-transparent p-2 rounded-xl w-full"
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
                </label>
              </section>
            </div>
            {message}
            <div className="pt-4 w-full sm:w-1/5 items-center justify-center">
              <Button>Salvar</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
