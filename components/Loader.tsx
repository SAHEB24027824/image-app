import React from 'react';
import {ImSpinner9} from 'react-icons/im'

export default function Loader() {
  return (
    <div className='flex items-center gap-4 text-blue-700 text-2xl'><ImSpinner9 className=' animate-spin'/>Loading...</div>
  )
}
