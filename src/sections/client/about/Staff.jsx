import { Avatar, Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import userApis from '../../../api/user'
const Staff = () => {
  const [listStaff, setListStaff] = useState([])

  const handleGetListStaff = async () => {
    try {
      const data = await userApis.getAllStaff()
      setListStaff(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListStaff()
  }, [])

  return (
    <Box
      sx={{
        padding: '70px 0',
        margin: '0 0 30px',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          padding: '10px 0',
          textAlign: 'center',
          justifyContent: 'center',
        }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack>
          <TitleIntroduce>Beauty Paradise</TitleIntroduce>
          <TextStaff>ĐỘI NGŨ NHÂN VIÊN</TextStaff>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '30px',
          }}
        >
          <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {listStaff &&
              listStaff.map((item) => (
                <ItemMostStaff>
                  <ImgService variant='rounded' src={item.staff.avt} />
                  <NameStaff>{item.staff.name}</NameStaff>
                  <Position padding='10px'>Nhân viên {item.category.name}</Position>
                </ItemMostStaff>
              ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
const TitleIntroduce = styled(Typography)`
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;
  color: #ff6073;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const TextStaff = styled(Typography)`
  font-size: 40px;
  line-height: 40px;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ItemMostStaff = styled(Paper)`
  display: inline-block;
  width: 300px;
  margin-right: 20px;
  box-shadow: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (max-width: 768px) {
    height: 300px;
  }
`
const ImgService = styled(Avatar)`
  width: 100%;
  height: 250px;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const Position = styled(Typography)`
  color: #ff6073;
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const Descriptions = styled(Typography)`
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const NameStaff = styled(Typography)`
  font-size: 25px;
  line-height: 25px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  fontSize: '13px',
  padding: '10px 15px',
  margin: '25px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#FF6073',
  color: '#FF6073',
  borderRadius: '30px',
  boxSizing: 'border-box',
  letterSpacing: '1px',
  display: 'flex',
  justifyContent: 'flex-start',
  width: 'fit-content',
  transition: 'all .3s',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: '#FF6073',
    borderColor: '#FF6073',
    color: '#fff',
  },
})
export default Staff
