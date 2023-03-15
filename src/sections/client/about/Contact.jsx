import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Contact = () => {
  return (
    <Box
      sx={{
        background: '#FFF0F5',
        padding: '70px 0',
        margin: '0 0 30px',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: {
            md: 'row',
            xs: 'column',
          },
          alignItems: 'center',
          width: 'fit-content',
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          width: {
            xs: '100%',
            md: '1100px',
          },
          height: {
            xs: '100%',
            md: '350px',
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '550px',
            },
            height: '300px',
          }}
        >
          <Des1>
            Nhận thông tin mới nhất về <b>Ưu đãi</b> <br />& <b>Khuyến mãi</b>
          </Des1>
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px 0',
            }}
          >
            <TextField id='filled-basic' label='@Email' variant='outlined' />
            <ButtonCustom>ĐĂNG KÝ</ButtonCustom>
          </Stack>
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box
          sx={{
            width: '550px',
            height: '300px',
          }}
        >
          <Des2>
            Có bất kỳ câu hỏi nào? Cần một <br /> cuộc hẹn? hãy gọi cho chúng tôi
          </Des2>
          <Stack
            sx={{
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
              fontSize: '30px',
            }}
          >
            <p>
              <b>1900 636 648</b>
            </p>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
const Des1 = styled(Typography)`
  display: block;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  justify-content: center;
  font-weight: 200;
  color: #464646;
  margin: 10px 10px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const Des2 = styled(Typography)`
  display: block;
  font-size: 21px;
  line-height: 28px;
  text-align: center;
  justify-content: center;
  font-weight: 200;
  color: #464646;
  margin: 25px 10px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const Des3 = styled(Typography)`
  display: block;
  font-size: 15px;
  line-height: 28px;
  text-align: center;
  justify-content: center;
  font-weight: 200;
  color: #464646;
  margin: 10px 10px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '16px',
  padding: '10px 20px',
  border: '1px solid',
  borderColor: '#FF6073',
  color: '#FF6073',
  borderRadius: '10px',
  boxSizing: 'border-box',
  letterSpacing: '2px',
  opacity: '1',
  visibility: 'inherit',
  display: 'flex',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: '#FF6073',
    borderColor: '#FF6073',
    color: '#fff',
  },
})

export default Contact
