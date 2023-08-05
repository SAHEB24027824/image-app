import Sidebar from '@/components/UIComponents/Sidebar'
import Topbar from '@/components/UIComponents/Topbar';
import { GetApplicationsService } from '@/service/ApplicationService';
import { APPLICATION_TYPE } from '@/types/type.application';
import { getServerCookie } from '@/util/ServerCookie';
import React from 'react'
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
        const cookie = getServerCookie()
        const applicationResponse = await GetApplicationsService(cookie)
        const applications: APPLICATION_TYPE[] = await applicationResponse?.result;

        return (
            <div className='bg-slate-100 flex'>
                <Sidebar applications={applications} />
                <div className='w-full bg-slate-100 max-h-screen overflow-y-auto'>
                    <Topbar />
                    {children}
                </div>
            </div>

        )
    
}
