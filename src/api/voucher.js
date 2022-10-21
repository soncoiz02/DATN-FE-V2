import axiosClient from './axiosClient'

const voucherApi = {
  getAll() {
    return axiosClient.get('/voucher')
  },
  getOne(id) {
    return axiosClient.get(`/voucher/${id}`)
  },
  create(data) {
    return axiosClient.post('/voucher', data)
  },
  update(id, data) {
    return axiosClient.put(`/voucher/${id}`, data)
  },
  delete(id) {
    return axiosClient.delete(`/voucher/${id}`)
  },
  registerCategoryService(data) {
    return axiosClient.post('/voucher', data)
  },
}

export default voucherApi
