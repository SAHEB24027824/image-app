import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PopoverAntd } from '../Antd';
import { GetApplicationsService } from '@/service/ApplicationService';
import Link from 'next/link';
import { APPLICATION_TYPE } from '@/types/type.application';
export const dynamic = 'force-dynamic';

export default async function SidebarItems() {

  const applicationResponse = await GetApplicationsService()
  const applications = await applicationResponse?.result;

  return (
    <>

      {
        applications && applications.map((app: APPLICATION_TYPE, i: number) => {
          return (
            <div className='p-2' key={i}>
              <div className='flex items-center gap-4 mt-6 font-bold text-2xl'>

                <span className='text-sky-500'>{app.name}</span>
                <PopoverAntd content={
                  <Link href={`/application/${app.key}`} className=' cursor-pointer p-2 hover:bg-slate-300'>Edit</Link>
                } placement="bottom">
                  <BsThreeDotsVertical className=' cursor-pointer' />
                </PopoverAntd>
              </div>

              <div className='flex flex-col my-4'>
                {
                  app?.category?.length > 0 && app?.category?.map((category, ii: number) => {
                    return (
                      <Link href={`/image/${app.key}/${category.key}`} key={ii} prefetch={false}
                        className='text-md hover:bg-sky-400 p-2 duration-300 rounded-md'>
                        {category.name}
                      </Link>
                    )
                  })
                }
              </div>

            </div>
          )
        })
      }
    </>
  )
}


