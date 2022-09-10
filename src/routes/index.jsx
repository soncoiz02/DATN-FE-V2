import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import ClientLayout from '../layouts/client/ClientLayout'
import Dashboard from '../pages/admin/dashboard'
import HomePage from '../pages/client/home'
import Store from '../pages/client/store'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path='store' element={<Store />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default Router
