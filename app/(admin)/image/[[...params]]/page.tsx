import ImageGrid from '@/components/UIComponents/ImageGrid';
import ImageUploader from '@/components/ImageUploader'
import Card from '@/components/UIComponents/Card';
import { GetImageService } from '@/service/ImageService';
import React from 'react';
import { GetCookie } from '@/util/cookie';
export const dynamic = 'force-dynamic';

export default async function AllImagePage({ params }: { params: { params: string[] } }) {
  const cookie = GetCookie()
  const applicationKey = params?.params[0];
  const categoryKey = params?.params[1];
  const response = await GetImageService({applicationKey ,categoryKey,cookie});
  const images = response?.result

  return (
    <Card title={`${applicationKey.toUpperCase()} / ${categoryKey.toUpperCase()}`} className='m-4 min-h-screen' bodyClassName='p-4'>
      {
        images ?
        <ImageGrid images={images} applicationKey={applicationKey} categoryKey={categoryKey} className="mt-10"/> 
        :
        <div className='flex justify-center animate-bounce'>
        <p className='text-center shadow-lg p-4 bg-rose-500 text-white rounded-md my-6'>No Image found</p>
        </div>
      }

      <ImageUploader params={params}/>
    </Card>
  )
}
