import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import ClientLayout from '../layouts/client/ClientLayout'
import CalendarList from '../pages/admin/calendar/CalendarList'
import CalendarManagement from '../pages/admin/calendar/CalendarSchedule'
import Dashboard from '../pages/admin/dashboard'
import ServiceAdd from '../pages/admin/service/ServiceAdd'
import ServiceList from '../pages/admin/service/ServiceList'
import DetailService from '../pages/client/detail-service'
import DetailStore from '../pages/client/detail-store'
import HomePage from '../pages/client/home'
import Store from '../pages/client/store'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path='store' element={<Store />} />
        <Route path='store/:id' element={<DetailStore />} />
        <Route path='service/:id' element={<DetailService />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='calendar-schedule' element={<CalendarManagement />} />
        <Route path='calendar-list' element={<CalendarList />} />
        <Route path='services-management' element={<ServiceList />} />
        <Route path='services-management/add' element={<ServiceAdd />} />
      </Route>
    </Routes>
  )
}

export default Router
