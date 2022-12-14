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
  changePassword(newPassword, token) {
    return axiosClient.put(
      '/change-password',
      { password: newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
  },
  getVerifyCode(email) {
    return axiosClient.post('/get-verify-code', email)
  },
}

export default userApis
