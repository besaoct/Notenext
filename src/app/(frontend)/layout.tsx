import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast'

const Montse = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextnote',
  description: 'Full stack Note application authentication with nextjs using typescript, tailwindcss, prisma and mongoDB',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
      
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
   <body className={`${Montse.className} h-screen w-full`}>
         <Toaster
       position='top-right'
        containerClassName=""
        toastOptions={{
               style: {
                background: '#363636',
                color: '#fff',
       
    },
        }}
        />   
        <main className="m-auto">
      
              {children}             
         
        </main>
        
            <footer className='p-4 text-center text-white bg-neutral-900 '> {`Made with ♥ - Shafin`}</footer>
      </body>

    </html>
  )
}
