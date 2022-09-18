import axiosClient from './axiosClient'

const serviceApi = {
  getAll() {
    return axiosClient.get('/service')
  },
  getOne(id) {
    return axiosClient.get(`/service/${id}`)
  },
  create(data) {
    return axiosClient.post('/service', data)
  },
  update(id, data) {
    return axiosClient.put(`/service/${id}`, data)
  },
  delete(id) {
    return axiosClient.delete('/service')
  },
  getRated(id) {
    return axiosClient.get(`/service-rated?serviceId=${id}`)
  },
  addRated(data) {
    return axiosClient.post('/service-rating', data)
  },
}

export default serviceApi
