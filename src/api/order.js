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
  getUserOrder(token, page, status) {
    return axiosClient.get(`/get-user-order`, {
      params: {
        page,
        ...(status && {
          status,
        }),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getAdminUserOrder(page, userId) {
    return axiosClient.get(`/admin-get-user-order`, {
      params: {
        page,
        userId,
      },
    })
  },
  getOrderByService(serviceId) {
    return axiosClient.get(`/get-order-by-service?serviceId=${serviceId}`)
  },
}

export default orderApi
