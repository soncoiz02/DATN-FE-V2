import { Box, Rating, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import GlassBox from '../../../components/GlassBox'

const StoreHero = ({ props }) => {
  const theme = useTheme()
  const imgBackground = props?.coverImg
  const imgAvatar = props?.avt
  const storeName = props?.name
  const storeAddress = props?.address
  const storeHotline = props?.hotline
  const valueRating = 5
  return (
    <Box>
      {/* BG STORE */}
      <Box>
        <StyleBackground src={imgBackground} />
      </Box>
      {/* INFO STORE */}
      <Box sx={{ padding: '0 20px' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={3}>
          <Box>
            <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={6}>
              <GlassBox
                sx={{
                  maxHeight: '210px',
                  maxWidth: '210px',
                  position: 'relative',
                  top: '-105px',
                  border: '10px solid #fff',
                  borderRadius: '50%',
                  padding: 0,
                }}
              >
                <StyleAvatar src={imgAvatar} />
              </GlassBox>
              <Box>
                <Typography variant='h2' color={theme.palette.text.secondary}>
                  {storeName}
                </Typography>
                <Typography variant='subtitle1' color={theme.palette.text.primary}>
                  Địa chỉ: {storeAddress}
                </Typography>
                <Typography variant='subtitle1' color={theme.palette.text.primary}>
                  Hotline: {storeHotline}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h2'>{valueRating}.0</Typography>
              <Rating
                readOnly
                value={valueRating || 5}
                size='large'
                name='size-large'
                color={theme.palette.text.secondary}
                sx={{ margin: '0 5px' }}
              ></Rating>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

const StyleBackground = styled('img')`
  width: 100%;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  object-fit: cover;
`

const StyleAvatar = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  backdrop-filter: blur(10px);
`

export default StoreHero
