import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from './themes/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <MuiThemeProvider>
            <ScrollToTop />
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
