import { Bookmark } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import userApis from '../../../../../api/user'
import useAuth from '../../../../../hook/useAuth'
import formatPrice from '../../../../../utils/formatPrice'

const OtherService = ({
  nextTimeSlot,
  date,
  currentServiceId,
  currentOtherService,
  currentOtherStaff,
  otherStaff,
  otherService,
  setOtherStaff,
  setOtherService,
}) => {
  const { userInfo } = useAuth()
  const [listServices, setListServices] = useState()

  const [staffInTimeSlot, setStaffInTimeSlot] = useState([])
  const [staffOptions, setStaffOptions] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const handleChangeService = (service) => {
    setIsLoading(true)
    setOtherStaff(null)
    handleGetStaff(service.id)
    handleGetStaffByServiceCategory(service.category)
    setOtherService(service)
  }

  const handleGetListServices = async () => {
    try {
      const data = await userApis.getStaffInTimeSlotAllService(userInfo.storeId, nextTimeSlot, date)
      const serviceOptions = data.map((item) => ({
        id: item._id,
        label: item.name,
        image: item.image,
        price: item.price,
        isDisable: item.isDisable,
        category: item.categoryId,
      }))
      setListServices(serviceOptions)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStaff = async (serviceId) => {
    try {
      const data = await userApis.getStaffInTimeSlot(nextTimeSlot, serviceId, date)
      setStaffInTimeSlot(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStaffByServiceCategory = async (categoryId) => {
    try {
      const data = await userApis.getStaffByServiceCategory(categoryId)
      const options = data.map((item) => ({
        id: item._id,
        label: item.name,
        image: item.avt,
      }))
      setStaffOptions(options)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListServices()
    if (currentOtherService) {
      handleGetStaff(currentOtherService._id)
      handleGetStaffByServiceCategory(currentOtherService.categoryId._id)
    }
  }, [nextTimeSlot])
  return (
    <Stack gap={2}>
      <Typography variant='h3'>Dịch vụ khác</Typography>
      <Grid container spacing={2}>
        {listServices && (
          <Grid item xs={12} sm={currentOtherStaff ? 6 : 12}>
            <Autocomplete
              options={listServices}
              value={otherService || null}
              onChange={(_, data) => handleChangeService(data)}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disablePortal
              getOptionDisabled={(option) => option.isDisable || option.id === currentServiceId}
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
                  {option.label} {option.price ? `- ${formatPrice(option.price)}` : null}
                  {currentOtherService && option.id === currentOtherService._id && (
                    <Bookmark color='warning' sx={{ ml: 'auto' }} />
                  )}
                </Box>
              )}
              renderInput={(params) => <TextField label='Dịch vụ' {...params} fullWidth />}
            />
          </Grid>
        )}
        {currentOtherStaff && staffOptions && (
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={staffOptions}
              value={otherStaff || null}
              onChange={(_, data) => setOtherStaff(data)}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disablePortal
              loading={isLoading}
              getOptionDisabled={(option) => staffInTimeSlot.includes(option.id)}
              renderOption={(props, option) => (
                <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <Avatar
                    loading='lazy'
                    variant='rounded'
                    sx={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      mr: 1,
                    }}
                    src={option.image}
                    srcSet={`${option.image} 2x`}
                    alt=''
                  />
                  {option.label}
                  {option.id === currentOtherStaff._id && (
                    <Bookmark color='warning' sx={{ ml: 'auto' }} />
                  )}
                </Box>
              )}
              renderInput={(params) => <TextField label='Nhân viên' {...params} fullWidth />}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  )
}

export default OtherService
