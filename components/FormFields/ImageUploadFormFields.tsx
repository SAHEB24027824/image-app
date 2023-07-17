'use client'
import React, { useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { BsCloudUploadFill } from 'react-icons/bs'
import { FaUpload } from 'react-icons/fa'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { ButtonAntd, FormAntd, InputAntd, InputNumberAntd } from '../Antd'

export default function ImageUploadFormFields({ onLoadImages }: { onLoadImages: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

  return (
    <>
     <FormAntd.Item name='name' label='Name' rules={[{required:true}]}>
      <InputAntd />
     </FormAntd.Item>
     <div className='flex gap-1 items-center'>

     <FormAntd.Item name='width' label='Width' rules={[{required:true}]}>
      <InputNumberAntd  min={0} className='w-full' />
     </FormAntd.Item>

     <FormAntd.Item name='height' label='Height' rules={[{required:true}]}>
      <InputNumberAntd  min={0} className='w-full' />
     </FormAntd.Item>

     <FormAntd.Item name='quality' label='Quality' rules={[{required:true}]}>
      <InputNumberAntd min={0} max={100} className='w-full'/>
     </FormAntd.Item>

     </div>

      <label htmlFor='upload'>
        <div className='flex flex-col gap-1 justify-center items-center'>
        <FaUpload className='text-4xl text-blue-600 cursor-pointer'/>
        <p className='text-xs'>Upload Images</p>
        </div>
        <input 
        type='file'
        id='upload'
         style={{display:'none'}}
          onChange={onLoadImages}
          multiple={true}
          placeholder='Select Images'
        />
      </label>
    </>
  )
}
