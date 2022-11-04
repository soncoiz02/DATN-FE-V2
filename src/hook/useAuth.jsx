import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const logout = () => {
    removeCookie('token', { path: '/' })
    removeCookie('user', { path: '/' })
    setIsLogin(false)
    setUserInfo(null)
  }

  const login = (token, user) => {
    setCookie('token', token, { path: '/' })
    setCookie('user', user, { path: '/' })
  }

  const updateInfo = (info) => {
    setCookie('user', info, { path: '/' })
  }

  return {
    isLogin: !!cookies.token,
    userInfo: cookies.user,
    token: cookies.token,
    logout,
    login,
    updateInfo,
  }
}

export default useAuth
