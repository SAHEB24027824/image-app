'use client'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FloatButtonAntd } from '../Antd'
import ImageUploadFormController from '../FormControllers/ImageUploadFormController'
import Modal from './Modal'

export default function ImageUploader({ params , getImages }: { params: { params: string[]}, getImages:any }) {
    const [open,setOpen]=useState<boolean>(false)
  return (
    <>
    <FloatButtonAntd className='bg-blue-700' type='primary' onClick={()=>setOpen(true)} icon={<AiOutlinePlus/>}/>
    
    <Modal title='Upload image' open={open} close={setOpen}>
        <ImageUploadFormController params={params} modalClose={setOpen} getImages={getImages}/>
    </Modal>
    </>
  )
}
