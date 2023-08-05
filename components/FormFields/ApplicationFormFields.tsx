import { formatSlugAndKey } from '@/util/formatSlugAndKey'
import { FormInstance } from 'antd'
import React from 'react'
import { ButtonAntd, DividerAntd, FormAntd, InputAntd, PopconfirmAntd } from '../Antd'
import { MdDeleteOutline } from 'react-icons/md'

export default function ApplicationFormFields(
  { form }:
    { form: React.RefObject<FormInstance<any>> }
) {
  return (
    <>
      <div className='md:grid grid-cols-2 gap-2'>
        <FormAntd.Item name='name' label='Application Name' rules={[{ required: true, message: 'Application name is required.' }]}>
          <InputAntd onChange={(e) => form?.current?.setFieldValue('key', formatSlugAndKey(e?.target?.value))} />
        </FormAntd.Item>
        <FormAntd.Item name='key' label='Key' rules={[{ required: true, message: 'Application Key is required.' }]}>
          <InputAntd readOnly={true}/>
        </FormAntd.Item>
      </div>
      <DividerAntd>Category</DividerAntd>
      <FormAntd.List name='category'>
        {
          (fileds, { remove, add }) => {
            return (
              <>
                {
                  fileds.map(({ name }, index) => {
                    return (
                      <div key={index} className='flex gap-2'>
                        <FormAntd.Item label='Name' name={[name, 'name']} rules={[{ required: true, message: 'Category name is required' }]} className='w-full'>
                          <InputAntd onChange={(e) => form?.current?.setFieldValue(['category', name, 'key'], formatSlugAndKey(e?.target?.value))} />
                        </FormAntd.Item>
                        <FormAntd.Item label='key' name={[name, 'key']} rules={[{ required: true, message: 'Category key is required' }]} className='w-full'>
                          <InputAntd readOnly/>
                        </FormAntd.Item>
                        <FormAntd.Item label=' '>

                          <PopconfirmAntd placement="left" title='Delete Category ?' onConfirm={() => remove(name)} okButtonProps={{ className: ' bg-black' }}>
                            <MdDeleteOutline className='text-rose-500 text-2xl' />
                          </PopconfirmAntd>
                        </FormAntd.Item>

                      </div>
                    )
                  })
                }
                <ButtonAntd onClick={() => add()} className='my-4 bg-blue-600' type='primary'>Add category</ButtonAntd>
              </>
            )
          }
        }
      </FormAntd.List>
    </>
  )
}
