import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import ClientLayout from '../layouts/client/ClientLayout'
import CalendarList from '../pages/admin/calendar/CalendarList'
import CalendarManagement from '../pages/admin/calendar/CalendarSchedule'
import CategoryServices from '../pages/admin/category-services'
import Dashboard from '../pages/admin/dashboard'
import ServiceAdd from '../pages/admin/service/ServiceAdd'
import ServiceList from '../pages/admin/service/ServiceList'
import ServiceUpdate from '../pages/admin/service/ServiceUpdate'
import DetailService from '../pages/client/detail-service'
import DetailStore from '../pages/client/detail-store'
import HomePage from '../pages/client/home'
import Login from '../pages/auth/Login'
import Store from '../pages/client/store'
import TabInfo from '../sections/client/detail-store/TabsItem/TabInfo'
import TabPost from '../sections/client/detail-store/TabsItem/TabPost'
import TabServices from '../sections/client/detail-store/TabsItem/TabServices'
import TabRate from '../sections/client/detail-store/TabsItem/TabRate'
import AuthLayout from '../layouts/auth/AuthLayout'
import Register from '../pages/auth/Register'
import User from '../pages/user'
import Changepassword from '../pages/user/Changepassword'
import AccountSetting from '../pages/user/index'
import Accountinfo from '../pages/user/Accountinfo'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path='store' element={<Store />} />
        <Route path='account-setting' element={<AccountSetting />}>
          <Route path='account-info' element={<Accountinfo />} />
          <Route path='change-password' element={<Changepassword />} />
        </Route>
        <Route path='store/:id' element={<DetailStore />}>
          <Route path='info' element={<TabInfo />} />
          <Route path='services' element={<TabServices />} />
          <Route path='post' element={<TabPost />} />
          <Route path='rate' element={<TabRate />} />
        </Route>
        <Route path='service/:id' element={<DetailService />} />
      </Route>
      <Route path='auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='calendar-schedule' element={<CalendarManagement />} />
        <Route path='calendar-list' element={<CalendarList />} />
        <Route path='services-management' element={<ServiceList />} />
        <Route path='services-management/add' element={<ServiceAdd />} />
        <Route path='services-management/edit/:id' element={<ServiceUpdate />} />
        <Route path='category-management' element={<CategoryServices />} />
      </Route>
    </Routes>
  )
}

export default Router
