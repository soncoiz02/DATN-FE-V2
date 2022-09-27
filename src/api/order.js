import axiosClient from './axiosClient'

const orderApi = {
  getAll() {
    return axiosClient.get('/order')
  },

  getByStatus(type) {
    return axiosClient.get(`/filterByStatus?status=${type}`)
  },
}

export default orderApi
