import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const ServiceSkeleton = () => {
  return (
    <Stack direction='row' gap={1}>
      <Skeleton width={50} height={50} variant='circular' />
      <Skeleton width={150} height={20} />
    </Stack>
  )
}

export default ServiceSkeleton
