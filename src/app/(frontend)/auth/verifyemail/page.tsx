import React from 'react'
import VerifyEmailPage from './Client'
import Loggedin from '@/app/(backend)/helpers/loggedIn'

const page = async() => {
    await Loggedin()
    
  return (
      <>
      <VerifyEmailPage/>
      </>
  )
}

export default page