import Link from 'next/link'
import React from 'react'
import {LuDatabaseBackup} from 'react-icons/lu'

export default function Topbar({className}:{className?:string}) {
  return (
    <div className={`${className} sticky top-0 w-fill h-14 bg-white shadow-md  border flex items-center px-4`}>
        <Link href='/backup' prefetch={false} className='text-slate-700 font-semibold hover:text-blue-600 flex items-center gap-1'>
            <LuDatabaseBackup/>
            Backup
            </Link>
    </div>
  )
}
