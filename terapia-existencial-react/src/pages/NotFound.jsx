import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BaseButton from '../components/BaseButton';

function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='rounded-xl  m-4 p-10 border'>
        <h1 className='text-3xl'>404 Página no encontrada</h1>
        <p className='text-2xl'>Lo sentimos,vuelve al inicio</p>
        <br/>
        <BaseButton btnText="Volver atrás" onClick={goBack} />
      </div>
    </div>
  )
}

export default NotFound
