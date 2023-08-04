'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeftCircle,  EyeOff, Globe2, History} from "lucide-react";
// Import the Markdown editor library
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import TogglePublicPrivate from "../components/IsPublicToggle";
import TimeAgo from '../components/TimeAgo';
import CutText from "../components/CutToText";
import TruncateText from "../components/TruncateText";

interface ShowNoteProps {
  notes: Meta[],
  Emptymessage: string
}

 const NotesComponent : React.FC<ShowNoteProps> = ({
 notes, Emptymessage
 }) => {

  const router = useRouter();
  const [editNoteId, setEditNoteId] = useState(""); 
  const [disabled, isDisable] = useState(false)
  const [loading, setLoading] = useState(false);
  const [note, setNote] = React.useState(
    {
          title: "",
          content: "",
          isPublic: false
    }
    )
    

 const handleAddNote = async () => {
    try {
      setLoading(true);
      if (editNoteId) {
        // If editingTodoId is not empty, we are updating an existing note
        const response = await axios.put(`/api/note/edit-note?id=${editNoteId}`, note);
        console.log("Success", response.data);
        toast.success("Note Updated");
      } else {
        const response = await axios.post('/api/note/add-note', note);
        console.log("Success", response.data);
        toast.success("Note Saved")
      }
       router.refresh();
       setNote({  title: "",content: "",isPublic:false});
       setEditNoteId(""); // Reset the editingTodoId after adding/updating 
    } catch (error:any) {
            toast.error("Something goes wrong");
            console.log("Failed", error.message);
    } finally {

              setLoading(false);
          
        }
  }

 
   
   
 useEffect(() => {
  // Check if either the title or the content is empty or contains only spaces
  const isTitleOrContentEmptyOrSpace = (note.title.trim() === '' || note.content.trim() === '');
  // Disable the button if any of the fields is empty or contains only spaces
  isTitleOrContentEmptyOrSpace ? isDisable(true) : isDisable(false);
}, [note]);  
   
     
   

const handleEditNote = (noteId: string) => {
  // Find the todo with the matching ID
  const noteToEdit = notes.find((note) => note.id === noteId);

  // If the todo is found, set the state with its title and content
  if (noteToEdit) {
    setNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
      isPublic: noteToEdit.isPublic
    });
    // Set the ID of the todo being edited
    setEditNoteId(noteId);
  }};
   

   const handleDeleteNote = async(noteId: string) => {
     try {
          const toastDeleting=  toast.loading('Deleting...')
          const response = await axios.delete(`/api/note/delete-note?id=${noteId}`);
          console.log("Success", response.data);
          toast.dismiss(toastDeleting)
          toast.success("Note Deleted");
          router.refresh()
      
     } catch (error: any) {
       toast.error("Something went wrong");
       console.error("Error deleting note:", error.message);
     } 
   };
   

   // handleMdcontent
 const handleMdcontent = (value?: string) => {
    // Update the note content whenever the Markdown content changes
    setNote({
      ...note,
      content: value || ''
    });
  }
   // handleSet pUblic
 const handleSetPublic = (value: boolean) => {
    setNote({
      ...note,
      isPublic: value 
    });
  }

      // Reset everything
  const handleReset = () => {
       router.refresh();
       setNote({  title: "",content: "", isPublic:false});
       setEditNoteId("");
       setLoading(false)
  };

   
  return (
  <>
      <div className="bg-white p-6 rounded-md shadow-md max-w-[40rem] w-full">
  
        <div className="flex gap-2 items-center">
           <button
            onClick={()=>router.push('/')}
            className={` mb-4 rounded-md p-2 ring-1 ring-neutral-900 text-white  bg-neutral-800  hover:opacity-90 shadow-sm`}>
            <ArrowLeftCircle/>
        </button>
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">Note</h1>
         <TogglePublicPrivate isPublic={note.isPublic} setPublic={handleSetPublic} />
        </div>


        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({...note, title:e.target.value})}
          placeholder="Title of the note.."
          className="w-full border-2 bg-[#0d1117] border-gray-900 rounded-md p-3
          mb-2 focus:border-gray-900 text-white text-base"
      
        />


        <MDEditor
          value={note.content}
          onChange={handleMdcontent}
          textareaProps={{ placeholder: "Write your content here.." }}
          previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />

    
     
        <div className="flex gap-2 text-white">
           <button
          onClick={handleAddNote}
            className={`ring-neutral-900 ring-1 py-2 px-4 rounded-md bg-neutral-950 disabled:opacity-50 mt-2  shadow
          hover:opacity-80 
            `}
          disabled={disabled}
              >
       {loading?'Saving...': editNoteId?'Update note':'Save note'}
          </button>
          
          

    <button
            onClick={handleReset}
            className={`ring-neutral-900 ring-1 py-2 px-4 rounded-md bg-neutral-950 disabled:opacity-50 mt-2 hover:opacity-80   shadow`}>
      Reset
   </button>
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
               {note.isPublic?<Globe2 size={16}/> : <EyeOff size={16}/>}  
          </div>
              <p className="text-xs text-gray-500 my-2 flex items-center gap-1">
                <History size={16}/> <TimeAgo timestamp={note.createdAt}  />
           </p>
          <div className="text-sm sm:text-base font-medium flex flex-col gap-4"> {note.title}  </div>
          <p className='text-[13px] my-2'>{TruncateText(note.content,180)}</p>
         
           <div className="mt-4 flex gap-2 text-[13px] flex-wrap">  
              <button
                onClick={() => router.push(`/note/${note.id}?title=${note.slug}${note.id}`)}
                className="py-1 px-2 rounded ring-gray-500 ring-1 shadow bg-gray-50"
              >
                View
              </button>
              <button
                onClick={() => handleEditNote(note.id)}
                className="py-1 px-2 rounded  ring-gray-500 ring-1 shadow bg-gray-50"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="py-1 px-2 rounded ring-gray-500 ring-1 shadow bg-gray-50"
              >
             Delete
              </button>
            </div>

        </div> 
      )) 
        
    }
    </div>
   
  </>
  
  )
}

export default NotesComponent