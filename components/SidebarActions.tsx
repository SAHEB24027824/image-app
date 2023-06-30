'use client'
import React, { useState } from 'react'
import ApplicationFromController from './FormControllers/ApplicationFromController';
import Modal from './Modal';

export default function SidebarActions({appId}:{appId:string}) {
  const [open,setOpen] = useState<boolean>(false);

  return (
    <>
    <div>
        <div className=' cursor-pointer p-2 hover:bg-slate-300' onClick={()=>setOpen(true)}>Edit</div>
    </div>

    <Modal title='Edit Application Form' open={open} close={setOpen}>
     <ApplicationFromController modalClose={setOpen} appId={appId}/>
    </Modal>

    </>
  )
}
