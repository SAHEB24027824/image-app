'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import ImageUploadFormFields from '../FormFields/ImageUploadFormFields';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ButtonAntd, FormAntd, MessageAntd } from '../Antd';
import { AddImageService } from '@/service/ImageService';
import { MessageService } from '@/util/MessageService';
import Spinner from '../UIComponents/Spinner';
import {BsFillBookmarkCheckFill} from 'react-icons/bs'

export default function ImageUploadFormController(
  { params, modalClose ,getImages}:
  { params: { params: string[] }, modalClose: React.Dispatch<React.SetStateAction<boolean>>, getImages:any}) {

  const applicationKey = params?.params[0]
  const categoryKey = params?.params[1]
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const initialValues={width:400,height:400,quality:50,resizeOption:'fill'};
  const [form] = FormAntd.useForm();



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
    event.target.value='';
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



  const loadedImageContainer = () => {
    return (
      <div className={`flex flex-wrap  transition-all duration-500 ease-in-out overflow-hidden ${imageUrls.length > 0 ? 'max-h-140 p-2 rounded-md shadow-lg' : 'max-h-0'}`}>
        {
          imageUrls.map((image, index) => {
            return (
              <div key={index} className='relative m-2'>
                <Image
                  src={image.url}
                  width={80}
                  height={80}
                  alt='Loaded Images'
                />
                <AiFillCloseCircle
                  className=' absolute top-0 right-0 cursor-pointer hover:text-red-500'
                  onClick={() => removeImageFromQueue(image.name)}
                />
              </div>
            )
          })
        }
      </div>
    )
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
      imageFile.forEach(item => {
        formData.append('image', item)
      })
      const response = await AddImageService(formData);
      MessageAntd.success(MessageService(response))
      setImageFile([])
      setImageUrls([])
      modalClose(false)
      form.resetFields()
      getImages();
    } catch (error: any) {
      MessageAntd.error(MessageService(error))
    }
    finally {
      setTimeout(() => { setLoading(false) }, 1000)
    }
  }



  return (
    <FormAntd form={form} onFinish={submit} layout='vertical' initialValues={initialValues}>


      <div className='my-4 p-2 bg-blue-500 text-white text-xs flex flex-col gap-2'>

        <span className='flex gap-1 items-center'>
        <BsFillBookmarkCheckFill/><span> Banner , NEWS Resize:Fill, Height:400, Width:800</span>
        </span>
        <span className='flex gap-1 items-center'>
        <BsFillBookmarkCheckFill/><span> Product deals Resize:Contain, Height:400 , Width:400, equal height and width</span>
        </span>
      </div>


      <ImageUploadFormFields onLoadImages={loadImages} />
      <div className='mt-4'>
        {loadedImageContainer()}
      </div>
      <ButtonAntd htmlType='submit' disabled={imageUrls.length < 1} block type='primary' 
      className='bg-blue-600 mt-4 flex items-center justify-center gap-2'>
        <Spinner loading={loading} /> Upload</ButtonAntd>
    </FormAntd>
  )
}
