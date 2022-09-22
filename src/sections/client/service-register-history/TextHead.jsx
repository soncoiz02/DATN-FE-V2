import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const TextHead = () => {
  return (
    <Box padding={{ sm: '24px 24px 16px', xs: '16px 24px 8px' }}>
      <Typography variant='h2' sx={{ color: grey[700] }}>
        DỊCH VỤ BẠN ĐÃ ĐẶT
      </Typography>
    </Box>
  )
}

export default TextHead
