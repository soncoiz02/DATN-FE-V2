import React, { useState, useEffect } from 'react'
import { Avatar, Grid, Stack, Box, Typography, useTheme, styled } from '@mui/material'
import GlassBox from '../../../components/GlassBox'
import { useSearchParams } from 'react-router-dom'
import orderApi from '../../../api/order'
import { dateFormat } from '../../../utils/dateFormat'
import ModalInfo from './ModalInfo'

const ListService = () => {
  const theme = useTheme()
  const [openModal, setOpenModal] = useState(false)

  const [order, setOrder] = useState([])
  const [orderId, setOrderId] = useState()

  const getOrder = async () => {
    try {
      const data = await orderApi.getAll()
      setOrder(data)
    } catch (error) {
      console.log(error)
    }
  }

  const [searchParams] = useSearchParams({})

  const status = searchParams.get('status')

  const getServiceByStatus = async (type) => {
    try {
      const data = await orderApi.getByStatus(type)
      setOrder(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status) {
      getServiceByStatus(status)
    } else {
      getOrder()
    }
  }, [status])

  const renderDateFormated = (data) => {
    const date = new Date(data)
    const currentDate = new Date()
    const hours = date.getHours()
    const dateFormated = dateFormat(date)
    const dateLeft = currentDate.getDate() - date.getDate()
    if (dateLeft === -1) {
      return `${hours > 9 ? hours : '0' + hours}:00 - ngày mai`
    } else if (dateLeft === 0) {
      return `${hours > 9 ? hours : '0' + hours}:00 - hôm nay`
    } else if (dateLeft === 1) {
      return `${hours > 9 ? hours : '0' + hours}:00 - hôm qua`
    }

    return `${hours > 9 ? hours : '0' + hours}:00 - ${dateFormated}`
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, lg: 3 }}>
        {order.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
            <GlassBox
              onClick={() => {
                setOrderId(item._id)
                setOpenModal(true)
              }}
            >
              <Stack direction='row' justifyContent='space-start'>
                <Avatar
                  sx={{ height: '100', width: '100' }}
                  alt='Image-service'
                  src={item.serviceId.image}
                />
                <Stack
                  sx={{ ml: '10px' }}
                  direction='column'
                  justifyContent='center'
                  alignItems='flex-start'
                  spacing={0}
                >
                  <Typography variant='h3' color={theme.palette.text.secondary}>
                    {item.serviceId.name}
                  </Typography>
                </Stack>
              </Stack>
              <Box>
                <Typography variant='body1'>
                  Nhân viên: <PrimaryText>Trần Bảo Sơn</PrimaryText>
                </Typography>
                <Typography variant='body1'>
                  Cửa hàng: <PrimaryText>Spa Ánh Dương</PrimaryText>
                </Typography>
                <Typography variant='body1'>
                  Thời gian: <PrimaryText>{renderDateFormated(item.startDate)}1</PrimaryText>
                </Typography>
              </Box>
              <Stack direction='row' justifyContent='flex-end'>
                <Typography variant='body1' color={theme.palette.secondary.main}>
                  {item.status.name}
                </Typography>
              </Stack>
            </GlassBox>
          </Grid>
        ))}
      </Grid>
      {openModal && (
        <ModalInfo
          openModal={openModal}
          orderId={orderId}
          onCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  )
}

const PrimaryText = styled('span')(
  ({ theme }) => `
    font-weight: 700;
    color: ${theme.palette.primary.main}; 
`,
)

export default ListService
