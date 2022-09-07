import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import React from 'react'
import palette from './palette'
import typography from './typography'
import breakpoint from './breakpoint'

const MuiThemeProvider = ({ children }) => {
  const muiTheme = createTheme({
    typography,
    palette,
    breakpoints: breakpoint,
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MuiThemeProvider
