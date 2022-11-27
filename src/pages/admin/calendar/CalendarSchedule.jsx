import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import calendarApi from '../../../api/calendar'
import MainButton from '../../../components/MainButton'
import useAuth from '../../../hook/useAuth'
import { getFullList } from '../../../redux/slice/serviceRegisterSlice'
import ModalEditOrder from '../../../sections/admin/calendar/schedule/modal-form/ModalEditOrder'
import Calendar from '../../../sections/admin/calendar/schedule/Schedule'

const CalendarManagement = () => {
  const { userInfo } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const handleGetListOrder = async () => {
    try {
      const data = await calendarApi.getFutureOrder(userInfo.storeId)
      const appointments = data.map((item) => {
        return {
          id: item._id,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          title: item.infoUser.name + ' - ' + item.infoUser.phone,
          status: item.status._id,
          servicesRegistered: item.servicesRegistered,
          customer: item.userId,
        }
      })
      dispatch(getFullList(appointments))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link
          underline='none'
          color='text.primaryChannel'
          component={RouterLink}
          to='/admin/dashboard'
        >
          Dashboard
        </Link>
        <Typography variant='body1' color='text.primaryChannel'>
          Lịch đặt
        </Typography>
        <Typography variant='body1' color='primary'>
          Bảng lịch
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2'>Bảng lịch</Typography>
        <MainButton
          colorType='primary'
          sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}
          onClick={() => setOpenModal(true)}
        >
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <Calendar onOpenModal={() => setOpenModal(true)} />
      {openModal && (
        <ModalEditOrder
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          getListOrder={handleGetListOrder}
        />
      )}
    </Stack>
  )
}

export default CalendarManagement
