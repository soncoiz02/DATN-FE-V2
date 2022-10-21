import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import serviceApi from '../../../../../api/service'
import MainButton from '../../../../../components/MainButton'
import { convertNumberToHour } from '../../../../../utils/dateFormat'

const ChooseTimeSlot = ({
  checkedData,
  setCheckedData,
  serviceDetail,
  currentDate,
  timeSlot,
  orderData,
}) => {
  console.log({ checkedData, setCheckedData, serviceDetail, currentDate, timeSlot, orderData })
  const [checkedIndex, setCheckedIndex] = useState(-1)
  const [timeSlotCheckByStaff, setTimeSlotCheckByStaff] = useState([])
  const [userServiceRegisteredTime, setUserServiceRegisteredTime] = useState()

  const isChecked = (index) => {
    return checkedIndex === index
  }

  const checkTimeSlotByStaff = (index) => {
    return timeSlotCheckByStaff[index]
  }

  const handleDisableByUser = (time) => {
    if (userServiceRegisteredTime.length === 0) return false
    let isDisable = false
    const hourDuration = (serviceDetail.duration + 60) / 60
    userServiceRegisteredTime.forEach((item) => {
      if (
        (time <= item.end && item.end - time <= hourDuration) ||
        (time + hourDuration >= item.start && time + hourDuration - item.start <= hourDuration)
      )
        isDisable = true
    })
    return isDisable
  }

  const handleDisableByCurrentTime = (time) => {
    const today = new Date()
    if (new Date(currentDate).getDate() === today.getDate()) {
      const hourNumber = today.getHours()
      const minuteNumber = today.getMinutes() / 60
      const currentTime = hourNumber + minuteNumber

      if (currentTime > time) return true
      return false
    }
    return false
  }

  const handleGetTimeSlotCheckByStaff = async (date) => {
    try {
      const categoryId = serviceDetail.categoryId
      const serviceId = serviceDetail.id
      const data = await serviceApi.getTimeSlotCheckByStaff(categoryId, serviceId, date)
      console.log(data)
      setTimeSlotCheckByStaff(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetRegisteredServiceByUser = async (userPhone, date) => {
    try {
      const data = await serviceApi.getRegisteredServiceByUserAndDate(userPhone, date.toISOString())
      console.log(data)
      setUserServiceRegisteredTime(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetTimeSlotCheckByStaff(currentDate)
    if (orderData.id) handleGetRegisteredServiceByUser(orderData.phone, orderData.startDate)
  }, [])

  return (
    <Stack gap={2}>
      <Typography variant='h3'>Khung giờ</Typography>
      <Stack direction='row' gap={{ xs: 2, md: 4 }} flexWrap='wrap'>
        {timeSlot.map((time, index) => (
          <Box key={index}>
            <input
              hidden
              type='radio'
              name='time'
              id={`time-range-${index}`}
              value={time}
              onChange={() => {
                setCheckedIndex(index)
                setCheckedData(time)
              }}
            />
            <MainButton
              sx={{
                border: isChecked(index) ? 'none' : '1px solid #e3e3e3',
                padding: '10px 25px',
              }}
              colorType={isChecked(index) || time === checkedData ? 'primary' : 'neutral'}
              component='label'
              htmlFor={`time-range-${index}`}
              disabled={
                checkTimeSlotByStaff(index) ||
                handleDisableByCurrentTime(time) ||
                handleDisableByUser(time)
              }
            >
              <Typography variant='body1'>{convertNumberToHour(time, 'formatTime')}</Typography>
            </MainButton>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}

export default ChooseTimeSlot
