import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderDetail: {},
  status: [],
  services: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setServices: (state, action) => {
      state.services = action.payload
    },
  },
})

export const { setStatus, setServices } = orderSlice.actions

export default orderSlice.reducer
