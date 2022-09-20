import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import ClientLayout from '../layouts/client/ClientLayout'
import Dashboard from '../pages/admin/dashboard'
import DetailService from '../pages/client/detail-service'
import HomePage from '../pages/client/home'
import ServiceRegister from '../pages/client/service-register-history'
import Store from '../pages/client/store'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path='store' element={<Store />} />
        <Route path='service/:id' element={<DetailService />} />
        <Route path='service-register-history' element={<ServiceRegister />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default Router
