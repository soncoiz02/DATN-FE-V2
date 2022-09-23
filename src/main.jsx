import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from './themes/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider>
          <ScrollToTop />
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
