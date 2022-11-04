import { Box, Container, styled, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import GlassBox from '../../components/GlassBox'

const User = () => {
  const [tabValue, setTabValue] = useState(0)
  return (
    <Container>
      <GlassBox opacity={0.8} mt={4}>
        <CustomTab value={tabValue} onChange={(e, value) => setTabValue(value)}>
          <Tab
            label='Thông tin tài khoản'
            id='tab-0'
            aria-controls='tab-panel-0'
            component={Link}
            to='/account-setting/account-info'
          />
          <Tab
            label='Đổi mật khẩu'
            id='tab-1'
            aria-controls='tab-panel-1'
            component={Link}
            to='/account-setting/change-password'
          />
        </CustomTab>
        <Outlet />
      </GlassBox>
    </Container>
  )
}

const CustomTab = styled(Tabs)(({ theme }) => ({
  '.MuiButtonBase-root': {
    borderRadius: '10px 10px 0px 0px',
    transition: '0.3s',
    '&.Mui-selected': {
      color: 'white',
    },
  },
  '.MuiTabs-indicator': {
    height: '100%',
    borderRadius: '10px 10px 0px 0px',
    zIndex: -1,
  },
}))

export default User
