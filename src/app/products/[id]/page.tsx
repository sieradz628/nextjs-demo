import { Product } from '@/app/types/products'
import React from 'react'

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`)
  const product: Product = await response.json()

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>{product.title}</h1>
      <p className='text-gray-600 mb-8 text-lg'>{product.description}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <p className='text-lg'>
            <span className='font-semibold'>Price:</span> ${product.price}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Discount:</span>{' '}
            {product.discountPercentage}%
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Rating:</span> {product.rating}/5
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Stock:</span> {product.stock} units
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Brand:</span> {product.brand}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>SKU:</span> {product.sku}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Weight:</span> {product.weight}g
          </p>
        </div>

        <div className='space-y-4'>
          <p className='text-lg'>
            <span className='font-semibold'>Dimensions:</span>{' '}
            {product.dimensions.width} x {product.dimensions.height} x{' '}
            {product.dimensions.depth} cm
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Warranty:</span>{' '}
            {product.warrantyInformation}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Shipping:</span>{' '}
            {product.shippingInformation}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Availability:</span>{' '}
            {product.availabilityStatus}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Reviews:</span>{' '}
            {product.reviews.length}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Return Policy:</span>{' '}
            {product.returnPolicy}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Minimum Order:</span>{' '}
            {product.minimumOrderQuantity} units
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <p className='text-lg'>
          <span className='font-semibold'>Tags:</span> {product.tags.join(', ')}
        </p>
      </div>
    </div>
  )
}
