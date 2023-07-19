'use client'
import React, { useState } from 'react'
import SidebarItems from './SidebarItems';
import SidebarActions from './SidebarActions';
import SidebarHeader from './SidebarHeader';
import { APPLICATION_TYPE } from '@/types/type.application';
import { FloatButtonAntd } from '../Antd';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Sidebar({ applications }: { applications: APPLICATION_TYPE[] }) {

  const [open, setOpen] = useState<boolean>(false);

  const Menu = () => {
    return (
      <>
        <div className=' bg-slate-700 h-[10%] flex justify-center items-center'>
          <SidebarHeader />
        </div>

        <div className='h-[70%] overflow-y-auto no-scrollbar px-4 text-white'>
          <SidebarItems applications={applications} setOpen={setOpen}/>
        </div>

        <div className='bg-slate-700 h-[20%] flex flex-col gap-10 items-center justify-center'>
          <SidebarActions />
        </div>
      </>
    )
  }


  return (
    <>
    {/* //====================== For Mobile =====================// */}
      <div className={`bg-blue-950 h-screen duration-300 md:hidden  ${open? 'w-[100%]':'w-[0%] opacity-0'} z-[800]`}>
          {Menu()}
      </div>

      {/* //====================== For PC =====================// */}
      <div className={`bg-blue-950 h-screen duration-300 max-md:hidden`}>
          {Menu()}
      </div> 

      <FloatButtonAntd className='bg-blue-700 md:hidden' type='primary' onClick={() => setOpen(!open)} icon={<AiOutlineMenu />} style={{ top: 40 }} />

    </>
  )
}
