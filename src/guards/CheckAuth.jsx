import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const CheckAuth = ({ children }) => {
  const { token, userInfo } = useAuth()
  const location = useLocation()
  if (token && (userInfo.roleId.name === 'Admin' || userInfo.roleId.name === 'Staff')) {
    return <Navigate to={'/admin/dashboard'} state={{ from: location }} />
  }

  return children
}

export default CheckAuth
