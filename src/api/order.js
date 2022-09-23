import axiosClient from './axiosClient'

const orderApi = {
  getAll() {
    return axiosClient.get('/order')
  },
}

export default orderApi
