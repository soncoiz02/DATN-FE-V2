import { Box, Rating, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import GlassBox from '../../../components/GlassBox'

const StoreHero = () => {
  const theme = useTheme()
  const imgBackground =
    'https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000'
  const imgAvatar =
    'https://sgp1.digitaloceanspaces.com/teky-prod/teky-edu-vn/media/avatars/user-41673-1651390292.jpg'
  const storeName = 'Excellence Spa Đỗ Quang'
  const storeAddress = '12 Ngõ 67 Đỗ Quang, Trung Hoà, Cầu Giấy, Hà Nội, Việt Nam.'
  const storeHotline = '+8438 9569 138'
  const valueRating = 5

  //Rating style
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
                defaultValue={valueRating}
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
`

export default StoreHero
