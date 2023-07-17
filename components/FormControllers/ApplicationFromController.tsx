'use client'
import { FormInstance } from 'antd';
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { ButtonAntd, FormAntd, MessageAntd } from '../Antd'
import ApplicationFormFields from '../FormFields/ApplicationFormFields';
import { AddApplicationService, UpdateApplicationService } from '@/service/ApplicationService';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Spinner from '../UIComponents/Spinner';
import { MessageService } from '@/util/MessageService';
import { APPLICATION_TYPE } from '@/types/type.application';


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
      <FormAntd ref={formRef} layout='vertical' onFinish={submit} initialValues={application}>
        <ApplicationFormFields form={formRef} />
        <ButtonAntd htmlType='submit' className='bg-sky-600 flex items-center justify-center gap-1' block type='primary'>
          <Spinner loading={loading} />{application ? 'Update' : 'Save'}
        </ButtonAntd>
      </FormAntd>
    </div>
  )
}
