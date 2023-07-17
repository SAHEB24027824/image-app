import ApplicationFromController from '@/components/FormControllers/ApplicationFromController'
import Card from '@/components/UIComponents/Card'
import React from 'react'
export const dynamic = 'force-dynamic';

export default function AddApplicationPage() {
  return (
    <div>
        <Card title='Add Application' className='my-10 w-[60%] m-auto'>
          <ApplicationFromController/>
        </Card>
    </div>
  )
}
