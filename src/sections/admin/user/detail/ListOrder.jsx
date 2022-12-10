import { Grid, Pagination, Stack, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import orderApi from '../../../../api/order'
import GlassBox from '../../../../components/GlassBox'
import UserOrder from '../../../../components/UserOrder'

const ListOrder = () => {
  const [page, setPage] = useState(1)
  const [listOrder, setListOrder] = useState([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [loading, setLoading] = useState(true)
  const userId = useParams().id

  const handleGetListOrder = async (page) => {
    try {
      const data = await orderApi.getAdminUserOrder(page, userId)
      setListOrder(data.data)
      setTotalOrder(Math.ceil(data.total / 10))
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePage = (event, value) => {
    setPage(value)
    setLoading(true)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    handleGetListOrder(page)
  }, [page])

  return (
    <GlassBox>
      <Stack gap={2}>
        <Typography variant='h3' color='textSecondary'>
          Danh sách dịch vụ đã đăng ký
        </Typography>
        <Stack gap={2}>
          <Grid container spacing={2}>
            {listOrder.map((item) => (
              <Grid item xs={12} md={6} key={item._id}>
                <UserOrder detailOrder={item} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            page={page}
            onChange={handleChangePage}
            sx={{ alignSelf: 'flex-end' }}
            count={totalOrder}
            color='primary'
            size='large'
          />
        </Stack>
      </Stack>
    </GlassBox>
  )
}

export default ListOrder
