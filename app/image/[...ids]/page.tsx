import ImageGrid from '@/components/ImageGrid';
import ImageUploader from '@/components/ImageUploader'
import { GetImageService } from '@/service/ImageService';
import React from 'react';
export const dynamic = 'force-dynamic';

export default async function AllImagePage({ params }: { params: { ids: string[] } }) {
  const appID = params?.ids[0]
  const catID = params?.ids[1]

  const response = await GetImageService(appID,catID);
  const images = response?.result
  return (
    <div>
      <div>
        <ImageUploader params={params}/>
        <ImageGrid images={images} className="mt-10"/>
      </div>

    </div>
  )
}
