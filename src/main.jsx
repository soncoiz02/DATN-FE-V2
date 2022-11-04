import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import { store } from './redux/store'
import MuiThemeProvider from './themes/MuiThemeProvider'

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
