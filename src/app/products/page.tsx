import { Product } from '@/app/types/products'
import Link from 'next/link'

import Search from './Search'

export const dynamic = 'force-dynamic'

export default async function ProductsServer(props: {
  searchParams: Promise<{ page?: string }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const limit = 12 // items per page
  const skip = (page - 1) * limit

  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  )
  const data = await response.json()
  const { products, total } = data
  const totalPages = Math.ceil(total / limit)

  return (
    <div className='space-y-6'>
      <Search />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product: Product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className='p-4 border rounded-lg hover:shadow-lg transition-shadow'
          >
            <div className='space-y-2'>
              <h2 className='font-semibold text-lg'>{product.title}</h2>
              <p className='text-gray-600 line-clamp-2'>
                {product.description}
              </p>
              <p className='text-blue-600'>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center gap-2 py-4'>
        {page > 1 && (
          <Link
            href={`/products?page=${page - 1}`}
            className='px-4 py-2 border rounded hover:bg-gray-100'
          >
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
          .map((p, i, arr) => {
            if (i > 0 && arr[i - 1] !== p - 1) {
              return (
                <span key={`gap-${p}`} className='px-4 py-2'>
                  ...
                </span>
              )
            }
            return (
              <Link
                key={p}
                href={`/products?page=${p}`}
                className={`px-4 py-2 border rounded ${
                  p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {p}
              </Link>
            )
          })}

        {page < totalPages && (
          <Link
            href={`/products?page=${page + 1}`}
            className='px-4 py-2 border rounded hover:bg-gray-100'
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
