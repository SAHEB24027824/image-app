import React from 'react'
import SidebarItems from './SidebarItems';
import { GetApplicationsService } from '@/service/ApplicationService';
import SidebarActions from './SidebarActions';
import SidebarHeader from './SidebarHeader';
export const dynamic = 'force-dynamic';

export default async function Sidebar() {
  const applicationResponse = await GetApplicationsService()
  const applications = await applicationResponse?.result;

  return (
    <div className='bg-blue-950 h-screen'>

      <div className=' bg-slate-700 h-[10%] flex justify-center items-center'>
        <SidebarHeader />
      </div>

      <div className='h-[70%] overflow-y-auto no-scrollbar px-4 text-white'>
        <SidebarItems applications={applications} />
      </div>

      <div className='bg-slate-700 h-[20%] flex flex-col gap-10 items-center justify-center'>
        <SidebarActions/>
      </div> 


    </div>
  )
}
