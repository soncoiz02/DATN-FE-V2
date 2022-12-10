import axiosClient from './axiosClient'
import queryString from 'query-string'

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
  getStaffPerPage(page, params) {
    return axiosClient.get(`/staff-per-page?page=${page}`, {
      ...(params && {
        params,
      }),
    })
  },
  createStaff(data) {
    return axiosClient.post('staff', data)
  },
  getAllStaff() {
    return axiosClient.get('/staff')
  },
  verifyEmail(email) {
    return axiosClient.post('/verify-email', email)
  },
  resetPassword(data) {
    return axiosClient.post('/reset-password', data)
  },
  getListUser(page) {
    return axiosClient.get('/admin-user', {
      params: {
        page,
      },
    })
  },
  getUserRevenue(userId) {
    return axiosClient.get('/user-revenue', {
      params: {
        userId,
      },
    })
  },
  getUserRated(userId) {
    return axiosClient.get('/user-rated-service', {
      params: {
        userId,
      },
    })
  },
}

export default userApis
