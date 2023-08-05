import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'; 




const SingleNote = ({Title, Content, backLink}:any) => {
  return (
      <>
      
          <div className="min-h-screen  bg-neutral-100 flex flex-col justify-center items-center p-1 sm:p-2 text-neutral-800">
            <div className="bg-white rounded-md p-0 sm:p-2 shadow-md w-full max-w-[50rem] ">

                <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-md m-2 flex flex-col gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <Link href={backLink}
                            className={` mb-2 rounded-md p-2 text-white  bg-neutral-800  hover:opacity-90 shadow-sm`}>
                            <ArrowLeftCircle />
                        </Link>
                        <Link href={'/'}
                            className={` mb-2 rounded-md p-2 text-white bg-neutral-800  hover:opacity-90 shadow-sm`}>
                            Home
                        </Link>
                    </div>
                     <h1 className="text-md sm:text-xl md:text-2xl font-semibold md:font-extrabold mb-2">{Title}</h1>
                    <div className="prose prose-headings:text-neutral-700 
                    prose-h1:text-xl 
                    prose-h3:text-lg 
                    prose-h2:text-xl
                    prose-h4:text-md
                    prose-h5:text-sm
                    prose-p:text-[13px]
                    md:prose-p:text-[16px]
                    sm:prose-p:text-[14px]
                    prose-pre:p-2
                    prose-pre:bg-[#282c34]
                    
                    ">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{Content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
      
      </>
  )
}

export default SingleNote