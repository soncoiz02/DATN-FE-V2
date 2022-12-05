import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  Rating,
  Button,
  Avatar,
} from '@mui/material'
import styled from 'styled-components'
import serviceApi from '../../../api/service'

const ServiceRated = () => {
  const [listServiceRated, setListServiceRated] = useState([])

  const handleGetListServiceRated = async () => {
    try {
      const data = await serviceApi.getBestRated()
      setListServiceRated(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListServiceRated()
  }, [])

  return (
    <>
      <Box sx={{ padding: { md: '70px 0', xs: '50px 0' } }}>
        <Container
          maxWidth='xl'
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box>
            <Stack
              sx={{
                marginBottom: { lg: '60px', md: '50px', sx: '40px', xs: '20px' },
                textAlign: 'center',
              }}
            >
              <Typography variant='enText'>Rate</Typography>
              <Typography variant='viText'>Đánh giá</Typography>
            </Stack>
            <Box>
              <Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 2 }}>
                {listServiceRated &&
                  listServiceRated.map((item) => (
                    <Grid container item xs={12} sm={6} md={3}>
                      <ItemMostRate>
                        <Stack
                          direction={{ xs: 'column', md: 'row' }}
                          alignItems={{ xs: 'center', md: 'flex-start' }}
                        >
                          <ImgRate>
                            <Avatar src={item.userId.avt} sx={{ width: '50px', height: '50px' }} />
                          </ImgRate>
                          <Box sx={{ marginLeft: '10px' }}>
                            <NameRate textAlign='center'>{item.userId.name}</NameRate>
                            <Rating value={+item.rate} precision={0.5} readOnly />
                          </Box>
                        </Stack>
                        <DesRate>{item.content}</DesRate>
                      </ItemMostRate>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ paddingBottom: { md: '70px', xs: '50px' } }}>
        <Container
          maxWidth='xl'
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <ItemComeUs>
            <WellComeBigText>Trở thành thành viên để nhận những ưu đãi sớm nhất!</WellComeBigText>
            <WellComeSmallText>
              Đăng ký để không bỏ lỡ bất kỳ thông báo nào về ưu đãi cũng như các thông tin về dịch
              vụ của chúng tôi
            </WellComeSmallText>
            <ButtonCustom>Đăng ký ngay</ButtonCustom>
          </ItemComeUs>
        </Container>
      </Box>
    </>
  )
}

const DesRate = styled(Typography)`
  font-size: 17px;
  line-height: 20px;
  margin-top: 15px;
  @media (max-width: 425px) {
    font-size: 16px;
    line-height: 18px;
  }
`
const NameRate = styled(Typography)`
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
  @media (max-width: 1024px) {
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 19px;
  }
  @media (max-width: 425px) {
    line-height: 20px;
    margin-top: 5px;
    font-size: 17px;
  }
`
const ImgRate = styled(Box)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 80px;
    border-radius: 50%;
  }
  @media (max-width: 1024px) {
    img {
      max-width: 70px;
    }
  }
  @media (max-width: 768px) {
    img {
      max-width: 80px;
    }
  }
  @media (max-width: 425px) {
    img {
      max-width: 70px;
    }
  }
`
const ItemMostRate = styled(Paper)`
  padding: 20px;
  box-shadow: none;
  border-radius: 10px;
  background-color: #ffddcb;
  @media (max-width: 1024px) {
    padding: 20px;
  }
  @media (max-width: 768px) {
    padding: 15px;
  }
`
const ItemComeUs = styled(Paper)`
  box-shadow: none;
  max-width: 600px;
  @media (max-width: 768px) {
    max-width: 500px;
  }
`
const WellComeBigText = styled(Typography)`
  font-size: 35px;
  line-height: 40px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 25px;
    line-height: 30px;
  }
  @media (max-width: 425px) {
    line-height: 25px;
    font-size: 21px;
  }
`
const WellComeSmallText = styled(Typography)`
  font-size: 22px;
  line-height: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    line-height: 20px;
    margin: 10px;
    font-size: 17px;
  }
`
const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  fontSize: '16px',
  padding: '15px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#FF6073',
  backgroundColor: '#FF6073',
  color: '#FFF',
  borderRadius: '10px',
  boxSizing: 'border-box',
  letterSpacing: '2px',
  transition: 'all .3s',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: '#FF6073',
    borderColor: '#FF6073',
    color: '#fff',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
})

export default ServiceRated
