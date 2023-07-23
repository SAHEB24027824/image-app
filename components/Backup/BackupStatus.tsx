'use client'
import { GetApplicationsService } from '@/service/ApplicationService';
import { GetImageService } from '@/service/ImageService';
import { APPLICATION_TYPE } from '@/types/type.application';
import { IMAGE_TYPE } from '@/types/type.image';
import { MessageService } from '@/util/MessageService';
import JSZip from 'jszip';
import React, { useEffect, useState } from 'react'
import { LuDatabaseBackup } from 'react-icons/lu';
import { ButtonAntd, MessageAntd } from '../Antd';
import Spinner from '../UIComponents/Spinner';


export default function BackupStatus() {

  const [images, setImages] = useState<IMAGE_TYPE[]>([])
  const [applications, setApplications] = useState<APPLICATION_TYPE[]>([])
  const [loading, setLoading] = useState<boolean>(false);


  const getDataForBackup = async () => {
    try {
      const imageResponse = await GetImageService({});
      const applicationResponse = await GetApplicationsService();
      if (imageResponse && imageResponse?.result) {
        setImages(imageResponse?.result)
      }
      if (applicationResponse && applicationResponse?.result) {
        setApplications(applicationResponse?.result)
      }
    } catch (error) {
      console.log(error);
      setImages([]);
      setApplications([]);
    }
  }


  const downloadZip = (file: Blob, filename: string) => {
    const aTag = document.createElement('a');
    aTag.download = filename;
    const url = URL.createObjectURL(file);
    aTag.href = url;
    aTag.style.display = 'none';
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    URL.revokeObjectURL(url);
  }

  const TakeImageBackup = async () => {
    setLoading(true)
    try {
      if (images && images.length > 0) {
        const imageBlobArray = images.map(async (image) => {
          const imageURL = `${process.env.NEXT_PUBLIC_APP_URL}${image.url}`;
          const res = await fetch(imageURL);
          const blob = await res.blob();
          return { fileName: image.url, blob };
        })
        const res = await Promise.all(imageBlobArray)
        const zip = new JSZip();
        res.forEach(item => {
          zip.file(item.fileName, item.blob)
        })
        const imageZipFile = await zip.generateAsync({ type: 'blob' });
        downloadZip(imageZipFile, 'images.zip')
      }
      else {
        MessageAntd.error('Images not found');
      }

    } catch (error: any) {
      console.log(error)
      MessageAntd.error(MessageService(error))
    }
    finally {
      setLoading(false)
    }
  }

  const TakeMongoDBBackup = async () => {
    setLoading(true)
    try {
      const zip = new JSZip();
      if (applications && applications.length > 0) {
        zip.file('collections/applications.json', JSON.stringify(applications));
      }
      if (images && images.length > 0) {
        zip.file('collections/images.json', JSON.stringify(images));
      }
      const collectionZipFile = await zip.generateAsync({ type: 'blob' });
      downloadZip(collectionZipFile, 'dbCollection.zip')

    } catch (error: any) {
      console.log(error)
      MessageAntd.error(MessageService(error))
    }
    finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    getDataForBackup()
  }, [])




  return (
    <div className='flex flex-col h-full items-center gap-2 pb-4'>
      
      <ButtonAntd type='primary' className='bg-slate-500 flex items-center justify-center gap-2'
        onClick={() => TakeImageBackup()}
      >
        <Spinner loading={loading} />
        <LuDatabaseBackup />
        Take Backup of All Image
      </ButtonAntd>

      <ButtonAntd type='primary' className='bg-slate-500 flex items-center justify-center gap-2'
        onClick={() => TakeMongoDBBackup()}
      >
        <Spinner loading={loading} />
        <LuDatabaseBackup />
        Take Backup of Database
      </ButtonAntd>
    </div>
  )
}
