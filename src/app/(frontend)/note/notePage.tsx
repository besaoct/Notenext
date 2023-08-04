
import React from 'react'
import {getCurrentUserNotes} from '../../(backend)/helpers/getCurrentUserNotes';
import NoteFound from '../components/NoteFound';
import NotesComponent from './NotesComponent';

async function NotePage() {
   const notes = await getCurrentUserNotes()
   if (!notes) {
    return NoteFound()
  }
  
  const message= (notes.length>0)?'':'Please add note to the list'
  
  return (
      <>
          <div className="min-h-screen  bg-gray-100 flex flex-col justify-center items-center p-4">
                <NotesComponent notes={notes} Emptymessage={message} />          
         </div>
      </>
  )
}

export default NotePage