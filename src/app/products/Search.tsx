'use client'

import { Product } from '@/app/types/products'
import { IconSearch, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import Link from 'next/link'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim() === '') {
      setFilteredProducts([])
      return
    }

    // Use the API search endpoint
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${value}`
    )
    const data = await response.json()
    setFilteredProducts(data.products)
  }

  const handleClear = () => {
    setSearchTerm('')
    setFilteredProducts([])
  }

  return (
    <div className='relative'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <IconSearch className='text-gray-400' size={20} />
        </div>
        <input
          type='text'
          value={searchTerm}
          placeholder='Search products...'
          className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          onChange={handleSearch}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
            aria-label='Clear search'
          >
            <IconX size={20} />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {searchTerm && filteredProducts.length > 0 && (
        <div className='absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto'>
          {filteredProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className='block p-4 hover:bg-gray-50 border-b last:border-b-0'
            >
              <div className='space-y-1'>
                <h3 className='font-medium'>{product.title}</h3>
                <p className='text-sm text-gray-600 line-clamp-1'>
                  {product.description}
                </p>
                <p className='text-sm text-blue-600'>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {searchTerm && filteredProducts.length === 0 && (
        <div className='absolute z-10 w-full mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg text-center text-gray-500'>
          No products found
        </div>
      )}
    </div>
  )
}
