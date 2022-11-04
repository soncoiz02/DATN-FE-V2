import axiosClient from './axiosClient'

const userApis = {
  listUser() {
    return axiosClient.get('/user')
  },
  getStoreStaff(storeId) {
    return axiosClient.get(`/store-staff/${storeId}`)
  },
  userUpdate(token, data) {
    return axiosClient.put(`/user`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  getStaffByServiceCategory(cateId) {
    return axiosClient.get(`/staffByCategory/${cateId}`)
  },
  getStaffInTimeSlot(timeSlot, serviceId, date) {
    return axiosClient.get(`/staffInTimeSlot/${serviceId}?timeSlot=${timeSlot}&date=${date}`)
  },
  getUserVoucher(token, storeId) {
    return axiosClient.get(`/getUserVoucher?storeId=${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  getStaffInTimeSlotAllService(storeId, timeStart, date) {
    return axiosClient.get(
      `/staffInTimeSlotAllService/${storeId}?timeStart=${timeStart}&date=${date}`,
    )
  },
}

export default userApis
