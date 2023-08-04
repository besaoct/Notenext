
'use client'

import React from 'react'
import { ArrowLeftCircle, Globe2, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TimeAgo from '../components/TimeAgo';
import CutText from '../components/CutToText';
import TruncateText from '../components/TruncateText';

interface ShowNoteProps {
  notes: Meta[],
  Emptymessage: string
}

 const PublicNotesComponent : React.FC<ShowNoteProps> = ({
 notes, Emptymessage
 }) => {
   const router = useRouter();
  return (
      <>
      
        <div className="bg-white p-6 rounded-md shadow-md max-w-[40rem] w-full">
  
        <div className="flex gap-2 items-center">
           <button
            onClick={()=>router.push('/')}
            className={`  rounded-md p-2 ring-1 ring-neutral-900 text-white  bg-neutral-800  hover:opacity-90 shadow-sm`}>
            <ArrowLeftCircle/>
        </button>
          <h1 className="text-2xl font-bold  flex items-center gap-2">Notes Feed</h1>
        </div>
        </div>
      
      
  
      <div className="bg-white rounded-md p-4 shadow-md w-full max-w-[40rem] mt-8">
          {Emptymessage}
       {
       notes.map((note: any) => (
         <div key={note.id} className="border border-gray-200 bg-gray-100 p-4 rounded-md m-2">
           <div className='flex items-center gap-2 mb-4 rounded'>
              <div className='items-center justify-center  text-neutral-100
          h-8 w-8 min-w-[2.5rem] flex font-extrabold text-sm rounded-sm bg-neutral-600'> {CutText(note.author,1)} </div>
             <div className='text-base border-b border-b-neutral-600  text-black'>{note.author.split(" ")[0]}</div>
              <Globe2 size={16}/>
          </div>
              <p className="text-xs text-gray-500 my-2 flex items-center gap-1">
                <History size={16}/> <TimeAgo timestamp={note.createdAt}  />
           </p>
          <div className="text-sm sm:text-base font-medium flex flex-col gap-4"> {note.title}  </div>
          <p className='text-[13px] my-2'>{TruncateText(note.content,180)}</p>
          
           <div className="mt-4 flex gap-2 text-[13px] flex-wrap">
              
              <button
                onClick={() => router.push(`/notes-feed/${note.id}?title=${note.slug}${note.id}`)}
                className="py-1 px-2 rounded-sm ring-gray-300  ring-1 shadow bg-gray-50"
              >
                Read note
              </button>
              
           
            </div>

        </div> 
      )) 
        
    }
    </div>     
 
      </>
  )
}

export default PublicNotesComponent 