'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Register' },
  ]

  return (
    <nav className='container mx-auto px-4 relative'>
      <div className='flex justify-between items-center'>
        <div className='text-xl font-bold'>Logo</div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='md:hidden p-2'
          aria-label='Toggle menu'
        >
          <div className='w-6 h-0.5 bg-white mb-1.5'></div>
          <div className='w-6 h-0.5 bg-white mb-1.5'></div>
          <div className='w-6 h-0.5 bg-white'></div>
        </button>

        {/* Desktop menu */}
        <ul className='hidden md:flex space-x-6'>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors ${
                  pathname === href ? 'text-gray-300' : 'hover:text-gray-300'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden absolute left-0 right-0 top-full z-50 bg-gray-800 mt-2 py-2 px-4 shadow-lg'>
          <ul className='space-y-3'>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-1 transition-colors ${
                    pathname === href ? 'text-gray-300' : 'hover:text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
