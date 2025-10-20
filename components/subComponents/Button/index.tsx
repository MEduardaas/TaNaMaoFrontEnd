import React from 'react'

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="bg-black border-2 font-bold border-black w-full text-white p-2 rounded-xl cursor-pointer hover:bg-white hover:text-black transition-colors"
    >
      {children}
    </button>
  )
}
