import axiosClient from './axiosClient'
import queryString from 'query-string'

export const statusId = {
  done: '632bc757dc2a7f68a3f383e9',
  cancel: '632bc765dc2a7f68a3f383eb',
  pending: '632bc736dc2a7f68a3f383e7',
  accepted: '632bc784dc2a7f68a3f383ed',
  doing: '63561be0a20abb23c688724e',
  paid: '634e59b757b7ea792917962c',
}

const calendarApi = {
  getListOrder(params) {
    const queryParam = queryString.stringify(params)
    return axiosClient.get(`/filter-order?${queryParam}`)
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
  updateOrderStatusToAccepted(id) {
    return axiosClient.put(`/order/${id}`, { status: statusId.accepted })
  },
  updateOrder(data, id) {
    return axiosClient.put(`/order/${id}`, data)
  },
  getDetailOrder(id) {
    return axiosClient.get(`/order/${id}`)
  },
  getFutureOrder(params) {
    return axiosClient.get(`/getFutureOrder${params ? `?${queryString.stringify(params)}` : ''}`)
  },
  addUpdateActivity(data) {
    return axiosClient.post('/activityLog', data)
  },
  createBill(data) {
    return axiosClient.post('/bill', data)
  },
  changeStatus(orderId, statusType) {
    return axiosClient.put(`/order/${orderId}`, { status: statusId[statusType] })
  },
}

export default calendarApi
