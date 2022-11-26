import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Authentication = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()
  if (!token) {
    return <Navigate to={'/auth/login'} state={{ from: location }} />
  }

  return children
}

export default Authentication
