import {
  Cancel,
  CheckCircle,
  CreditScore,
  Delete,
  Done,
  DoubleArrow,
  HourglassBottom,
  Workspaces,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Popper,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import calendarApi from '../../../api/calendar'
import orderApi from '../../../api/order'
import GlassBox from '../../../components/GlassBox'
import UserOrder from '../../../components/UserOrder'
import useAuth from '../../../hook/useAuth'
import { getStatusColor } from '../../../utils/aboutColor'
import { dateFormat } from '../../../utils/dateFormat'

const ListService = () => {
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [totalOrder, setTotalOrder] = useState(0)
  const [listStatus, setListStatus] = useState([])

  const [anchorEl, setAnchorEl] = useState(null)
  const openPopper = Boolean(anchorEl)

  const handleOpenPopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const navigate = useNavigate()
  const page = searchParams.get('page')
  const statusType = searchParams.get('status')

  const { userInfo, token } = useAuth()

  const getOrder = async (page, statusType) => {
    try {
      let status = null
      if (statusType) {
        status = listStatus.find((item) => item.type === statusType)._id
      }
      const data = await orderApi.getUserOrder(token, page, status)
      setOrder(data.data)
      setTotalOrder(Math.ceil(data.total / data.limit))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePage = (event, value) => {
    navigate(`/service-register-history?page=${value}${statusType ? `&status=${statusType}` : ''}`)
    setLoading(true)
    window.scrollTo(0, 0)
  }

  const handleGetStatus = async () => {
    try {
      const listIcon = [
        <HourglassBottom color='warning' fontSize='small' />,
        <Done color='success' fontSize='small' />,
        <Cancel color='error' fontSize='small' />,
        <CheckCircle color='info' fontSize='small' />,
        <CreditScore color='secondary' fontSize='small' />,
        <DoubleArrow color='error' fontSize='small' />,
      ]
      const data = await calendarApi.getListStatus()
      setListStatus(data.map((item, index) => ({ ...item, icon: listIcon[index] })))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetStatus()
  }, [])

  useEffect(() => {
    getOrder(page, statusType)
  }, [page, statusType])

  const filterByStatus = (type) => {
    navigate(`/service-register-history?page=1&status=${type}`)
  }

  return (
    <Stack gap={3} sx={{ py: 3 }}>
      <Stack direction='row' justifyContent='flex-end'>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Box>
            <Tooltip title='Trạng thái' placement='top'>
              <IconButton
                /* eslint-disable-next-line no-alert */
                onClick={handleOpenPopper}
                size='large'
              >
                <Workspaces />
              </IconButton>
            </Tooltip>
            <Popper open={openPopper} anchorEl={anchorEl} placement='top' sx={{ zIndex: 1500 }}>
              <Paper>
                <Stack>
                  {listStatus.map((item) => (
                    <MenuItem onClick={() => filterByStatus(item.type)}>
                      <Stack direction='row' gap={1} alignItems='center'>
                        {item.icon}
                        <Typography variant='body2'>{item.name}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={() => {
                      if (!statusType) return
                      navigate('/service-register-history?page=1')
                    }}
                  >
                    <Stack Stack direction='row' gap={1} alignItems='center'>
                      <Delete color='error' />
                      <Typography variant='body2'>Hủy lọc</Typography>
                    </Stack>
                  </MenuItem>
                </Stack>
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>
      </Stack>
      {loading ? (
        <Stack justifyContent='center' alignItems='center' sx={{ height: '80vh' }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={{ xs: 2, lg: 3 }}>
          {order.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/service-register-history/${item._id}`)}
            >
              <UserOrder detailOrder={item} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        page={+page}
        onChange={handleChangePage}
        sx={{ alignSelf: 'flex-end' }}
        count={totalOrder}
        color='primary'
        size='large'
      />
    </Stack>
  )
}

const PrimaryText = styled('span')(
  ({ theme }) => `
    font-weight: 700;
    color: ${theme.palette.primary.main}; 
`,
)

export default ListService
