
import FoundWithTitle from './OtherButtonWithTitle'

const NoteFound = () => {
  return (
      <div className="min-h-screen  bg-gray-100 flex flex-col justify-center items-center p-4">           
              <div className="bg-white p-6 rounded-md shadow-md max-w-[40rem] w-full">
         <FoundWithTitle link='/' text='No Notes found'/>
     </div>
     </div>
  )
}

export default NoteFound