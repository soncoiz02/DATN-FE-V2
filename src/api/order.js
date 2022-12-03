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
}

export default orderApi
