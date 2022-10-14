import axiosClient from './axiosClient'

const orderStatusApi = {
  getAll() {
    return axiosClient.get('/order-status')
  },
}

export default orderStatusApi
