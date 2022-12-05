import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import styled from 'styled-components'

const Header = () => {
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
          <StyleBackground src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/parallax-3.jpg' />
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
            <TextMainBanner>GIỚI THIỆU</TextMainBanner>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

const StyleBackground = styled('img')`
  width: 100%;
  height: calc(100vh - 60px);
  max-width: 100%;
  height: 400px;
  max-height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 100px;
  }
`
const TextMainBanner = styled(Typography)`
  white-space: normal;
  font-size: 80px;
  line-height: 80px;
  font-weight: 700;
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
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const TextBanner = styled(Typography)`
  white-space: normal;
  font-size: 25px;
  line-height: 25px;
  font-weight: 900;
  color: rgb(0, 0, 0);
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
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default Header
