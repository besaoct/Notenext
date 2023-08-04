'use client'

import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BackbtnProps {
    link: string,
    text:string
        
}


const FoundWithTitle = ({link,text}: BackbtnProps) => {

 const  router =  useRouter()
  return (
    <div className='flex items-center gap-3'>
          <button
            onClick={()=>router.push(`${link}`)}
            className={` rounded-md p-2 ring-1 ring-neutral-900 text-white  bg-neutral-800  hover:opacity-90 shadow-sm`}>
            <ArrowLeftCircle/>
        </button>
          <h1 className="text-2xl font-bold">{text}</h1>
</div>
  )
}

export default FoundWithTitle