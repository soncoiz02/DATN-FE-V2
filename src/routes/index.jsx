import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import ClientLayout from '../layouts/client/ClientLayout'
import CalendarManagement from '../pages/admin/calendar'
import Dashboard from '../pages/admin/dashboard'
import DetailService from '../pages/client/detail-service'
import DetailStore from '../pages/client/detail-store'
import HomePage from '../pages/client/home'
import Store from '../pages/client/store'
import TabInfo from '../sections/client/detail-store/TabsItem/TabInfo'
import TabPost from '../sections/client/detail-store/TabsItem/TabPost'
import TabServices from '../sections/client/detail-store/TabsItem/TabServices'
import TabRate from '../sections/client/detail-store/TabsItem/TabRate'
import StoreTabs from '../sections/client/detail-store/StoreTabs'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path='store' element={<Store />} />
        <Route path='store/:id' element={<DetailStore />}>
          <Route path='info' element={<TabInfo />} />
          <Route path='services' element={<TabServices />} />
          <Route path='post' element={<TabPost />} />
          <Route path='rate' element={<TabRate />} />
        </Route>
        <Route path='service/:id' element={<DetailService />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='calendar' element={<CalendarManagement />} />
      </Route>
    </Routes>
  )
}

export default Router
