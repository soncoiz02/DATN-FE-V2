import axiosClient from './axiosClient'

const statusId = {
  done: '632bc757dc2a7f68a3f383e9',
  cancel: '632bc765dc2a7f68a3f383eb',
  pending: '632bc736dc2a7f68a3f383e7',
}

const calendarApi = {
  getListOrder() {
    return axiosClient.get('/order')
  },
  getListStatus() {
    return axiosClient.get('/order-status')
  },
  updateOrderStatusToCancel(id) {
    return axiosClient.put(`/order/${id}`, { status: statusId.cancel })
  },
  updateOrderStatusToDone(id) {
    return axiosClient.put(`/order/${id}`, { status: statusId.done })
  },
  updateOrder(data, id) {
    return axiosClient.put(`/order/${id}`, data)
  },
}

export default calendarApi
