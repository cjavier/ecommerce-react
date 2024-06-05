import axios from 'axios'

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com' // esto lo podemos cambiar si subimos el repo de github a render

const registerUserService = (data) => axios.post(`${BASE_URL}/register`, data)
const loginUserService = (data) => axios.post(`${BASE_URL}/login`, data)

const getUserService = (jwtToken) => axios.get(`${BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${jwtToken}`}})

export {
    registerUserService,
    loginUserService,
    getUserService
}