'use client'
import { FormInstance } from 'antd';
import React, { useRef, useState } from 'react'
import { ButtonAntd, FormAntd, MessageAntd } from '../Antd'
import ApplicationFormFields from '../FormFields/ApplicationFormFields';
import { AddApplicationService, UpdateApplicationService } from '@/service/ApplicationService';
import { useRouter } from 'next/navigation';
import Spinner from '../UIComponents/Spinner';
import { MessageService } from '@/util/MessageService';
import { APPLICATION_TYPE } from '@/types/type.application';
import {RiAlertFill} from 'react-icons/ri'


export default function ApplicationFromController({ application }: { application?: APPLICATION_TYPE }) {

  const formRef = useRef<FormInstance>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  const addOrUpdateAppkucation = async (values: any) => {
    setLoading(true)
    try {
      let response;
      if (application) {
        response = await UpdateApplicationService(values)
      }
      else {
        response = await AddApplicationService(values)
      }
      MessageAntd.success(MessageService(response))
      router.refresh();
      router.push('/');
    } catch (error: any) {
      MessageAntd.success(MessageService(error))

    }
    finally {
      setLoading(false)
    }
  }

  const submit = (values: any) => {
    if (application) {
      values.id = application._id
    }
    addOrUpdateAppkucation(values)
  }

  return (
    <div>
      {
        application &&
        <div className='text-rose-500 flex items-center gap-1 text-sm mb-6 font-semibold'>
           <RiAlertFill className='animate-bounce text-lg'/>
           <span>Don't change the extiting category name it will change the key , which will break image fetch for that perticular category.</span>
        </div>

      }
      <div>
     
      </div>
      <FormAntd ref={formRef} layout='vertical' onFinish={submit} initialValues={application}>
        <ApplicationFormFields form={formRef} />
        <ButtonAntd htmlType='submit' className='bg-sky-600 flex items-center justify-center gap-1' block type='primary'>
          <Spinner loading={loading} />{application ? 'Update' : 'Save'}
        </ButtonAntd>
      </FormAntd>
    </div>
  )
}
