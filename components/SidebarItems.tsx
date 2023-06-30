import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PopoverAntd } from './Antd';
 import { GetApplicationsService } from '@/service/ApplicationService';
import SidebarActions from './SidebarActions';
import Link from 'next/link';

 export default async function SidebarItems() {

  const response = await GetApplicationsService()
  const applications = response.result;

  return (
      <ul>
        
         {
          applications && applications.map((app:{_id:string,name:string , categories:{name:string,_id:string}[]},i:number)=>{
            return(
              <li className=' rounded-md p-2' key={i}>
              <span className='flex items-center gap-4 mt-6 font-bold text-lg'>
                <span className='text-rose-600'>{app.name}</span>
    
                 <PopoverAntd content={<SidebarActions appId={app._id}/>} placement="bottom">
                  <BsThreeDotsVertical className=' cursor-pointer' />
                 </PopoverAntd>
              </span>
    
              <ul className='text-md'>
                {
                  app?.categories?.length>0 && app?.categories?.map((category,ii:number)=>{
                    return<li className='my-2 text-xs hover:text-blue-200 cursor-pointer'>
                     <Link href={`/image/${app._id}/${category._id}`} key={ii} prefetch={false}>{category.name}</Link>
                     </li>
                  })
                }
              </ul>
    
            </li>
            )
          }) 
        }
      </ul>
  )
}



// import React from 'react'

// export default async function SidebarItems() {
//     const response = await GetApplicationsService()
//   const applications = response.result;
//   return (
//     <div>SidebarItems</div>
//   )
// }
