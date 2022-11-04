import { CircularProgress, Stack, styled } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <LoadingWrapper alignItems='center' justifyContent='center'>
      <CircularProgress color='primary' />
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled(Stack)`
  width: 100%;
  height: 100vh;
  background: white;
`

export default Loading
