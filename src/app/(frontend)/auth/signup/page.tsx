
import React from 'react'
import Signup from './ClientComponent'
import LoggedIn from '../../../(backend)/helpers/loggedIn';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignUp',
  description: 'SignUp Page',
}


async function page() {
  await LoggedIn()
  return (
      <>
          <Signup/>
      </>
  )
}

export default page