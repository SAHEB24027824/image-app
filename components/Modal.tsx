'use client'
import React from 'react'
import { ModalAntd } from './Antd'

export default function Modal(
    {open,close,children,title}:
    {
      open:boolean,
      close:React.Dispatch<React.SetStateAction<boolean>>,
      children:React.ReactNode,
      title:string
    }
) {

  return (
    <ModalAntd open={open} onCancel={()=>close(false)} footer={null} title={title}>
      <div className='mt-10'>
        {children}
      </div>
    </ModalAntd>
  )
}
