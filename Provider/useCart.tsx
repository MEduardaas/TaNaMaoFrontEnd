'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo
} from 'react'

type CartItem = {
  idProduto: string
  nome?: string
  preco?: number
  imagemUrl?: string
  quantidade: number
}

type CartContextType = {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantidade'>, quantidade?: number) => void
  removeItem: (idProduto: number | string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])

  // Debug helpers: log when cart is opened/closed to help track unexpected toggles
  // These logs only run in development to avoid polluting production console.
  const openCart = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Cart] openCart called', new Error().stack)
    }
    setIsOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Cart] closeCart called', new Error().stack)
    }
    setIsOpen(false)
  }, [])

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantidade'>, quantidade: number = 1) => {
      setItems(prev => {
        const existing = prev.find(i => i.idProduto === item.idProduto)
        if (existing) {
          return prev.map(i =>
            i.idProduto === item.idProduto
              ? { ...i, quantidade: i.quantidade + quantidade }
              : i
          )
        }
        return [...prev, { ...item, quantidade }]
      })
    },
    []
  )

  const removeItem = useCallback((idProduto: number | string) => {
    setItems(prev =>
      prev
        .map(i =>
          i.idProduto === idProduto
            ? { ...i, quantidade: Math.max(0, i.quantidade - 1) }
            : i
        )
        .filter(i => i.quantidade > 0)
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const contextValue = useMemo(
    () => ({
      isOpen,
      openCart,
      closeCart,
      items,
      addItem,
      removeItem,
      clearCart
    }),
    [isOpen, items, openCart, closeCart, addItem, removeItem, clearCart]
  )

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
