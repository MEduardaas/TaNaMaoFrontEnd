import Link from 'next/link'
import React from 'react'

export default function LinkNavigation({
  href,
  children,
  className = ''
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link href={href} className={`hover:underline ${className}`}>
      {children}
    </Link>
  )
}
