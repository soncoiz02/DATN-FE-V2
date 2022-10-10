import axiosClient from './axiosClient'

const categoryApi = {
  getAll() {
    return axiosClient.get('/category')
  },
}

export default categoryApi
