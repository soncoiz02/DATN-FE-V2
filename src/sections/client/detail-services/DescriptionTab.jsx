import { Box, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'

const DescriptionTab = ({ index, value, serviceInfo, ...other }) => {
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
            <Typography variant='h5'>{serviceInfo.desc}</Typography>
          </Stack>
          <Stack gap={2}>
            <TitleText variant='h3'>Quy trình</TitleText>
            <Stack gap={3}>
              {serviceInfo.steps.map((step, index) => (
                <Stack direction='row' gap={3} key={step._id}>
                  <Circle>{index + 1}</Circle>
                  <Stack sx={{ width: 'calc(100% - 64px)' }}>
                    <Typography variant='h3'>{step.title}</Typography>
                    <Typography variant='subtitle2'>{step.desc}</Typography>
                  </Stack>
                </Stack>
              ))}
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
