'use client'
import { IMAGE_TYPE } from '@/types/type.image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { InputAntd, MessageAntd, PopconfirmAntd, SwitchAntd } from '../Antd'
import { DeleteImageService, GetImageService } from '@/service/ImageService'
import { AiFillDelete } from 'react-icons/ai'
import { MessageService } from '@/util/MessageService'
import { useRouter } from 'next/navigation'



export default function ImageGrid(
  {
    images,
    className,
    categoryKey,
    applicationKey
  }
    :
    {
      images: IMAGE_TYPE[],
      className: string,
      categoryKey: string,
      applicationKey: string
    }) {

  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [imagesData, setImagesData] = useState<IMAGE_TYPE[]>(images);
  const router = useRouter();

  const getAllImages = async () => {
    try {
      const response = await GetImageService({ applicationKey, categoryKey, searchText })
      if (response?.result) {
        setImagesData(response?.result)
      }
      else {
        setImagesData([])
      }
    } catch (error) {
      setImagesData([])
    }
  }

  const deleteImage = async (id: string) => {
    try {
      const response = await DeleteImageService(id)
      MessageAntd.success(MessageService(response))
      router.refresh();
    } catch (error: any) {
      MessageAntd.error(MessageService(error))
    }
    finally {
      getAllImages()
    }
  }

  useEffect(() => {
    getAllImages()
  }, [searchText])

  useEffect(()=>{
    setImagesData(images)
  },[images])




  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    MessageAntd.success('URL copied to clipboard')
  }

  const setSearchTextFn = (e: any) => {
    if (!e?.target?.value) {
      setImagesData(images)
    }
    if (e?.target?.value.match(/^ *$/) == null) {
      setSearchText(e?.target?.value);
    }
  }


  return (
    <div className={className}>

      <div className='my-4 flex items-center gap-2'>
        <SwitchAntd className='bg-slate-500' onChange={setEnableDelete}/>
        <span>Delete Image</span>
      </div>

      <InputAntd placeholder='Search image by name, url, width, height ,quality' className='mb-16' onChange={setSearchTextFn} />
      
      {
        imagesData && imagesData.length > 0 &&
        <div className='flex flex-wrap  items-center gap-2 overflow-hidden '>
          {imagesData.map((image, index) => {
            return (
              <div key={index} className='shadow-md duration-300 rounded-md hover:shadow-slate-700 relative'>


                <Image src={`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`}
                  height={120}
                  width={140}
                  alt={image.name}
                  className='cursor-pointer block m-auto'
                  onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_APP_URL}${image.url}`)}
                />


                <p className='text-sm text-center py-2'>{image.name}</p>


                <p className='bg-sky-500 text-white text-[10px] p-2 flex flex-wrap justify-center  items-center gap-2'>
                  <span>Height: {image?.height}</span>
                  <span>Width: {image?.width}</span>
                  <span>Quality: {image?.quality}</span>
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

      }
    </div>
  )
}
