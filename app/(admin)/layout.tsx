import Sidebar from '@/components/UIComponents/Sidebar'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className='flex'>
                <div className='w-[20%]'>
                   <div className='w-[20%] fixed top-0 left-0 bottom-0'>
                       {/* @ts-ignore */}
                       <Sidebar />
                   </div>
                </div>
                <div className='w-[80%] bg-slate-100'>
                    {children}
                </div>

            </div>
        </div>
    )
}
