import ApplicationFromController from '@/components/FormControllers/ApplicationFromController';
import Card from '@/components/UIComponents/Card';
import { GetApplicationService } from '@/service/ApplicationService';
import { APPLICATION_TYPE } from '@/types/type.application';
import Link from 'next/link';
import React from 'react'
export const dynamic = 'force-dynamic';

export default async function ApplicationEditPage({params}:{params:{key:string}}) {
   const response = await GetApplicationService(params.key);
   const application:APPLICATION_TYPE = response.result;
  return (
    <div>
      <Card title='Edit Application'
      extra={<Link href='/' prefetch={false}>Back</Link>}
      className='my-10 w-[60%] m-auto'>
        <ApplicationFromController application={application}/>
      </Card>
    </div>
  )
}
