'use client'
import ImageGrid from '@/components/UIComponents/ImageGrid';
import Card from '@/components/UIComponents/Card';
import React from 'react';

export default async function AllImagePage({ params }: { params: { params: string[] } }) {
  const applicationKey = params?.params[0];
  const categoryKey = params?.params[1];


  return (
    <Card title={`${applicationKey.toUpperCase()} / ${categoryKey.toUpperCase()}`} className='m-4 min-h-screen' bodyClassName='p-4'>
      <ImageGrid params={params} />
    </Card>
  )
}
