import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import MobileMenu from './MobileMenu'
import Toastify from '../../components/Toastify'

const ClientLayout = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false)
  return (
    <>
      <Stack>
        <Header openMenu={() => setOpenMenuMobile(true)} />
        {openMenuMobile && (
          <MobileMenu openMenu={openMenuMobile} closeMenu={() => setOpenMenuMobile(false)} />
        )}
        <Box sx={{ marginTop: '60px' }}>
          <Outlet />
        </Box>
        <Toastify />
      </Stack>
      <Footer />
    </>
  )
}

export default ClientLayout
