import axiosClient from './axiosClient'

const userApis = {
  getStoreStaff(storeId) {
    return axiosClient.get(`/store-staff/${storeId}`)
  },
  userUpdate(id, data) {
    return axiosClient.put(`/user/${id}`, data)
  },
}

export default userApis
