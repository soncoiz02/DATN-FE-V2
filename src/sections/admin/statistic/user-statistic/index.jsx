import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import statisticApi from '../../../../api/statistic'
import DataGridCustom from '../../../../components/DataGridCustom'
import GlassBox from '../../../../components/GlassBox'
import formatPrice from '../../../../utils/formatPrice'

const UserStatistic = () => {
  const [userStatistic, setUserStatistic] = useState([])

  const handleGetUserStatistic = async () => {
    try {
      const data = await statisticApi.getUserStatistic()
      setUserStatistic(data.map((item) => ({ ...item, id: item._id })))
    } catch (error) {
      console.log(error)
    }
  }

  const cols = [
    {
      field: 'username',
      headerName: 'Tên người dùng',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Họ và tên',
      flex: 1,
    },
    {
      field: 'totalDone',
      headerName: 'Số lịch đặt thành công',
      flex: 1,
      renderCell: (params) => (
        <Typography variant='h4' color='secondary'>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'totalCancel',
      headerName: 'Số lịch đặt đã hủy',
      flex: 1,
      renderCell: (params) => (
        <Typography variant='h4' color='primary'>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'totalOrder',
      headerName: 'Tổng số lịch đặt',
      flex: 1,
      renderCell: (params) => (
        <Typography variant='h4' color='orange'>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'totalRevenue',
      headerName: 'Tổng tiền',
      flex: 1,
      renderCell: (params) => (
        <Typography variant='h4' color='primary'>
          {formatPrice(params.value)}
        </Typography>
      ),
    },
  ]

  useEffect(() => {
    handleGetUserStatistic()
  }, [])

  return (
    <GlassBox>
      <Stack gap={2} sx={{ height: '400px' }}>
        <Typography variant='h3'>Danh sách người dùng</Typography>
        {userStatistic && <DataGridCustom columns={cols} rows={userStatistic} />}
      </Stack>
    </GlassBox>
  )
}

export default UserStatistic
