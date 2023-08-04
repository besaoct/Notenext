'use client'
import React from 'react'
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <>
           <button onClick={()=>signOut()}  className='px-4 p-2 shadow-md ring-1 ring-rose-500 rounded bg-rose-50 text-rose-600'>LogOut</button>
      </>
  )
}

export default LogoutButton