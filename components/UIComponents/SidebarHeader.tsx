import Link from 'next/link'
import React from 'react'
import { BsImageFill } from 'react-icons/bs'

export default function SidebarHeader() {
    return (
            <Link href={'/'} className='text-white flex items-center justify-center gap-1 text-2xl'>
                <BsImageFill />
                ImageApp
            </Link>
    )
}
