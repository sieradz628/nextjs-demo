'use client'

import { useRouter } from 'next/navigation'

export default function About() {
  const router = useRouter()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <h1 className='text-4xl font-bold text-gray-800 mb-6'>About</h1>
      <p className='max-w-2xl text-lg text-gray-600 text-center leading-relaxed mb-8'>
        As a passionate advocate for delivering high-quality, customized
        solutions. I created this dummy project showing next.js.
      </p>
      <button
        onClick={() => router.push('/')}
        className='px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg
          hover:from-white hover:to-gray-100 hover:text-gray-800
          transition-all duration-300 shadow-md hover:shadow-xl
          transform hover:-translate-y-1
          font-medium text-lg'
      >
        Go to Home
      </button>
    </div>
  )
}
