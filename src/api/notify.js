import axiosClient from './axiosClient'

const notifyApi = {
  getStoreNotify(storeId) {
    return axiosClient.get(`/store-notify?storeId=${storeId}`)
  },
  createNotify(data) {
    return axiosClient.post('/store-notify', data)
  },
}

export default notifyApi
