
import React from 'react'
import { Metadata } from 'next';
import { getPublicNotes } from '@/app/(backend)/helpers/getPublicNotes';
import PublicNotesComponent from './PublicNotesComponent';
import getCurrentUser from '@/app/(backend)/helpers/getCurrentUser';
// import toast from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Notes Feed',
  description: 'Public Notes',
}


async function page() {


  const currentUser = await getCurrentUser()

  if (!currentUser) {
    console.log('please login')
  }

   const notes = await getPublicNotes()
   if (!notes) {
    return null
  }
  

  const message= (notes.length>0)?'':'No public notes'
 
  return (
      <>
          <div className="min-h-screen  bg-gray-100 flex flex-col justify-center items-center p-4">           
             <PublicNotesComponent notes={notes} currentUser={currentUser} Emptymessage={message} />   
         </div>
      </>
  )
}

export default page