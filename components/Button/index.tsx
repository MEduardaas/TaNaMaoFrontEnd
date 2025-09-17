import React from 'react'

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="bg-black w-full text-white p-2 rounded-xl">
      {children}
    </button>
  )
}
