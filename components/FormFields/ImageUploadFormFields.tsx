'use client'
import { DefaultImageResizeTypes } from '@/store/Default'
import { FormInstance } from 'antd'
import React from 'react'
import { FaUpload } from 'react-icons/fa'
import { ColorPickerAntd, FormAntd, InputAntd, InputNumberAntd, SelectAntd } from '../Antd'

export default function ImageUploadFormFields(
  {
    onLoadImages,
    form
  }:
    {
      onLoadImages: (event: React.ChangeEvent<HTMLInputElement>) => void,
      form: React.RefObject<FormInstance<any>>
    }) {

  return (
    <>
      <div className='grid grid-cols-3 gap-2 '>
        <FormAntd.Item name='name' label='Name' rules={[{ required: true }]}>
          <InputAntd placeholder='Image Name' />
        </FormAntd.Item>

        <FormAntd.Item name='resizeOption' label='Resize' rules={[{ required: true }]}>
          <SelectAntd options={DefaultImageResizeTypes} placeholder='Select Image resize type' />
        </FormAntd.Item>

        <div className='flex gap-1'>
          <FormAntd.Item name='background' label='Background'>
            <InputAntd />
          </FormAntd.Item>
          <FormAntd.Item label=' '>
            <ColorPickerAntd format='rgb' onChangeComplete={(color) => {
              let RGBA: { r: number, g: number, b: number, a?: number, alpha?: number } = color.toRgb();
              RGBA.alpha = RGBA.a;
              delete RGBA.a;
              form?.current?.setFieldValue('background', JSON.stringify(RGBA))
            }} />
          </FormAntd.Item>
        </div>


        <FormAntd.Item name='width' label='Width' rules={[{ required: true }]}>
          <InputNumberAntd min={0} className='w-full' />
        </FormAntd.Item>

        <FormAntd.Item name='height' label='Height' rules={[{ required: true }]}>
          <InputNumberAntd min={0} className='w-full' />
        </FormAntd.Item>

        <FormAntd.Item name='quality' label='Quality' rules={[{ required: true }]}>
          <InputNumberAntd min={0} max={100} className='w-full' />
        </FormAntd.Item>

      </div>

       {/* ======================= Upload Button ====================== */}

       <label htmlFor="uploader">
                <div className='flex gap-2 items-center justify-center cursor-pointer rounded-md shadow-md p-2 bg-blue-500 text-white'>
                    <FaUpload />Upload Image
                </div>
                <InputAntd type='file' id='uploader' onChange={onLoadImages} multiple={true} className='opacity-0' />
            </label>
    </>
  )
}
