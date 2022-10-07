import axiosClient from './axiosClient'

const userApis = {
  getStoreStaff(storeId) {
    return axiosClient.get(`/store-staff/${storeId}`)
  },
}

export default userApis
