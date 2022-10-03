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
      <Box>
        <Box sx={{}}>
          <Stack direction={'row'} spacing={2}>
            <GlassBox
              component='div'
              sx={{
                maxHeight: '210px',
                maxWidth: '210px',
                border: '10px solid #fff',
                borderRadius: '50%',
                padding: 0,
                position: 'relative',
                top: -61,
              }}
            >
              <StyleAvatar src={imgAvatar} />
            </GlassBox>
            <Box sx={{ flex: 1 }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                {/* Name  */}
                <Box>
                  <StyleTypoName
                    sx={{ fontSize: '30px', fontWeight: '700' }}
                    color={theme.palette.text.secondary}
                  >
                    {storeName}
                  </StyleTypoName>
                </Box>
                <Box></Box>
                {/* Rate  */}
                <Box>
                  <Stack direction='row' alignItems='center' spacing={1}>
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
              <Typography variant='subtitle1' color={theme.palette.text.primary}>
                Địa chỉ: {storeAddress}
              </Typography>
              <Typography variant='subtitle1' color={theme.palette.text.primary}>
                Hotline: {storeHotline}
              </Typography>
            </Box>
          </Stack>
        </Box>
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
  border-radius: 0 0 50px 50px;
`

const StyleAvatar = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  backdrop-filter: blur(10px);
`

const StyleTypoName = styled(Typography)`
  font-weight: 700;
  font-size: 30px;
`

const StyleBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
`

export default StoreHero
