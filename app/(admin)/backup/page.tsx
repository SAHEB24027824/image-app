import BackupStatus from '@/components/Backup/BackupStatus'
import React from 'react'
import { LuDatabaseBackup } from 'react-icons/lu'
export const dynamic = "force-dynamic";

export default function BackupPage() {
  return (
    <div className='w-2/5 shadow-md m-auto rounded-md bg-white p-2 min-h-[200px] my-6 flex flex-col items-center justify-center'>
        <h1 className=' text-xl font-semibold text-slate-600 my-8 flex items-center gap-2'><LuDatabaseBackup/>Take Application Backup</h1>
        <BackupStatus/>
    </div>
  )
}
