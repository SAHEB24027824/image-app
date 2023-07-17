import React from 'react';
import {ImSpinner9} from 'react-icons/im'

export default function Loader() {
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <div className='flex items-center gap-4 text-blue-700 text-2xl'>
      <ImSpinner9 className=' animate-spin'/>
      Loading...
      </div>
    </div>
  )
}
