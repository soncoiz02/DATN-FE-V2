import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import MuiThemeProvider from './themes/MuiThemeProvider'

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
