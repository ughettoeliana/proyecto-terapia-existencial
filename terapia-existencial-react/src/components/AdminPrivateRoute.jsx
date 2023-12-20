import {Navigate} from 'react-router-dom'
import { getUserById } from '../api/user';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';



async function fetchUserData(userId) {
    try {
      const userData = await getUserById(userId);
      return userData.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  function AdminPrivateRoute({ children }) {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          return <Navigate to={'/login'} replace={true} />;
        }
  
        const tokenData = jwtDecode(authToken);
  
        try {
          const user = await fetchUserData(tokenData.userId);
          setUserData(user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } 
      };
  
      fetchData();
    }, []);
  
    if (!userData || userData.rol === 'user') {
      return <Navigate to={'/unauthorized'} replace={true} />;
    }
  
    return <>{children}</>;
  }
  



// async function AdminPrivateRoute({children}){
//    const authToken = localStorage.getItem("token");

//   if(!authToken){
//     return <Navigate to={'/login'} replace={true} />
//   } 

//   if(authToken){
//     const tokenData = jwtDecode(authToken);
//     const userData = await getUserById(tokenData.userId);
//     console.log('userData', userData.data.rol)
//     if(userData.data.rol == 'user'){
//         return <Navigate to={'/unauthorized'} replace={true} />
//     }
//   }

//   return children ?? null
// }

export default AdminPrivateRoute;