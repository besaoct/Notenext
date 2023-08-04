'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ButtonProps{
    text: string,
    link: string,
    className?: string
}

const Button = ({ text, link,className }:ButtonProps) => {
const router = useRouter()
  return (
      <button onClick={() => router.push(`${link}`)}
          className={`px-4 p-2 text-left hover:opacity-90 ring-1 shadow-md rounded ring-neutral-900 bg-neutral-800 text-white ${className}`}>
          {text}
      </button>
  )
}

export default Button