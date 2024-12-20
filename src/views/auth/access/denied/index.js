import React from 'react'
import { VscWarning } from 'react-icons/vsc'

function Page() {
  return (
    <div className='flex flex-1 flex-col min-h-[calc(100vh-211px)] justify-center items-center text-main-100'>
      <VscWarning className='h-36 w-36 text-main-100' />
      <p className='text-5xl font-bold'>Access Denied.</p>
    </div>
  )
}

export default Page