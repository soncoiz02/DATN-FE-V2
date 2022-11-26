import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const CheckStaff = ({ children }) => {
  const { userInfo } = useAuth()
  const location = useLocation()
  if (userInfo.roleId.name === 'Staff') {
    return <Navigate to={'/admin/dashboard'} state={{ from: location }} />
  }

  return children
}

export default CheckStaff
