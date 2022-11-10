import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from '../components/Loading'
import ServicePage from '../pages/client/service'

const AdminLayout = lazy(() => import('../layouts/admin/AdminLayout'))
const AuthLayout = lazy(() => import('../layouts/auth/AuthLayout'))
const ClientLayout = lazy(() => import('../layouts/client/ClientLayout'))
const CalendarList = lazy(() => import('../pages/admin/calendar/CalendarList'))
const CalendarManagement = lazy(() => import('../pages/admin/calendar/CalendarSchedule'))
const CategoryServices = lazy(() => import('../pages/admin/category-services'))
const Dashboard = lazy(() => import('../pages/admin/dashboard'))
const ServiceAdd = lazy(() => import('../pages/admin/service/ServiceAdd'))
const ServiceList = lazy(() => import('../pages/admin/service/ServiceList'))
const ServiceUpdate = lazy(() => import('../pages/admin/service/ServiceUpdate'))
const ServiceStatistic = lazy(() => import('../pages/admin/services-statistic'))
const Voucher = lazy(() => import('../pages/admin/voucher/VoucherList'))
const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const DetailService = lazy(() => import('../pages/client/detail-service'))
const DetailStore = lazy(() => import('../pages/client/detail-store'))
const HomePage = lazy(() => import('../pages/client/home'))
const ServiceRegister = lazy(() => import('../pages/client/service-register-history'))
const Store = lazy(() => import('../pages/client/store'))
const Accountinfo = lazy(() => import('../pages/user/Accountinfo'))
const Changepassword = lazy(() => import('../pages/user/Changepassword'))
const AccountSetting = lazy(() => import('../pages/user/index'))
const TabInfo = lazy(() => import('../sections/client/detail-store/TabsItem/TabInfo'))
const TabPost = lazy(() => import('../sections/client/detail-store/TabsItem/TabPost'))
const TabRate = lazy(() => import('../sections/client/detail-store/TabsItem/TabRate'))
const TabServices = lazy(() => import('../sections/client/detail-store/TabsItem/TabServices'))

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path='store' element={<Store />} />
          <Route path='account-setting' element={<AccountSetting />}>
            <Route path='account-info' element={<Accountinfo />} />
            <Route path='change-password' element={<Changepassword />} />
          </Route>
          <Route path='service'>
            <Route index element={<ServicePage />} />
            <Route path=':id' element={<DetailService />} />
          </Route>
          <Route path='service-register-history' element={<ServiceRegister />} />
        </Route>
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='services-statistic' element={<ServiceStatistic />} />
          <Route path='calendar-schedule' element={<CalendarManagement />} />
          <Route path='calendar-list' element={<CalendarList />} />
          <Route path='services-management' element={<ServiceList />} />
          <Route path='services-management/add' element={<ServiceAdd />} />
          <Route path='services-management/edit/:id' element={<ServiceUpdate />} />
          <Route path='category-management' element={<CategoryServices />} />
          <Route path='voucher-management' element={<Voucher />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Router
