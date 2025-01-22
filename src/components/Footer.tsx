import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>About Us</h3>
            <p className='text-gray-300'>
              Your trusted partner in quality products and services.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/products'
                  className='text-gray-300 hover:text-white'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link href='/login' className='text-gray-300 hover:text-white'>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href='/register'
                  className='text-gray-300 hover:text-white'
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Contact</h3>
            <p className='text-gray-300'>Email: contact@example.com</p>
            <p className='text-gray-300'>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className='mt-8 pt-4 border-t border-gray-700 text-center text-gray-300'>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
