import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import calendarApi from '../../../api/calendar'
import MainButton from '../../../components/MainButton'
import { getFullList } from '../../../redux/slice/serviceRegisterSlice'
import ModalEditOrder from '../../../sections/admin/calendar/schedule/modal-form/ModalEditOrder'
import Calendar from '../../../sections/admin/calendar/schedule/Schedule'

const CalendarManagement = () => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const handleGetListOrder = async () => {
    try {
      const data = await calendarApi.getFutureOrder('633e5ddff1be5d928b97c813')
      const appointments = data.map((item) => {
        return {
          id: item._id,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          title: item.infoUser.name + ' - ' + item.infoUser.phone,
          status: item.status._id,
          service: item.service._id,
          staff: item.staff,
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
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Lịch đặt
        </Typography>
        <Typography variant='body1' color='primary'>
          Bảng lịch
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Bảng lịch
        </Typography>
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
