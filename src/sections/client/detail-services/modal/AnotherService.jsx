import { Search } from '@mui/icons-material'
import { Avatar, InputAdornment, ListItem, Stack, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import userApis from '../../../../api/user'
import GlassBox from '../../../../components/GlassBox'
import formatPrice from '../../../../utils/formatPrice'
import { CustomInput } from './ModalVoucher'

const AnotherService = ({
  storeId,
  getAnotherServiceInfo,
  closePopup,
  nextTimeSlot,
  date,
  currentService,
  currentTimeSlot,
}) => {
  const [listServices, setListServices] = useState()

  const handleGetListServices = async () => {
    try {
      const data = await userApis.getStaffInTimeSlotAllService(storeId, nextTimeSlot, date)
      setListServices(data.filter((item) => item.status))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDisable = (isDisable, serviceId, serviceDuration) => {
    console.log(currentTimeSlot + (serviceDuration + 15) / 60)
    return (
      isDisable ||
      serviceId === currentService._id ||
      currentTimeSlot + (serviceDuration + 15) / 60 > 22
    )
  }

  useEffect(() => {
    handleGetListServices()
  }, [])

  return (
    <GlassBox
      opacity={0.9}
      sx={{ width: { md: '600px', xs: '95%' }, p: { md: '15px', xs: '10px' } }}
    >
      <Stack gap={2}>
        <CustomInput
          placeholder='Tìm dịch vụ'
          endAdornment={
            <InputAdornment position='end'>
              <Search />
            </InputAdornment>
          }
        />
        <Stack
          gap={{ md: 2, sx: 1 }}
          sx={{ maxHeight: '400px', minHeight: '200px', overflowY: 'auto' }}
        >
          {listServices &&
            listServices.map((service) => (
              <CustomListItem
                disabled={handleDisable(service.isDisable, service._id, service.duration)}
                key={service._id}
                onClick={() => {
                  getAnotherServiceInfo(service)
                  closePopup()
                }}
              >
                <Stack direction='row' gap={2}>
                  <Avatar
                    variant='rounded'
                    src={service.image}
                    sx={{ width: { md: '80px', xs: '50px' }, height: { md: '80px', xs: '50px' } }}
                  />
                  <Stack gap={0.5}>
                    <Typography variant='h3'>{service.name}</Typography>
                    <Typography variant='h4' color='primary'>
                      {formatPrice(service.price)}
                    </Typography>
                    <Typography variant='body1'>Thời gian: {service.duration} phút</Typography>
                  </Stack>
                </Stack>
              </CustomListItem>
            ))}
        </Stack>
      </Stack>
    </GlassBox>
  )
}

const CustomListItem = styled(ListItem)`
  cursor: pointer;
  transition: 0.3s;
  border-radius: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

export default AnotherService
