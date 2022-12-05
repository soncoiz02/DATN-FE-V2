import { Box, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import parse from 'html-react-parser'

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
            <Typography variant='h5'>{parse(serviceInfo.desc)}</Typography>
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
