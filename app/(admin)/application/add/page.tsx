import ApplicationFromController from '@/components/FormControllers/ApplicationFromController'
import Card from '@/components/UIComponents/Card'
import React from 'react'

export default function AddApplicationPage() {
  return (
    <div>
        <Card title='Add Application' className='my-10 w-[90%] md:w-[60%] m-auto'>
          <ApplicationFromController/>
        </Card>
    </div>
  )
}
