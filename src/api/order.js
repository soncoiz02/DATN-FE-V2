import axiosClient from './axiosClient'

const orderApi = {
  getAll() {
    return axiosClient.get('/order')
  },
  getOne(id) {
    return axiosClient.get(`/order/${id}`)
  },
  getByStatus(type) {
    return axiosClient.get(`/filterByStatus?status=${type}`)
  },
}

export default orderApi
