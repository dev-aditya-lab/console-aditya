import React from 'react'

export default function Footer() {
  return (
    <div className='w-full py-10 text-center flex items-center justify-center bg-gray-800 text-white'>
        <h1>
            Made with keyboard rage & caffeine ☕ | © {new Date().getFullYear()} consoleAditya.dev
        </h1>
    </div>
  )
}
