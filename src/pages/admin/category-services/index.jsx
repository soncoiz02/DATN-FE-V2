import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Stack, Typography, Breadcrumbs, Link } from '@mui/material'
import MainButton from '../../../components/MainButton'
import ModalRegisterForm from '../../../sections/admin/categoryService/ModalRegisterForm'
import CategoryServicesTable from '../../../sections/admin/categoryService/CategoryServiceTable'

const CategoryServices = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Danh mục dịch vụ
        </Typography>
        <Typography variant='body1' color='primary'>
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách Danh mục dịch vụ
        </Typography>
        <MainButton
          colorType='primary'
          sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}
          onClick={() => setOpenModal(true)}
        >
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <CategoryServicesTable onOpenModal={() => setOpenModal(true)} />
      <ModalRegisterForm openModal={openModal} onCloseModal={() => setOpenModal(false)} />
    </Stack>
  )
}

export default CategoryServices