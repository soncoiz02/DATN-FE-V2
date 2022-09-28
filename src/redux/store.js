import { configureStore } from '@reduxjs/toolkit'
import serviceRegisterReducers from './slice/serviceRegisterSlice'

export const store = configureStore({
  reducer: {
    serviceRegister: serviceRegisterReducers,
  },
})
