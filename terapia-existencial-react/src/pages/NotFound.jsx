import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='rounded-xl  m-4 p-10 border'>
        <h1 className='text-3xl'>404 Página no encontrada</h1>
        <p className='text-2xl'>Lo sentimos, <Link to='/' className='text-primary'>vuelve al inicio</Link></p>
      </div>
    </div>
  )
}

export default NotFound
