'use client'

import {  useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import BackButtonWithTitle from '../../components/BackButton';

export default function Login() {

  const router = useRouter();
  const [user, setUser] = React.useState(
    {
      email: "",
      password:""
    }
  )
   
  const [loading, setLoading] = useState(false);


   const handleLogin = () => {
    setLoading(true);
    signIn('credentials', { 
      ...user, 
      redirect: false,
    })
    .then((callback) => {
      setLoading(false);
    
      if (callback?.error) {
        toast.error(callback.error);
      } else {
        if (callback?.ok) {
          toast.success('Logged in');
          router.refresh();
          router.push('/')
        }
      }

  
    });
    }
  


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <BackButtonWithTitle link='/' text='Login'/>
        <input
          type="email"
          placeholder="Email"
          value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
          className="w-full border border-gray-300 rounded-md p-2 mb-2 "
        />

        <input
          type="password"
          placeholder="password"
          value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          onClick={handleLogin}
          className={`w-full bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-900 disabled:opacity-50`}
           >
       {loading?'Processing..': 'Login'}
        </button>
    <button
          onClick={() => signIn('google')}
          className={`w-full bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-900 disabled:opacity-50 mt-2`} >
         Continue with Google 
        </button>
       <p className='mt-2'>Not an user?  <Link href={'/auth/signup'} className='underline'>SignUp</Link> </p>
    </div>
    </div>
  );
};

