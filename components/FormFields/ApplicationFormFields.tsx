import React from 'react'
import { ButtonAntd, FormAntd, InputAntd } from '../Antd'

export default function ApplicationFormFields() {
  return (
    <>
    <FormAntd.Item name='name' label='Application Name' rules={[{required:true, message:'Application name is required.'}]}>
        <InputAntd placeholder='Application name' className='p-2'/>
    </FormAntd.Item>
    <FormAntd.List name='categories'>
      {
        (fileds,{remove,add})=>{
         return(
          <>
          {
            fileds.map(({name},index)=>{
              return(
                <div key={index}>
                  <FormAntd.Item label={`Category-${index+1}`} name={[name,'name']} rules={[{required:true,message:'Category name is required'}]}>
                    <InputAntd placeholder='Category name'/>
                  </FormAntd.Item>
                </div>
              )
            })
          }
          <ButtonAntd onClick={()=>add()} className='my-4 bg-blue-600' type='primary'>Add category</ButtonAntd>
          </>
         )
        }
      }
    </FormAntd.List>
    </>
  )
}
