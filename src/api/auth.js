import axiosClient from './axiosClient'

const authApi = {
  login(data) {
    return axiosClient.post('/login', data)
  },
}

export default authApi
