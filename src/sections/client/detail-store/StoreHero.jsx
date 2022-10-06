import { Box, Rating, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import GlassBox from '../../../components/GlassBox'

const StoreHero = ({ props }) => {
  console.log(props)
  const theme = useTheme()
  const imgBackground = props?.coverImg
  const imgAvatar = props?.avt
  const storeName = props?.name
  const storeAddress = props?.address
  const storeHotline = props?.hotline
  const valueRating = 5
  const xs = useMediaQuery(theme.breakpoints.down('sm'))
  const xs450px = useMediaQuery(theme.breakpoints.between(0, 450))

  return (
    <Box>
      {/* BG STORE */}
      <Box>
        <StyleBackground src={imgBackground} />
      </Box>
      {/* INFO STORE */}
      <Box>
        <Box sx={{}}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: -4, sm: 2 }}>
            <GlassBox
              component='div'
              sx={{
                maxHeight: { xs: '130px', sm: '210px' },
                maxWidth: { xs: '130px', sm: '210px' },
                border: '10px solid #fff',
                borderRadius: '50%',
                padding: 0,
                position: 'relative',
                left: { xs: '50%', sm: 0 },
                top: { xs: -51, sm: -61 },
                backdropFilter: 'blur(0px)',
                transform: { xs: 'translateX(-50%)', sm: 'unset' },
              }}
            >
              <StyleAvatar src={imgAvatar} />
            </GlassBox>
            <Box
              sx={{
                padding: { xs: '0 20px', sm: '0', flex: 1 },
              }}
            >
              {/* Name & Rate */}
              <Stack
                direction={{ xs: 'row', sm: 'row' }}
                justifyContent={'space-between'}
                alignItems='center'
              >
                {/* Name  */}
                <Box>
                  <StyleTypoName sx={{}} color={theme.palette.text.secondary}>
                    {storeName}
                  </StyleTypoName>
                </Box>
                {/* Rate  */}
                <Box>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography variant='h2'>{parseFloat(valueRating.toFixed(2))}</Typography>
                    <Rating
                      readOnly
                      value={valueRating}
                      size='large'
                      max={xs ? 1 : 5}
                      color={theme.palette.text.secondary}
                      sx={{ margin: { xs: '0 ', sm: '0 5px' } }}
                    ></Rating>
                  </Stack>
                </Box>
              </Stack>
              {/* Address & Hotline */}
              <Box sx={{}}>
                <StyleInfoDetail color={theme.palette.text.primary}>
                  Địa chỉ: {storeAddress}
                </StyleInfoDetail>
                <StyleInfoDetail color={theme.palette.text.primary}>
                  Hotline: {storeHotline}
                </StyleInfoDetail>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

const StyleInfoDetail = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const StyleBackground = styled('img')`
  width: 100%;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  object-fit: cover;
  border-radius: 0 0 50px 50px;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const StyleAvatar = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  backdrop-filter: blur(0);
`

const StyleTypoName = styled(Typography)`
  font-weight: 700;
  font-size: 30px;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`

export default StoreHero
