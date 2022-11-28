import { Edit, Star } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  LinearProgress,
  List,
  ListItemAvatar,
  Rating,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import serviceApi from '../../../api/service'
import MainButton from '../../../components/MainButton'
import ModalRated from '../../../components/ModalRated'
import useAuth from '../../../hook/useAuth'
import calculateDayLeft from '../../../utils/calculateDayLeft'
import getSocket from '../../../utils/socket'

const socket = getSocket()

const RatedTab = ({ index, value, serviceId, ...other }) => {
  const { token } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const [serviceRated, setServiceRated] = useState()
  const [userRated, setUserRated] = useState(false)
  const [haveUsedService, setHaveUsedService] = useState(false)
  const [page, setPage] = useState(1)
  const [listRated, setListRated] = useState([])

  const handleGetServiceRated = async (id, page) => {
    try {
      const data = await serviceApi.getServiceRatedPerPage(page, id)
      setServiceRated({
        total: data.total,
        avg: data.avg,
        detailRated: data.detailRated,
      })
      setListRated([...listRated, ...data.listRated])
    } catch (error) {
      console.log(error)
    }
  }

  const getUserRated = async () => {
    try {
      const data = await serviceApi.getUserRated(token, serviceId)
      setUserRated(data.haveRated)
    } catch (error) {
      console.log(error)
    }
  }

  const getServiceUsedByUser = async () => {
    try {
      const data = await serviceApi.getServiceUsedByUser(token, serviceId)
      setHaveUsedService(data.haveUsedService)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      getUserRated()
      getServiceUsedByUser()
    }
  }, [])

  useEffect(() => {
    if (serviceId) handleGetServiceRated(serviceId, page)
  }, [serviceId, page])

  useEffect(() => {
    socket.on('receive-new-rated', () => {
      handleGetServiceRated(serviceId, page)
      if (token) {
        getUserRated()
        getServiceUsedByUser()
      }
    })
  }, [socket])

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box>
        <Stack gap={4}>
          {serviceRated && (
            <>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems='center'
                justifyContent='center'
                gap={{ xs: 1, md: 6 }}
              >
                <Stack
                  sx={{ height: '100%', width: { xs: '100%', md: 'calc(100% / 3)' } }}
                  gap={1}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Typography variant='body1'>Đánh giá trung bình</Typography>
                  <Stack direction='row' gap={1} alignItems='center'>
                    <Stack direction='row' alignItems='center'>
                      <PrimaryColorText>{+serviceRated.avg.toFixed(1)}</PrimaryColorText>
                      <Typography variant='subtitile1'>/5.0</Typography>
                    </Stack>
                    <Star sx={{ color: yellow[600], fontSize: '30px' }} />
                  </Stack>
                  <Typography
                    variant='body1'
                    sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                  >
                    Tổng <PrimaryColorText>{serviceRated.total}</PrimaryColorText> đánh giá
                  </Typography>
                </Stack>
                <Divider orientation='vertical' variant='middle' flexItem />
                <Stack gap={2} sx={{ width: { xs: '100%', md: 'calc(100% / 3)' } }}>
                  {serviceRated.detailRated.map((info) => (
                    <Stack direction='row' gap={1.5} alignItems='center' key={info.star}>
                      <Stack direction='row' alignItems='center'>
                        <Typography variant='subtitile1'>{info.star}</Typography>
                        <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                      </Stack>
                      <Box sx={{ width: '100%' }}>
                        <CustomProgress variant='determinate' value={info.count * 10} />
                      </Box>
                      <Typography variant='subtitile1'>{info.count}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Divider orientation='vertical' variant='middle' flexItem />
                <Stack
                  sx={{ height: '100%', width: { xs: '100%', md: 'calc(100% / 3)' } }}
                  justifyContent='center'
                  alignItems='center'
                >
                  <CustomOutlineButton
                    startIcon={<Edit />}
                    variant='outlined'
                    onClick={() => setOpenModal(true)}
                    disabled={userRated || !haveUsedService || !token}
                  >
                    Đánh giá của bạn
                  </CustomOutlineButton>
                </Stack>
              </Stack>
              <List sx={{ width: '100%' }}>
                <Stack gap={3}>
                  {listRated?.map((item) => (
                    <Stack direction='row' gap={3} key={item._id}>
                      <ListItemAvatar>
                        <Avatar src={item.userId.avt} sx={{ width: '50px', height: '50px' }} />
                      </ListItemAvatar>
                      <Stack gap={0.5}>
                        <Stack gap={1} direction='row' alignItems='center'>
                          <Typography variant='h3'>{item.userId.name}</Typography>
                          |
                          <Rating value={item.rate} readOnly />
                          <Typography variant='body2'>
                            {calculateDayLeft(item.createdAt)}
                          </Typography>
                        </Stack>
                        <Typography variant='body2'>{item.content}</Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </List>
              {listRated?.length < serviceRated.total && (
                <MainButton
                  onClick={() => setPage(page + 1)}
                  sx={{ alignSelf: 'center', px: 3 }}
                  colorType='primary'
                >
                  Xem thêm
                </MainButton>
              )}
            </>
          )}
        </Stack>
        <ModalRated openModal={openModal} onCloseModal={() => setOpenModal(false)} />
      </Box>
    </div>
  )
}

const PrimaryColorText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '24px',
  fontWeight: 700,
  '@media screen and (max-width: 767px)': {
    fontSize: '20px',
  },
}))

export const CustomProgress = styled(LinearProgress)({
  height: '8px',
  borderRadius: '50px',
  '.MuiLinearProgress-bar': {
    borderRadius: '50px',
  },
})

const CustomOutlineButton = styled(Button)(({ theme }) => ({
  padding: '15px 45px',
  textAlign: 'center',
  borderRadius: '10px',
  '.MuiButton-startIcon>*:nth-of-type(1)': {
    fontSize: '24px',
  },
}))

export default RatedTab
