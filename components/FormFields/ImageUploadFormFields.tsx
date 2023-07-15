'use client'
import React from 'react'
import { FormAntd, InputAntd, InputNumberAntd } from '../Antd'

export default function ImageUploadFormFields({ onLoadImages }: { onLoadImages: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <>

     <FormAntd.Item name='name' label='Name' rules={[{required:true}]}>
      <InputAntd />
     </FormAntd.Item>
     <div className='flex gap-1 items-center'>
     <FormAntd.Item name='width' label='Width' rules={[{required:true}]}>
      <InputNumberAntd defaultValue={700} min={0} className='w-full'/>
     </FormAntd.Item>
     <FormAntd.Item name='height' label='Height' rules={[{required:true}]}>
      <InputNumberAntd defaultValue={700} min={0} className='w-full'/>
     </FormAntd.Item>
     <FormAntd.Item name='quality' label='Quality' rules={[{required:true}]}>
      <InputNumberAntd defaultValue={50} min={0} max={100} className='w-full'/>
     </FormAntd.Item>
     </div>

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
