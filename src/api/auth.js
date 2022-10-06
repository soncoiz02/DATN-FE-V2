import axiosClient from './axiosClient'

const authApi = {
  register(data) {
    return axiosClient.post('/register', data)
  },
  login(data) {
    return axiosClient.post('/login', data)
  },
}

export default authApi
