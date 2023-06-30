'use client'
import React, { useState } from 'react'
import {BsPlusLg } from 'react-icons/bs';
import ApplicationFromController from './FormControllers/ApplicationFromController';
import Modal from './Modal';

export default function AddApplication() {

    const [open,setOpen] = useState<boolean>(false);
    

  return (
    <>
    <button className='bg-rose-600 text-white text-sm flex gap-1 p-2 m-auto rounded-md hover:bg-rose-700'
    onClick={()=>setOpen(true)}
    >
        <BsPlusLg/> Add new application
    </button>

    <Modal title='Add Application Form' open={open} close={setOpen}>
     <ApplicationFromController modalClose={setOpen}/>
    </Modal>

    </>
   
  )
}
