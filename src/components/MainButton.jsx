import { Button, styled } from '@mui/material'
import React from 'react'

const MainButton = ({ children, colorType, ...other }) => {
  if (colorType === 'primary')
    return (
      <PrimaryButton {...other} variant='contained'>
        {children}
      </PrimaryButton>
    )
  if (colorType === 'secondary')
    return (
      <SecondaryButton {...other} variant='contained'>
        {children}
      </SecondaryButton>
    )
}

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: 'white',
  fontSize: 18,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  ':hover': {
    background: theme.palette.secondary.main,
    boxShadow: `0px 3px 10px  ${theme.palette.secondary.light}`,
  },
}))

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  fontSize: 18,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  ':hover': {
    background: theme.palette.primary.main,
    boxShadow: `0px 3px 10px  ${theme.palette.primary.light}`,
  },
}))

export default MainButton
