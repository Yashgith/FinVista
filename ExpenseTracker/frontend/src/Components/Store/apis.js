import axios from 'axios'

axios.defaults.withCredentials = true
export default axios.create({
  baseURL: 'https://fin-vista-zeta.vercel.app'
})
