'use client'

import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BackbtnProps {
    text:string    
}


const Message = ({text}: BackbtnProps) => {

 const  router =  useRouter()
    return (
      <>
     
        <div className='flex flex-row justify-start gap-2 items-center w-full'>
             <button
            onClick={()=>router.push('/auth/login')}
            className={`rounded-md p-[0.9rem]  text-black   bg-white  hover:opacity-90 shadow-md`}>
            <ArrowLeftCircle/>
        </button>

 
      <div className="bg-white rounded-md p-4 w-full shadow-md ">
             <div className='flex text-xs sm:text-sm flex-col gap-2  overflow-auto'>
   

             <p> {text}</p>
     
       </div>
     
           </div>
        </div>
 </>

  )
}

export default Message