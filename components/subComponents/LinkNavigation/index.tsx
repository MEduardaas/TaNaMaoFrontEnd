import Link from 'next/link'
import React from 'react'

export default function LinkNavigation({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="text-white hover:underline m-4">
      {children}
    </Link>
  )
}
