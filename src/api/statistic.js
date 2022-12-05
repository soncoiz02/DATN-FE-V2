import axiosClient from './axiosClient'

const statisticApi = {
  getBestStatistic() {
    return axiosClient.get('get-best-statistic')
  },
  getStatisticByDate(dateStart, dateEnd, category) {
    return axiosClient.get('get-statistic-by-date', {
      params: {
        dateStart,
        dateEnd,
        category,
      },
    })
  },
  getStatisticByMonth(year, category) {
    return axiosClient.get('get-statistic-by-month', {
      params: {
        year,
        category,
      },
    })
  },
  getServiceRevenue() {
    return axiosClient.get('get-service-revenue')
  },
  getRevenueByDate(start, end) {
    return axiosClient.get(`get-revenue-by-date?dateEnd=${end}&dateStart=${start}`)
  },
  getRevenueByMonth(year) {
    return axiosClient.get(`get-revenue-by-month?year=${year}`)
  },
  getDashboardStatistic() {
    return axiosClient.get(`get-dashboard-statistic`)
  },
}

export default statisticApi
