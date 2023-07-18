'use client'
import React, { useState } from 'react'
import { FormAntd, InputAntd } from '../Antd'

export default function LoginFormFields() {
  return (
    <>
    <FormAntd.Item name='email' rules={[{required:true,message:'Email is required'}]} className='w-full'>
        <InputAntd placeholder='Email' className='p-2 border border-slate-400'/>
    </FormAntd.Item>

    <FormAntd.Item name='password' rules={[{required:true,message:'Password is required'}]}  className='w-full'>
        <InputAntd.Password type='password' placeholder='Password' className='p-2 border border-slate-400'/>
    </FormAntd.Item>
    </>
  )
}
