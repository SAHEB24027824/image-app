'use client' // Error components must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error 
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error])
 
  console.log(error)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="p-10 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Oops!</h1>
      <p className="text-gray-600 mb-10">
      {error.message}
      </p>
      <Link href="/" className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
        Go Back to Home
      </Link>
    </div>
  </div>
  )
}