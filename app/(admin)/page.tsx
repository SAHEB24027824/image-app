import Image from 'next/image'
import React from 'react'


export default async function HomePage() {
  return (
    <div className='flex gap-4 items-center justify-center min-h-screen'>

      <div className='flex gap-4 flex-col '>

        <p className='text-6xl text-sky-600 font-semibold'>Image</p>

        <div className='ml-10 text-8xl text-slate-600 font-bold relative'>

         <span>GALLERY</span>

        <Image src={'/me.png'} alt='me' width={500} height={100}
         className=' absolute -top-[185px] -right-[205px]'
        />
         </div>


      </div>
    </div>
  )
}
