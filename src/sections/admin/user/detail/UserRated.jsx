import { Avatar, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userApis from '../../../../api/user'
import GlassBox from '../../../../components/GlassBox'

const UserRated = () => {
  const [listRated, setListRated] = useState()

  const userId = useParams().id

  const handleGetUserRated = async () => {
    try {
      const data = await userApis.getUserRated(userId)
      setListRated(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetUserRated()
  }, [])

  return (
    <GlassBox>
      <Stack gap={2}>
        <Typography variant='h2'>Đánh giá về các dịch vụ</Typography>
        <Stack gap={2}>
          {listRated &&
            listRated.map((item) => (
              <Stack direction='row' gap={2}>
                <Avatar src={item.serviceId.image} sx={{ width: '45px', height: '45px' }} />
                <Stack>
                  <Typography variant='h3'>{item.serviceId.name}</Typography>
                  <Rating value={item.rate} readOnly />
                  <Typography variant='body1'>{item.content}</Typography>
                </Stack>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </GlassBox>
  )
}

export default UserRated
