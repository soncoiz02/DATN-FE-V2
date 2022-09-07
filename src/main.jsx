import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from './themes/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
