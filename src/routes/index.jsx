import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from '../components/Loading'
import Authentication from '../guards/Authentication'
import CheckAuth from '../guards/CheckAuth'
import CheckStaff from '../guards/CheckStaff'
import StaffForm from '../pages/admin/staff/StaffForm'
import RevenueStatistic from '../pages/admin/statistic/revenue'
import AboutPage from '../pages/client/about'
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
const HomePage = lazy(() => import('../pages/client/home'))
const ServiceRegister = lazy(() => import('../pages/client/service-register-history'))
const Store = lazy(() => import('../pages/client/store'))
const Accountinfo = lazy(() => import('../pages/user/Accountinfo'))
const Changepassword = lazy(() => import('../pages/user/Changepassword'))
const AccountSetting = lazy(() => import('../pages/user/index'))
const ServiceRated = lazy(() => import('../pages/admin/service/ServiceRated'))
const StaffManagement = lazy(() => import('../pages/admin/staff'))

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path='/'
          element={
            <CheckAuth>
              <ClientLayout />
            </CheckAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path='store' element={<Store />} />
          <Route path='about' element={<AboutPage />} />
          <Route
            path='account-setting'
            element={
              <Authentication>
                <AccountSetting />
              </Authentication>
            }
          >
            <Route path='account-info' element={<Accountinfo />} />
            <Route path='change-password' element={<Changepassword />} />
          </Route>
          <Route path='service'>
            <Route index element={<ServicePage />} />
            <Route path=':id' element={<DetailService />} />
          </Route>
          <Route
            path='service-register-history'
            element={
              <Authentication>
                <ServiceRegister />
              </Authentication>
            }
          />
        </Route>
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route
          path='/admin'
          element={
            <Authentication>
              <AdminLayout />
            </Authentication>
          }
        >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='services-statistic' element={<ServiceStatistic />} />
          <Route path='calendar-schedule' element={<CalendarManagement />} />
          <Route path='calendar-list' element={<CalendarList />} />
          <Route path='services-management'>
            <Route
              index
              element={
                <CheckStaff>
                  <ServiceList />
                </CheckStaff>
              }
            />
            <Route
              path='add'
              element={
                <CheckStaff>
                  <ServiceAdd />
                </CheckStaff>
              }
            />
            <Route
              path=':id/rated'
              element={
                <CheckStaff>
                  <ServiceRated />
                </CheckStaff>
              }
            />
            <Route
              path='edit/:id'
              element={
                <CheckStaff>
                  <ServiceUpdate />
                </CheckStaff>
              }
            />
          </Route>
          <Route
            path='category-management'
            element={
              <CheckStaff>
                <CategoryServices />
              </CheckStaff>
            }
          />
          <Route path='staff'>
            <Route
              index
              element={
                <CheckStaff>
                  <StaffManagement />
                </CheckStaff>
              }
            />
            <Route
              path='add'
              element={
                <CheckStaff>
                  <StaffForm />
                </CheckStaff>
              }
            />
            <Route
              path=':id/edit'
              element={
                <CheckStaff>
                  <StaffForm />
                </CheckStaff>
              }
            />
          </Route>
          <Route
            path='voucher-management'
            element={
              <CheckStaff>
                <Voucher />
              </CheckStaff>
            }
          />
          <Route path='statistic'>
            <Route
              index
              element={
                <CheckStaff>
                  <RevenueStatistic />
                </CheckStaff>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Router
