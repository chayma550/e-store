import axios from "axios"


const apiRequest=axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000/api", 
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiRequest