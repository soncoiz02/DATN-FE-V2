import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import styled from 'styled-components'
import parallax from '../../../assets/img/parallax-4.jpg'

const SlideHeader = () => {
  return (
    <Box>
      <Box
        component='div'
        sx={{
          borderRadius: '0',
          height: '100%',
          width: '100%',
          position: 'relative',
          padding: '0',
          boxShadow: 'none',
        }}
      >
        <Box
          component='div'
          sx={{
            borderRadius: '0',
            padding: '0',
          }}
        >
          <StyleBackground src={parallax} />
        </Box>
        <Box
          component='div'
          sx={{
            borderRadius: '0',
            position: 'absolute',
            background:
              'linear-gradient(rgba(138, 198, 208, 0.6) 0%, rgba(236, 186, 190, 0.7) 100%)',
            height: '100%',
            width: '100%',
            top: '0',
            zIndex: '1',
            opacity: '0.7',
            padding: '0',
            visibility: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            sx={{
              position: 'absolute',
              borderRadius: '0',
              zIndex: '5',
            }}
          >
            <TextMainBanner>Beauty</TextMainBanner>
            <TextBanner>Paradaise</TextBanner>
            <ButtonCustom>Khám phá</ButtonCustom>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

const StyleBackground = styled('img')`
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 60px);
  max-height: 100%;
  object-fit: cover;
`
const TextMainBanner = styled(Typography)`
  white-space: normal;
  font-size: 180px;
  line-height: 180px;
  font-weight: 400;
  color: rgb(0, 0, 0);
  visibility: inherit;
  transition: none 0s ease 0s;
  text-align: center;
  border-width: 0px;
  margin: 0px;
  padding: 0px;
  letter-spacing: 0px;
  min-height: 0px;
  max-height: none;
  opacity: 1;
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  transform-origin: 50% 50% 0px;
  @media (max-width: 1440px) {
    line-height: 150px;
    font-size: 150px;
  }
  @media (max-width: 1024px) {
    line-height: 120px;
    font-size: 120px;
  }
  @media (max-width: 768px) {
    line-height: 100px;
    font-size: 100px;
  }
  @media (max-width: 425px) {
    line-height: 80px;
    font-size: 80px;
  }
`
const TextBanner = styled(Typography)`
  white-space: normal;
  font-size: 25px;
  line-height: 25px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  visibility: inherit;
  transition: none 0s ease 0s;
  text-align: center;
  border-width: 0px;
  padding: 0px;
  letter-spacing: 3px;
  min-height: 0px;
  max-height: none;
  opacity: 1;
  padding-top: 20px;
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  transform-origin: 50% 50% 0px;
`
const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '16px',
  padding: '15px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#fff',
  color: '#fff',
  borderRadius: '10px',
  boxSizing: 'border-box',
  letterSpacing: '2px',
  opacity: '1',
  visibility: 'inherit',
  display: 'flex',
  margin: 'auto',
  marginTop: '40px',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(255, 255, 255)',
    color: 'rgb(163, 163, 163)',
  },
})

export default SlideHeader
