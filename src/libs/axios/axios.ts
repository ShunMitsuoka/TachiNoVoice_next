import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: false
})

export default axios