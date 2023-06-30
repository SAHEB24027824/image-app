'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import ImageUploadFormFields from '../FormFields/ImageUploadFormFields';
import {AiFillCloseCircle} from 'react-icons/ai';
import { ButtonAntd, messageAntd } from '../Antd';
import { AddImageService } from '@/service/ImageService';
import { MessageService } from '@/service/MessageService';
import Spinner from '../Spinner';
import { useRouter } from 'next/navigation';

export default function ImageUploadFormController({ params , modalClose }:
   { params: { ids: string[] } , modalClose:React.Dispatch<React.SetStateAction<boolean>> , }) {

  const appID = params?.ids[0]
  const catID = params?.ids[1]
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const router = useRouter()



  const loadImages = (event: React.ChangeEvent<HTMLInputElement>)=>{
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



const submit = async (event: React.FormEvent<HTMLFormElement>) => {
  setLoading(true)
  event.preventDefault()
  const form = event.target as HTMLFormElement;
  try {
      const formData = new FormData(form)
      formData.append('applicationId', appID);
      formData.append('categoryId', catID);
      imageFile.forEach(item => {
          formData.append('image', item)
      })
      const response = await AddImageService(formData);
      messageAntd.success(MessageService(response))
      setImageFile([])
      setImageUrls([])
      form.reset()
      modalClose(false)
      router.refresh();

  } catch (error: any) {
     messageAntd.error(MessageService(error))
  }
  finally {
    setTimeout(()=>{setLoading(false)},1000)
  }
}



  return (
    <form className=' p-4 rounded-md shadow-lg  w-full' onSubmit={submit}>
      <ImageUploadFormFields onLoadImages={loadImages}/>
      <div className='mt-4'>
        {loadedImageContainer()}
      </div>
      <ButtonAntd htmlType='submit' disabled={imageUrls.length<1} block type='primary' className='bg-blue-600 mt-4'>
       <Spinner loading={loading}/> Upload</ButtonAntd>
    </form>
  )
}
