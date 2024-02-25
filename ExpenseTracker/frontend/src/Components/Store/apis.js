import axios from 'axios'

axios.defaults.withCredentials = true
export default axios.create({
  baseURL: 'https://finvista-2.onrender.com'
})
