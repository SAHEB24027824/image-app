import Sidebar from '@/components/UIComponents/Sidebar'
import { GetApplicationsService } from '@/service/ApplicationService';
import { APPLICATION_TYPE } from '@/types/type.application';
import { GetCookie } from '@/util/cookie';
import React from 'react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const cookie = GetCookie()
    const applicationResponse = await GetApplicationsService(cookie)
    const applications:APPLICATION_TYPE[] = await applicationResponse?.result;

    return (
        <div className='bg-slate-100 flex'>
                <Sidebar applications={applications}/>
            <div className='w-full bg-slate-100 max-h-screen overflow-y-auto'>
                {children}
            </div>
        </div>

    )
}
