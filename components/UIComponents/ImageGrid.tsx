'use client'
import { IMAGE_TYPE } from '@/types/type.image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { InputAntd, MessageAntd, PopconfirmAntd, SwitchAntd } from '../Antd'
import { DeleteImageService, GetImageService } from '@/service/ImageService'
import { AiFillDelete } from 'react-icons/ai'
import { MessageService } from '@/util/MessageService'
import ImageUploader from './ImageUploader'
import DataLoader from './DataLoader'



export default function ImageGrid({ params }: { params: { params: string[] } }) {

  const applicationKey = params?.params[0];
  const categoryKey = params?.params[1];

  const [images, setImages] = useState<IMAGE_TYPE[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //================== Get all images ===================//
  const getImages = async () => {
    setLoading(true)
    try {
      const response = await GetImageService({ applicationKey, categoryKey, searchText });
      if (response?.result) { setImages(response?.result) }
      else { setImages([]) }
    }
    catch (error) { setImages([]) }
    finally { setTimeout(() => { setLoading(false) }, 1000) }
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
      {/* =========== Header Area ============= */}
      <div className='flex items-center gap-2 float-right'>
        <SwitchAntd className='bg-slate-500' onChange={setEnableDelete} />
        <span>Delete Image</span>
      </div>
      <InputAntd
        placeholder='Search image by name, url, width, height ,quality'
        onChange={(e) => setSearchText(e.target.value)}
        className='mt-6 mb-10 p-4 text-[16px] font-semibold bg-gray-100'
      />
      {loading && <DataLoader />}

      {
        images && images.length > 0 ?
          <div className='flex flex-wrap gap-2'>
            {images.map((image, index) => {
              return (
                <div key={index} className='border p-2 max-w-[200px] shadow-md rounded-md relative'>
                  <Image src={`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`}
                    height={120}
                    width={120}
                    alt={image.name}
                    className='block m-auto h-[120px] w-[120px] object-contain'
                    onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`)}
                  />
                  <div className='mt-2'>
                    <div className='text-xs font-semibold p-1'>{image.name}</div>
                    <div className='flex flex-col gap-1 bg-gray-700 text-white p-2 rounded-md text-[10px]'>
                      <p><span className='font-semibold'>Height: </span>{image?.height}</p>
                      <p><span className='font-semibold'>Width: </span>{image?.width}</p>
                      <p><span className='font-semibold'>Quality: </span>{image?.quality}</p>
                      <p><span className='font-semibold'>resizeOption: </span>{image?.resizeOption}</p>
                    </div>
                  </div>

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
