import axiosClient from './axiosClient'

const calendarApi = {
  getListOrderConfirmed() {
    return axiosClient.get('/order')
  },
  updateOrderStatus(id, status) {
    return axiosClient.patch(`/order/${id}`, { orderStatus: status })
  },
}

export default calendarApi
