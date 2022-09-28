import { Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import VerticalSideBar from './VerticalSideBar'

const AdminLayout = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <Stack direction='row'>
      <VerticalSideBar openMenu={openMenu} onCloseMenu={() => setOpenMenu(false)} />
      <Stack sx={{ width: { xs: '100%', md: 'calc(100% - 300px)' } }}>
        <Header onOpenMenu={() => setOpenMenu(true)} />
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  )
}

export default AdminLayout
