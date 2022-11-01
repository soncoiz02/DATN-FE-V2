import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Stack, Typography, Breadcrumbs, Link } from '@mui/material'
import VoucherTable from '../../../sections/admin/voucher/VoucherTable'

const Voucher = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Voucher
        </Typography>
        <Typography variant='body1' color='primary'>
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách Voucher
        </Typography>
      </Stack>
      <VoucherTable />
    </Stack>
  )
}

export default Voucher
