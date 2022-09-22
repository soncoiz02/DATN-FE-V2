import axiosClient from './axiosClient'

const storeApi = {
  getAll() {
    return axiosClient.get(`/store`)
  },
  getOne(id) {
    return axiosClient.get(`/store/${id}`)
  },
  create(data) {
    return axiosClient.post(`/store`, data)
  },
  update(id, data) {
    return axiosClient.put(`/store/${id}`, data)
  },
  remove(id) {
    return axiosClient.delete(`/store/${id}`)
  },
  search(keyword) {
    return axiosClient.get(`/store/search?name=${keyword}`)
  },
}

export default storeApi
