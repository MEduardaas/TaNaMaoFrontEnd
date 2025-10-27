import React from 'react'

export default function Avaliacao({
  nota,
  nome,
  comentario
}: {
  nota?: number
  nome?: string
  comentario?: string
}) {
  return (
    <div className="border-t-2 border-gray-300 flex flex-col p-4 mt-4 gap-4">
      <h1>Nota: {nota}</h1>
      <h2>{nome}</h2>
      <p>{comentario}</p>
    </div>
  )
}
