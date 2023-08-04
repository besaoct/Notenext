

import React from 'react'
import getCurrentUser from "../../(backend)/helpers/getCurrentUser"
import { Metadata } from 'next';
import Button from '../components/Button';
import CutText from '../components/CutToText';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile information',
}



export default async function ProfiePage() {
  const currentUser = await getCurrentUser()
    if (!currentUser) {
        return null
  }
  const MyName= currentUser.name===null? '':currentUser.name
  const AvatarText = CutText(MyName,1)
  return (
      <>
<div className="min-h-screen  bg-gray-100 flex flex-col justify-center items-center p-4">  
        <div className="bg-white rounded-md p-4 shadow-md w-full max-w-[40rem] ">
           <div className='m-auto p-4 bg-neutral-100 border border-neutral-200'>
             <div className='flex  flex-col gap-2 mb-4 overflow-auto'>
   
      <div className='items-center mb-4 justify-center  text-neutral-100
          h-20 w-20 flex font-extrabold text-6xl rounded-sm bg-neutral-900'> {AvatarText} </div>
              
             <p> {currentUser.name}</p>
             <p className='flex flex-row gap-2'> <Mail/> {currentUser.email}</p>
             <p >{currentUser.phone ? `My phone is: ${currentUser.phone}` : ''} </p>
           </div>
             <Button link="/"
            text="Back to home" />
           </div>
         </div>
         </div>
              
  
      </>
  )
}


