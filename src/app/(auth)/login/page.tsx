'use client'

import { auth } from '@/lib/firebase/config'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { IconBrandGoogle } from '@tabler/icons-react'
import { FirebaseError } from 'firebase/app'

export default function LoginPage() {
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
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/products')
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message)
      } else {
        setError('Failed to login. Please check your credentials.')
      }
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/products')
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message)
      } else {
        setError('Failed to login with Google.')
      }
    }
  }

  return (
    <div className='max-w-md mx-auto mt-8'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
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
          className='w-full px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg
          hover:from-white hover:to-gray-100 hover:text-gray-800
          transition-all duration-300 shadow-md hover:shadow-xl
          transform hover:-translate-y-1
          font-medium text-lg'
        >
          Login
        </button>
      </form>

      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className='mt-4 w-full px-6 py-3 border border-gray-300 rounded-lg
          hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md
          transform hover:-translate-y-1 flex items-center justify-center gap-2'
        >
          <IconBrandGoogle size={20} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}
