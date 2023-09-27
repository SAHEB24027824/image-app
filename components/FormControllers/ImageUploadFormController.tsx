'use client'
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import ImageUploadFormFields from '../FormFields/ImageUploadFormFields';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ButtonAntd, FormAntd, MessageAntd } from '../Antd';
import { AddImageService } from '@/service/ImageService';
import { MessageService } from '@/util/MessageService';
import Spinner from '../UIComponents/Spinner';
import { BsFillBookmarkCheckFill } from 'react-icons/bs'
import { FormInstance } from 'antd';

export default function ImageUploadFormController(
  { params, modalClose, getImages }:
    { params: { params: string[] }, modalClose: React.Dispatch<React.SetStateAction<boolean>>, getImages: any }) {

  const applicationKey = params?.params[0]
  const categoryKey = params?.params[1]
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const initialValues = { width: 800, height: 800, quality: 60, resizeOption: 'contain' };
  const formRef = useRef<FormInstance>(null);



  const loadImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files as FileList;
    setImageFile([])
    setImageUrls([])
    const selectedFilesArray = Array.from(files)
    const imageObjects = selectedFilesArray.map(file => {
      return { url: URL.createObjectURL(file), name: file.name }
    })
    setImageUrls(imageObjects)
    setImageFile(selectedFilesArray)
  }


  const removeImageFromQueue = (name: string) => {
    setImageFile(previous => {
      let file = previous.find(imageFile => imageFile.name == name) as File;
      let fileIndex = previous.indexOf(file);
      previous.splice(fileIndex, 1)
      return [...previous]
    })
    setImageUrls(previous => {
      let file = previous.find(setImageUrl => setImageUrl.name == name)
      let fileIndex = previous.indexOf(file);
      previous.splice(fileIndex, 1)
      return [...previous]

    })
  }



  const submit = async (values: any) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('applicationKey', applicationKey);
      formData.append('categoryKey', categoryKey);
      formData.append('name', values?.name as string);
      formData.append('width', values?.width as string);
      formData.append('height', values?.height as string);
      formData.append('quality', values?.quality as string);
      formData.append('resizeOption', values?.resizeOption as string);
      values?.background && formData.append('background', values?.background);
      imageFile.forEach(item => {
        formData.append('image', item)
      })
      const response = await AddImageService(formData);
      MessageAntd.success(MessageService(response))
      setImageFile([])
      setImageUrls([])
      modalClose(false)
      formRef?.current?.resetFields()
      getImages();
    } catch (error: any) {
      MessageAntd.error(MessageService(error))
    }
    finally {
      setTimeout(() => { setLoading(false) }, 1000)
    }
  }



  return (
    <FormAntd ref={formRef} onFinish={submit} layout='vertical' initialValues={initialValues}>
      <ImageUploadFormFields onLoadImages={loadImages} form={formRef} />

      {/* ======================= Preview Images Before Upload ====================== */}
      <div className='flex flex-wrap gap-2 p-2 items-center my-8'>
        {imageUrls && imageUrls?.map((image: { url: string, name: string }, index: number) => {
          return (
            <div key={index} className='relative'>
              <Image src={image?.url} height={60} width={60} alt='upload' className='border w-[60px] h-[60px] object-contain' />
              <AiFillCloseCircle className='text-red-500 absolute top-0 right-0 cursor-pointer' onClick={() => removeImageFromQueue(image.name)} />
            </div>
          )
        })}
      </div>

      <ButtonAntd htmlType='submit' disabled={imageUrls.length < 1} block type='primary'
        className='bg-blue-600 mt-4 flex items-center justify-center gap-2 p-2'>
        <Spinner loading={loading} /> Upload</ButtonAntd>
    </FormAntd>
  )
}
