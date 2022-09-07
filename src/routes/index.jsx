import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ClientLayout from '../layouts/client/ClientLayout'
import HomePage from '../pages/client/home'
import Store from '../pages/client/store'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path='store' element={<Store />} />
      </Route>
    </Routes>
  )
}

export default Router
