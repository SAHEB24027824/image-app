import ImageGrid from '@/components/ImageGrid';
import { GetImageService } from '@/service/ImageService';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const response = await GetImageService();
  const images = response?.result
  return (
    <div>
      <h1 className=' text-4xl font-bold text-slate-600 text-center shadow-lg p-4'>All Images</h1>
      <ImageGrid images={images} className="mt-10"/>
    </div>
  )
}
