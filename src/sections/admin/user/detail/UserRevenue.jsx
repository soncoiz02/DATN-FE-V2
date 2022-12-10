import { Paid } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import userApis from '../../../../api/user'
import GlassBox from '../../../../components/GlassBox'
import formatPrice from '../../../../utils/formatPrice'

const UserRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0)

  const userId = useParams().id

  const handleGetUserRevenue = async () => {
    try {
      const data = await userApis.getUserRevenue(userId)
      setTotalRevenue(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetUserRevenue()
  }, [])

  return (
    <GlassBox>
      <Stack direction='row' justifyContent='space-between' gap={1}>
        <Stack gap={2}>
          <Typography variant='h2'>Tổng tiền đã chi</Typography>
          <Typography variant='h2' color='primary'>
            {formatPrice(totalRevenue)}
          </Typography>
        </Stack>
        <Paid sx={{ fontSize: '50px' }} color='secondary' />
      </Stack>
    </GlassBox>
  )
}

export default UserRevenue
