import { Box, Grid, Rating, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import serviceApi from '../../../api/service'
import MainButton from '../../../components/MainButton'
import formatPrice from '../../../utils/formatPrice'

const ListService = () => {
  const [listService, setListService] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleGetListService = async () => {
    try {
      if (searchParams.get('cate')) {
        const data = await serviceApi.getByCate(searchParams.get('cate'))
        return setListService(data)
      }
      const data = await serviceApi.getAll()
      setListService(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListService()
  }, [searchParams])

  return (
    <Grid container spacing={{ xs: 3, md: 5 }}>
      {listService &&
        listService.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
            <ServiceWrapper>
              <ServiceImage>
                <img src={item.image} alt='' />
              </ServiceImage>
              <Stack sx={{ p: '10px 15px' }}>
                <Typography
                  variant='h3'
                  component={Link}
                  to={`/service/${item._id}`}
                  sx={{ textDecoration: 'none' }}
                  color='primary'
                >
                  {item.name}
                </Typography>
                <Typography variant='body1'>Thời gian: {item.duration} phút</Typography>
                <Stack direction='row' alignItems='center' gap={1} sx={{ alignSelf: 'flex-end' }}>
                  <Typography variant='body1'>
                    {+item.rated.avg ? (+item.rated.avg).toFixed(1) : 0}
                  </Typography>
                  <Rating value={+item.rated.avg} precision={0.5} readOnly />
                </Stack>
                <MainButton colorType='primary' sx={{ alignSelf: 'flex-end', mt: 2 }}>
                  <Typography variant='body2'>{formatPrice(item.price)}</Typography>
                </MainButton>
              </Stack>
            </ServiceWrapper>
          </Grid>
        ))}
    </Grid>
  )
}

const ServiceImage = styled(Box)`
  width: 100%;
  height: 200px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ServiceWrapper = styled(Stack)`
  border-radius: 15px;
  background: white;
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
`

export default ListService
