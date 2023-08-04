"use client";

import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

// import Message from "../../components/TokenMessage";


export default function VerifyEmailPage() {


    const router = useRouter()
    const searchParams = useSearchParams()
    const  hasToken = searchParams.has("token")
    
    if (!hasToken || searchParams.get('token')==='') {
        router.push('/auth/login')
    }

    const [token, setToken] = useState("");
    // const [verified, setVerified] = useState(false);
    // const [error, setError] = useState(false);

    const verifyUserEmail = useCallback(async () => {
        toast.loading('verifying...', { position: 'top-center' })
        try {
        
            await axios.post('/api/auth/verifyEmail', { token })
            toast.dismiss()
            // setVerified(true);
            router.push('/auth/login')
            toast.success('Email verified successfully')
        } catch (error: any) {
            toast.dismiss()
            // setError(true);
            router.push('/auth/login')
            toast.error('Invalid token')
        }

    }, [token,router]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token,verifyUserEmail]);

   


  
    return null
//     (
//         <>
//                 <div className="min-h-screen  bg-gray-100 flex flex-col justify-center items-center p-4">
//                         <div className="bg-white rounded-md p-4 shadow-md w-full max-w-[40rem] ">
//                             <div className='m-auto p-4 bg-neutral-100 border border-neutral-200'>
        
                  
//                         <Message text={verified ? "Verifying..."
//                             :
//                             error ? "Verifying... ":
//                                "Verifying..." 
//                     } />
                           

//                   </div>
//              </div>
//           </div>
//         </>
//   )
}