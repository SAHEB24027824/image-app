'use client'
import { IMAGE_TYPE } from '@/types/type.image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { InputAntd, MessageAntd, PopconfirmAntd, SwitchAntd } from '../Antd'
import { DeleteImageService, GetImageService } from '@/service/ImageService'
import { AiFillDelete } from 'react-icons/ai'
import { MessageService } from '@/util/MessageService'
import ImageUploader from './ImageUploader'
import Spinner from './Spinner'



export default function ImageGrid({ params }: { params: { params: string[] } }) {

  const applicationKey = params?.params[0];
  const categoryKey = params?.params[1];

  const [images, setImages] = useState<IMAGE_TYPE[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false);
  
//================== Get all images ===================//
  const getImages = async () => {
    setLoading(true)
    try {
      const response = await GetImageService({ applicationKey, categoryKey, searchText });
      if (response?.result) {
        setImages(response?.result)
      }
      else {
        setImages([])
      }
    } catch (error) {
      setImages([])
    }
    finally{
      setLoading(false)
    }
  }


//================== Delete images ===================//

  const deleteImage = async (id: string) => {
    try {
      const response = await DeleteImageService(id)
      MessageAntd.success(MessageService(response))
    } catch (error: any) {
      MessageAntd.error(MessageService(error))
    }
    finally {
      getImages()
    }
  }

//================== Copy To Clipboard ===================//

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    MessageAntd.success('URL copied to clipboard')
  }



  useEffect(() => {
    getImages();
  }, [searchText])





  return (
    <div>

      <div className='my-4 flex items-center gap-2 float-right'>
        <SwitchAntd className='bg-slate-500' onChange={setEnableDelete} />
        <span>Delete Image</span>
      </div>
      
      <div className='mb-16'>
      <InputAntd placeholder='Search image by name, url, width, height ,quality' onChange={(e) => setSearchText(e.target.value)} />
     {loading && <p className='flex items-center gap-1 text-sm mt-2'><Spinner loading={loading}/> Loading ...</p>}
      </div>

      {
        images && images.length > 0 ?
          <div className='flex flex-wrap  items-center gap-4 overflow-hidden justify-center md:justify-start w-full md:w-[90%] m-auto'>
            {images.map((image, index) => {
              return (
                <div key={index} className='shadow-md duration-300 rounded-md hover:shadow-slate-700 relative'>


                  <Image src={`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`}
                    height={100}
                    width={120}
                    alt={image.name}
                    className='cursor-pointer block m-auto'
                    onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`)}
                  />


                  <p className='text-sm text-center py-2'>{image.name}</p>


                  <p className='bg-sky-500 text-white text-[10px] p-2 flex flex-wrap justify-center  items-center gap-2'>
                    <span>H: {image?.height}</span>
                    <span>W: {image?.width}</span>
                    <span>Q: {image?.quality}</span>
                    <span>T: {image?.resizeOption}</span>
                  </p>

                  {enableDelete &&
                    <PopconfirmAntd placement="left" title='Delete Image ?' onConfirm={() => deleteImage(image._id)} okButtonProps={{ className: ' bg-black' }}>
                      <AiFillDelete className='text-lg text-rose-500 absolute top-1 right-1 cursor-pointer' />
                    </PopconfirmAntd>
                  }


                </div>
              )
            })}
          </div>

          :

          <div className='flex justify-center'>
            <p className='text-center shadow-lg p-4 bg-rose-500 text-white rounded-md my-6'>No Image found</p>
          </div>

      }
      <ImageUploader params={params} getImages={getImages} />

    </div>
  )
}
