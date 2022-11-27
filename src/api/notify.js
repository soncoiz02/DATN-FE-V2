import axiosClient from './axiosClient'

const notifyApi = {
  getStoreNotify(storeId, page) {
    return axiosClient.get(`/store-notify?storeId=${storeId}&page=${page}`)
  },
  createNotify(data) {
    return axiosClient.post('/store-notify', data)
  },
  getStaffNotify(token, page) {
    return axiosClient.get(`/staff-notify?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getUserNotify(token, page) {
    return axiosClient.get(`/user-notify?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default notifyApi
