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
  registerService(data) {
    return axiosClient.post('/order', data)
  },
  getByStore(id) {
    return axiosClient.get(`/service/findByStoreId/${id}`)
  },
  getRegisteredService(id) {
    return axiosClient.get(`/order/${id}`)
  },
  getTotalRegisterInADay(serviceId, date) {
    return axiosClient.get(`/getOrderByDate?service=${serviceId}&date=${date}`)
  },
  getRegisteredServiceByUserAndDate(userPhone, date) {
    return axiosClient.get(`/getOrderByUserAndDate?date=${date}&userPhone=${userPhone}`)
  },
  getTimeSlotCheckByStaff(serviceId, date) {
    return axiosClient.get(`/getOrderByStaffCategory?serviceId=${serviceId}&date=${date}`)
  },
  getByCate(cateId) {
    return axiosClient.get(`/service-by-cate?cateId=${cateId}`)
  },
}

export default serviceApi
