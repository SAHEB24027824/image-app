'use client'
import React from 'react'
import SidebarItems from './SidebarItems';
import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';
import { applicationCtx } from '@/context/AppCtx';

export default function Sidebar() {

  const {applications}=applicationCtx()

  return (
    <div className='bg-white flex flex-col gap-2 items-center py-6'>

      <Link href='/application/add' prefetch={false} className='flex items-center gap-1 font-semibold hover:text-blue-600'>
        <BsPlusLg /> Add new application
      </Link>

      <SidebarItems applications={applications} />

    </div>
  )
}
