import React from 'react';
import { FaSpinner } from 'react-icons/fa';


export default function Spinner({loading}:{loading:boolean}) {
  return (
    <>
    {loading && <FaSpinner className=' animate-spin' />}
    </>
  )
}
