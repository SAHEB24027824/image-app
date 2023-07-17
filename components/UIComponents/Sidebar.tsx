import Link from 'next/link';
import React from 'react'
import { BsImageFill, BsPlusLg } from 'react-icons/bs';
import AddApplication from './AddApplication';
import SidebarItems from './SidebarItems';
import { ButtonAntd } from '../Antd';

export default function Sidebar() {

  return (
    <div className=' bg-blue-950'>

      <Link href={'/'} className='text-white h-[10vh] bg-slate-700 flex items-center justify-center gap-1 text-2xl'><BsImageFill />ImageApp</Link>

      <div className='mx-4 my-4 h-[75vh] text-white text-sm  overflow-y-scroll no-scrollbar'>
        {/* @ts-ignore */}
        <SidebarItems />
      </div>
      <div className='py-4 h-[15vh] bg-slate-700 flex justify-center'>
        <Link href='/application/add' prefetch={false}>
         <ButtonAntd type='primary' className='flex items-center gap-1 bg-sky-500'> <BsPlusLg/> Add new application</ButtonAntd>
         </Link>
      </div>


    </div>
  )
}
