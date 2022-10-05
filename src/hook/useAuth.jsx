import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState()

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

  useEffect(() => {
    if (cookies.token) setIsLogin(true)
    if (cookies.user) setUserInfo(cookies.user)
  }, [cookies])
  return { isLogin, userInfo, logout, login }
}

export default useAuth
