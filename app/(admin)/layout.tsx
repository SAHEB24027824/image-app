'use client'
import Loader from '@/components/UIComponents/Loader';
import Sidebar from '@/components/UIComponents/Sidebar';
import Topbar from '@/components/UIComponents/Topbar';
import ApplicationContextProvider from '@/context/AppCtx';
import { authCtx } from '@/context/AuthCtx';
import React, { useState } from 'react'
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState<boolean>(false);
    const { user } = authCtx()

    return (
        <>
            {
                user ?
                    <ApplicationContextProvider>
                        <div className='w-full bg-slate-200 min-h-screen'>
                            
                            <div className='sticky top-0 z-50'>
                                <Topbar open={open} setOpen={setOpen} user={user} />
                            </div>

                            <div className='flex'>
                                <div className={` duration-300 w-[0%] ${open && 'w-[50%] md:w-[15%]'} overflow-hidden z-40`}>
                                    <Sidebar />
                                </div>
                                <div className={`duration-300 w-[100%] ${open && 'w-[50%] md:w-[85%]'}`}>
                                    {children}
                                </div>
                            </div>

                        </div>
                    </ApplicationContextProvider>
                    :
                    <div>
                        <Loader />
                    </div>
            }
        </>
    )

}
