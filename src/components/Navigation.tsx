'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { auth } from '@/lib/firebase/config'
import { IconLogout } from '@tabler/icons-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    ...(user
      ? []
      : [
          { href: '/login', label: 'Login' },
          { href: '/register', label: 'Register' },
        ]),
  ]

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

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
        <ul className='hidden md:flex space-x-6 items-center'>
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
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className='flex items-center gap-2 text-gray-300 hover:text-white transition-colors'
              >
                <span>Logout</span>
              </button>
            </li>
          )}
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
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-1'
                >
                  <IconLogout size={20} />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}
