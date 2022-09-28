import { Edit, Star } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  Rating,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import React, { useState } from 'react'
import { useEffect } from 'react'
import serviceApi from '../../../api/service'
import ListStar from '../../../components/ListStar'
import ModalRated from '../../../components/ModalRated'
import calculateDayLeft from '../../../utils/calculateDayLeft'

const RatedTab = ({ index, value, serviceId, ...other }) => {
  const [openModal, setOpenModal] = useState(false)
  const [serviceRated, setServiceRated] = useState()

  const handleGetServiceRated = async (id) => {
    try {
      const data = await serviceApi.getRated(id)
      setServiceRated(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (serviceId) handleGetServiceRated(serviceId)
  }, [serviceId])

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
                      <PrimaryColorText>{serviceRated.avgRated}</PrimaryColorText>
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
                  >
                    Đánh giá của bạn
                  </CustomOutlineButton>
                </Stack>
              </Stack>
              <List sx={{ width: '100%' }}>
                <Stack gap={3}>
                  {serviceRated.list.map((item) => (
                    <Stack direction='row' gap={3} key={item._id}>
                      <ListItemAvatar>
                        <Avatar sx={{ width: '50px', height: '50px' }} />
                      </ListItemAvatar>
                      <Stack gap={1}>
                        <Stack gap={1} direction='row' alignItems='center'>
                          <Rating value={item.rate} readOnly />
                          <Typography variant='body2'>
                            {calculateDayLeft(item.createdAt)}
                          </Typography>
                        </Stack>
                        <Typography variant='body1'>{item.content}</Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </List>
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

const CustomProgress = styled(LinearProgress)({
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
