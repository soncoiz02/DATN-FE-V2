import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import userApis from '../../../../../api/user'

const AssignStaff = ({ staffValue, setStaffValue, categoryId, timeSlot, date, serviceId }) => {
  const [staffOptions, setStaffOptions] = useState()
  const [staffInTimeSlot, setStaffInTimeSlot] = useState()

  const handleGetStaffByServiceCategory = async (categoryId) => {
    try {
      const data = await userApis.getStaffByServiceCategory(categoryId)
      const options = data.map((item) => ({
        id: item.staff._id,
        label: item.staff.name,
        image: item.staff.avt,
      }))
      setStaffOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStaffInTimeSlot = async (timeSlot, serviceId, date) => {
    try {
      const data = await userApis.getStaffInTimeSlot(timeSlot, serviceId, date)
      setStaffInTimeSlot(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetStaffByServiceCategory(categoryId)
    if (timeSlot) handleGetStaffInTimeSlot(timeSlot, serviceId, date)
  }, [timeSlot])

  return (
    <Stack gap={2}>
      <Typography variant='h3'>Nhân viên</Typography>
      {staffOptions && (
        <Autocomplete
          value={staffValue}
          onChange={(_, data) => setStaffValue(data)}
          options={staffOptions}
          disablePortal
          getOptionLabel={(option) => option.label}
          getOptionDisabled={(option) => staffInTimeSlot.includes(option.id)}
          renderOption={(props, option) => (
            <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading='lazy'
                height='50'
                width='50'
                src={option.image}
                srcSet={`${option.image} 2x`}
                alt=''
              />
              {option.label}
            </Box>
          )}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Nhân viên' />}
        />
      )}
    </Stack>
  )
}

export default AssignStaff
