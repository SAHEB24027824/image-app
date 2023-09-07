import React from 'react';

export default function Loader() {
  return (
    <div className='text-gray-700 font-bold text-2xl z-[999]  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
    <div className='animate-bounce'>Loading please wait ... </div>
   </div>
  )
}
