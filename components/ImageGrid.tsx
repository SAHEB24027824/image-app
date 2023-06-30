'use client'
import Image from 'next/image'
import React from 'react'
import { messageAntd } from './Antd'

interface ImageType {
  _id: string,
  name: string,
  url: string,
  applicationId: string,
  categoryId: string,
}

export default function ImageGrid({ images , className }: { images: ImageType[] , className:string }) {

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    messageAntd.success('url copied to clipboard')
  }


  return (
    <div className={className}>
      {
        images && images.length > 0 ?
          <div className='flex flex-wrap  items-center gap-2'>
            {images.map((image, index) => {
              return(
                <div key={index} className='shadow-md duration-300 rounded-md hover:shadow-slate-700'>
                  <Image src={`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`}
                   height={120} 
                   width={140} 
                   alt={image.name}
                   className='cursor-pointer'
                   onClick={()=>copyToClipboard(`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`)}
                   />
                  <p className='text-sm text-center py-2'>{image.name}</p>
                </div>
              )
            })}
          </div>
          :
          <div className=' bg-rose-300 w-2/4 p-4 rounded-md shadow-sm m-auto'>
            No image found! ,  Chick "Add new images" button to add new images.
            </div>
      }
    </div>
  )
}
