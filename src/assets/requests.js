import axios from 'axios'

const requests = axios.create({
    baseURL: 'http://localhost:3004/',               
    // baseURL: 'http://101.201.178.207:3004/',
    timeout: 5000
})
requests.interceptors.request.use((config) => {
    return config
})
requests.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    return Promise.reject(err)
})
export default requests