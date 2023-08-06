import Image from 'next/image'
import React from 'react'
export const dynamic = "force-dynamic";


export default async function HomePage() {
  return (
    <div className='flex gap-4 items-center justify-center min-h-screen'>

      <div className='flex gap-4 flex-col '>

        <p className='text-2xl md:text-6xl text-sky-600 font-semibold'>Image</p>

        <div className=' text-4xl md:text-8xl text-slate-600 font-bold relative'>

         <span>GALLERY</span>

        <Image src={'/me.png'} alt='me' width={180} height={180}
         className='max-md:w-[80px] absolute -top-[57px] -right-[10px] md:-top-[126px] md:-right-[65px]'
        />
         </div>


      </div>
    </div>
  )
}
