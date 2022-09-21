import axiosClient from './axiosClient'

const storeApi = {
  getAll() {
    return axiosClient.get('/store')
  },
}

export default storeApi
