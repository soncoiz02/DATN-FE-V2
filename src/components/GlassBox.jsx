import { Box, styled } from '@mui/material'
import React from 'react'

const GlassBox = ({ children, opacity, ...other }) => {
  return (
    <CustomBox {...other} opacity={opacity}>
      {children}
    </CustomBox>
  )
}

const CustomBox = styled(Box)`
  border-radius: 20px;
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, ${(props) => props.opacity});
  padding: 30px;
`

export default GlassBox
