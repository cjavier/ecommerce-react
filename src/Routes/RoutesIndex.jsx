// Implementar react-router-dom
import { Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Login, Secret, Signup, ItemDetail, SignupAdmin, CreateItem } from '@/Pages'
import { useAuthContext } from '@/Hook/useAuthContext'

const RoutesIndex = () => {
  const { isAuth } = useAuthContext()
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/item/:id' element={<ItemDetail />} />
        <Route path='/create-item' element={<CreateItem />} />
        <Route path='/dashboard' 
        element={
        isAuth
        ? <Dashboard />
        : <Login /> 
        } 
        />
        <Route path='/login' element={<Login/>} />
        <Route 
        path='/secret' 
        element={
        isAuth
        ? <Secret />
       : <Login />
       } 
       />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signup-admin' element={<SignupAdmin />} />
    </Routes>
  )
}

export default RoutesIndex