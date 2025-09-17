'use client'

import Footer from '@/components/PrinComponents/Footer'
import NavBar from '@/components/PrinComponents/NavBar'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-16">
      <NavBar />
      <Footer />
    </div>
  )
}
