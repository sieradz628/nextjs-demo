'use client'

import React, { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log('Error', error)
  }, [error])

  return <div className='text-red-500'>Error: {error.message}</div>
}
