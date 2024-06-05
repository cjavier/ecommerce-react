import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getUserService } from '@/Services/userServices'

const AuthContext = createContext() 

function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(false) // ¿ESTOY AUTENTICADO/LOGEADO? si o no
    const [userPayload, setUserPayload] = useState(null) //JWT payload decoficado - datos del usuario


const login = (token) => {
    localStorage.setItem('token', token)
    const decode = jwtDecode(token) //decodifica el payload del token
    setUserPayload(decode)
    setIsAuth(true) // estoy logeado? si
}

const logout = () => {
  localStorage.removeItem('token')
  setUserPayload(null) // borramos el payload del estado 
  setIsAuth(false) // estoy logeado? no , cerramos sesión
}

const fetchUserData = async (token) => {
  try {
    const response = await getUserService(token)
    if (response.status === 200) {
      setUserPayload(response.data)
    }
  } catch (error) {
    console.log('Error fetching user data', error)
  }
}

useEffect (() => {
   const token = localStorage.getItem('token') // para recuperar token es con geItem, para guardar es con setItem
   if (token) {
     const decode = jwtDecode(token) // decodifica el payload del token
     setUserPayload(decode)
     setIsAuth(true)
     fetchUserData(token)
   }
 }, [])

  // mandamos un objeto
  const data = {
    isAuth,
    userPayload,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
      </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }