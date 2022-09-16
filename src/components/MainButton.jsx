import { Button, styled } from '@mui/material'
import { grey } from '@mui/material/colors'
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

  if (colorType === 'neutral')
    return (
      <NeutralButton {...other} variant='contained'>
        {children}
      </NeutralButton>
    )
}

const manualStyle = {
  fontSize: 18,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  transistion: '0.2s',
  borderRadius: '10px',
}

const NeutralButton = styled(Button)(({ theme }) => ({
  ...manualStyle,
  background: 'transparent',
  color: grey[800],
  ':hover': {
    background: 'rgba(0,0,0,0.1)',
    boxShadow: 'none',
  },
}))

const SecondaryButton = styled(Button)(({ theme }) => ({
  ...manualStyle,
  background: theme.palette.secondary.main,
  color: 'white',
  ':hover': {
    background: theme.palette.secondary.main,
    boxShadow: `0px 3px 10px  ${theme.palette.secondary.light}`,
  },
}))

const PrimaryButton = styled(Button)(({ theme }) => ({
  ...manualStyle,
  background: theme.palette.primary.main,
  color: 'white',
  ':hover': {
    background: theme.palette.primary.main,
    boxShadow: `0px 3px 10px  ${theme.palette.primary.light}`,
  },
}))

export default MainButton
