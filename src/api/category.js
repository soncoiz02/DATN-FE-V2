import axiosClient from './axiosClient'

const categoryApi = {
  getAll(key) {
    return axiosClient.get(`/category${key ? '?client=true' : ''}`)
  },
  getOne(id) {
    return axiosClient.get(`/category/${id}`)
  },
  getBySlug(slug) {
    return axiosClient.get(`/category-slug/${slug}`)
  },
  create(data) {
    return axiosClient.post('/category', data)
  },
  update(id, data) {
    return axiosClient.put(`/category/${id}`, data)
  },
  delete(id) {
    return axiosClient.delete(`/category/${id}`)
  },
  registerCategoryService(data) {
    return axiosClient.post('/category', data)
  },
  search(keyword) {
    return axiosClient.post(`/search-category?q=${keyword}`)
  },
}

export default categoryApi
