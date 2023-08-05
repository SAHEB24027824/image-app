import Sidebar from '@/components/UIComponents/Sidebar'
import Topbar from '@/components/UIComponents/Topbar';
import { GetApplicationsService } from '@/service/ApplicationService';
import { APPLICATION_TYPE } from '@/types/type.application';
import { GetCookie } from '@/util/cookie';
import React from 'react'
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    try {

        const URL = process.env.NEXT_PUBLIC_APP_API_URL

        const cookie = GetCookie()
       // const applicationResponse = await GetApplicationsService(cookie)
        const response  = await fetch(`${URL}/application`,{method:'GET', credentials: 'include',headers:{cookie:cookie?cookie:''}})
        const applicationResponse = await response.json()
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
    catch (error) {
        console.log("========ERROR==========")
        console.log(error)
        //throw error;
    }
}
