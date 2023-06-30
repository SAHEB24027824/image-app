'use client'
import { FormInstance } from 'antd';
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { ButtonAntd, FormAntd } from '../Antd'
import ApplicationFormFields from '../FormFields/ApplicationFormFields';
import { AddApplicationService, GetApplicationsByIdService, UpdateApplicationService } from '@/service/ApplicationService';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';


export default function ApplicationFromController({modalClose , appId}:
  {modalClose:React.Dispatch<React.SetStateAction<boolean>> , appId?:string}) {

    const formRef = useRef<FormInstance>(null); 
    let [isPending, startTransition] = useTransition() 
    const router= useRouter();
    const { data } = useSWR(appId ? ['GetAppById',appId] : null, ([url,appId])=> GetApplicationsByIdService(appId))
    
    useEffect(()=>{
      if(data && Object.keys(data).length>0 && data.result){
        formRef.current?.setFieldValue('name',data.result.name);
        formRef.current?.setFieldValue('categories',data.result.categories);
      }
    },[data])

    const submit = (values:any)=>{
      if(appId){
        values.id=appId;
        startTransition(async()=>await UpdateApplicationService(values))
      }
      else{
        startTransition(async()=>await AddApplicationService(values))
      }
       router.refresh()
       modalClose(false);
    }

  return (
    <div>
        <FormAntd ref={formRef} layout='vertical' onFinish={submit} >
          <ApplicationFormFields/>
          <ButtonAntd htmlType='submit' className='bg-blue-600' block type='primary'>{JSON.stringify(isPending)}-Save</ButtonAntd>
        </FormAntd>
    </div>
  )
}
