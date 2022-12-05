import axiosClient from './axiosClient'

const serviceApi = {
  getAll() {
    return axiosClient.get('/service')
  },
  getOne(id) {
    return axiosClient.get(`/service/${id}`)
  },
  getBySlug(slug) {
    return axiosClient.get(`/service-slug/${slug}`)
  },
  create(data) {
    return axiosClient.post('/service', data)
  },
  update(id, data) {
    return axiosClient.put(`/service/${id}`, data)
  },
  delete(id) {
    return axiosClient.delete(`/service/${id}`)
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
    return axiosClient.get(`/service-by-cate?cateSlug=${cateId}`)
  },
  getBestRated() {
    return axiosClient.get('/service-rating-best')
  },
  getUserRated(token, serviceId) {
    return axiosClient.get(`user-rated?serviceId=${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getServiceUsedByUser(token, serviceId) {
    return axiosClient.get(`service-used-by-user?serviceId=${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getServicePerPage(page) {
    return axiosClient.get(`services?page=${page}`)
  },
  getServiceRatedPerPage(page, serviceId) {
    return axiosClient.get(`service-rated-per-page/${serviceId}?page=${page}`)
  },
}

export default serviceApi
