'use client'
import React, { useState } from 'react'
import { ButtonAntd } from './Antd'
import ImageUploadFormController from './FormControllers/ImageUploadFormController'
import Modal from './Modal'

export default function ImageUploader({ params }: { params: { ids: string[] } }) {
    const [open,setOpen]=useState<boolean>(false)
  return (
    <>
    <ButtonAntd className='bg-blue-700' type='primary' onClick={()=>setOpen(true)}>Add new images</ButtonAntd>
    <Modal title='Upload image' open={open} close={setOpen}>
        <ImageUploadFormController params={params} modalClose={setOpen}/>
    </Modal>
    </>
  )
}
