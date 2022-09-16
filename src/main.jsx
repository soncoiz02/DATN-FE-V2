import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from './themes/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider>
        <ScrollToTop />
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
