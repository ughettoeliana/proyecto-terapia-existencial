import {Navigate} from 'react-router-dom'

function PrivateRoute({children}){
  if(!localStorage.getItem('token')){
    
    return <Navigate to={'/iniciar-sesion'} replace={true} />
  } 

  return children
}

export default PrivateRoute