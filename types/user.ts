// Tipagens para o usuário (frontend-friendly)
// Substituí mongo ObjectId por string para compatibilidade no frontend

export interface Endereco {
  telefone: string
  cep: string
  rua: string
  complemento?: string
  cidade: string
  estado: string
}

export interface CarrinhoItem {
  idProduto: string
  quantidade: number
}

export type PedidoStatus = 'preparando' | 'enviado' | 'concluido'

export interface Pedido {
  idVendedor: string
  idProduto: string
  quantidade: number
  status: PedidoStatus
}

export interface Cartao {
  numero: string
  nomeTitular: string
  validade: string
  cvc: string
  tipoPagamento: string
}

export interface ProdutoCriado {
  idProduto: string
}

export interface IUser {
  nome: string
  email: string
  senha: string
  cpf: string
  endereco?: Endereco[]
  carrinho?: CarrinhoItem[]
  pedidos?: Pedido[]
  produtosCriados?: ProdutoCriado[]
  refreshTokens?: string[]
}

// Tipo público (sem campos sensíveis) — útil para passar ao frontend
export type IUserPublic = Omit<IUser, 'senha' | 'refreshTokens'>
