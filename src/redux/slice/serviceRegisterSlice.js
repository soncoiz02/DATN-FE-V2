import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  listFiltered: [],
}

export const serviceRegisterSlice = createSlice({
  name: 'serviceRegister',
  initialState,
  reducers: {
    getFullList: (state, action) => {
      state.list = action.payload
      state.listFiltered = action.payload
    },
    filterByStatusAndService: (state, action) => {
      const { status, service } = action.payload
      if (status) {
        state.listFiltered = state.list.filter((item) => item.status === status)
      } else if (service) {
        state.listFiltered = state.list.filter((item) => item.service === service)
      } else if (status && service) {
        state.listFiltered = state.list.filter(
          (item) => item.service === service && item.status === status,
        )
      } else {
        state.listFiltered = state.list
      }
    },
  },
})

export const { getFullList, filterByStatusAndService } = serviceRegisterSlice.actions
export default serviceRegisterSlice.reducer
