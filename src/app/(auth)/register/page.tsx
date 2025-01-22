'use client'

import { auth } from '@/lib/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { user } = useAuth()

  // Redirect if already logged in
  if (user) {
    router.push('/products')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/products')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered.')
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.')
      } else {
        setError('Failed to create account.')
      }
    }
  }

  return (
    <div className='max-w-md mx-auto mt-8'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      {error && (
        <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>{error}</div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg
          hover:from-white hover:to-gray-100 hover:text-gray-800
          transition-all duration-300 shadow-md hover:shadow-xl
          transform hover:-translate-y-1
          font-medium text-lg'
        >
          Register
        </button>
      </form>
    </div>
  )
}
