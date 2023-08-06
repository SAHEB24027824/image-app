'use client'
import ApplicationFromController from '@/components/FormControllers/ApplicationFromController';
import Card from '@/components/UIComponents/Card';
import { GetApplicationService } from '@/service/ApplicationService';
import { APPLICATION_TYPE } from '@/types/type.application';
import { getServerCookie } from '@/util/ServerCookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
export const dynamic = 'force-dynamic';

export default async function ApplicationEditPage({ params }: { params: { key: string } }) {

  const [application, setApplication] = useState<APPLICATION_TYPE>()

  const getApplication = async () => {
    try {
      const response = await GetApplicationService(params.key);
      if (response?.result) {
        setApplication(response.result)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getApplication()
  }, [])

  return (
    <div>
      {
        application &&
        <Card title='Edit Application'
          extra={<Link href='/' prefetch={false}>Back</Link>}
          className='my-10 w-[90%] md:w-[60%] m-auto'>
          <ApplicationFromController application={application} />
        </Card>
      }
    </div>
  )
}
