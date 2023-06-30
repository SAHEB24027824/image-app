'use client'
import React from 'react'
import { InputAntd } from '../Antd'

export default function ImageUploadFormFields({onLoadImages}:{onLoadImages:(event: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <>
    <label htmlFor="name">
      <p className='flex items-center gap-1'><span className='text-red-500'>*</span>Name</p>
      <input id='name' name='name' placeholder='Name' required className='w-full p-2 border rounded-md outline-none my-4 focus:border-black'/>
      </label>
      <label>
        <input type='file' 
        className={`
        file:bg-blue-600
        file:text-white
        file:border-none
        file:p-2
        file:rounded-md
        file:text-sm
        file:cursor-pointer
        `}
        onChange={onLoadImages}
        multiple={true}
        />
      </label>
    </>
  )
}
