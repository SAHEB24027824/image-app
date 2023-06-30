import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='border min-h-[70px] w-full bg-white sticky top-0 z-50 flex justify-center items-center'>
        <ul className='flex justify-center gap-4 items-center'>
            <Link href='#'>Applications</Link>
            <Link href='#'>Applications</Link>
            <Link href='#'>Applications</Link>
        </ul>
    </div>
  )
}
