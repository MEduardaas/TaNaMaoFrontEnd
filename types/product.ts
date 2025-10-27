// Tipagens para produtos (frontend-friendly)
// ObjectId do mongoose representado como string no frontend

export interface IAvaliacao {
  idUsuario: string
  nota: number
  comentario: string
}

export interface IProduto {
  idProduto?: string
  idVendedor: string
  nome: string
  categoria: string
  tipoVenda: number
  preco: number
  descricao: string
  imagemUrl: string
  quantidade?: number
  quantidadeVendida?: number
  avaliacoes?: IAvaliacao[]
}

// Variante simplificada para criar/editar no frontend (sem id)
export type IProdutoForm = Omit<
  IProduto,
  'idProduto' | 'quantidadeVendida' | 'avaliacoes'
> & {
  quantidadeVendida?: number
  avaliacoes?: IAvaliacao[]
}
