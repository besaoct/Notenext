
import React from 'react'
import { Metadata } from 'next';
import NotePage from './notePage';

export const metadata: Metadata = {
  title: 'Note',
  description: 'Add Notes to the list',
}


const page = () => {

  return (
    <>
    <NotePage/>
    </>
  )
}

export default page