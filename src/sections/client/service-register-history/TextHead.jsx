import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const TextHead = () => {
  return (
    <Box paddingTop={{ sm: '24px', xs: '16px' }}>
      <Typography variant='h2' sx={{ color: grey[700] }}>
        DỊCH VỤ BẠN ĐÃ ĐẶT
      </Typography>
    </Box>
  )
}

export default TextHead
