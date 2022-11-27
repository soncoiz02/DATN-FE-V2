import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './slice/orderSlice'
import serviceRegisterReducers from './slice/serviceRegisterSlice'

export const store = configureStore({
  reducer: {
    serviceRegister: serviceRegisterReducers,
    order: orderReducer,
  },
})
