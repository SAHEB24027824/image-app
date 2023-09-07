import React from 'react'
import Spinner from './Spinner'

export default function DataLoader() {
  return (
    <div className='flex gap-1 items-center absolute top-0 left-[50%] translate-x-[-50%] z-[999] px-10 p-2 bg-indigo-500 text-white rounded-b-md'>
        <Spinner loading={true}/> <span>Loading...</span>
    </div>
  )
}
