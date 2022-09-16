import { Box, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'

const DescriptionTab = ({ index, value, serviceDesc, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack gap={3}>
          <Stack gap={2}>
            <TitleText variant='h3'>Giới thiệu</TitleText>
            <Typography variant='h5'>{serviceDesc}</Typography>
          </Stack>
          <Stack gap={2}>
            <TitleText variant='h3'>Quy trình</TitleText>
            <Stack gap={3}>
              <Stack direction='row' gap={3}>
                <Circle>1</Circle>
                <Typography sx={{ width: 'calc(100% - 64px)' }} variant='subtitle2'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sunt ipsum
                  maxime architecto quas alias in harum sed mollitia a et delectus beatae excepturi
                  eum adipisci, ex magnam laborum aperiam?
                </Typography>
              </Stack>
              <Stack direction='row' gap={3}>
                <Circle>2</Circle>
                <Typography sx={{ width: 'calc(100% - 64px)' }} variant='subtitle2'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sunt ipsum
                  maxime architecto quas alias in harum sed mollitia a et delectus beatae excepturi
                  eum adipisci, ex magnam laborum aperiam?
                </Typography>
              </Stack>
              <Stack direction='row' gap={3}>
                <Circle>3</Circle>
                <Typography sx={{ width: 'calc(100% - 64px)' }} variant='subtitle2'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sunt ipsum
                  maxime architecto quas alias in harum sed mollitia a et delectus beatae excepturi
                  eum adipisci, ex magnam laborum aperiam?
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </div>
  )
}

const TitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}))

const Circle = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: theme.palette.primary.main,
  color: 'white',
  textAlign: 'center',
  lineHeight: '40px',
  fontSize: '20px',
  fontWeight: 700,
}))

export default DescriptionTab
