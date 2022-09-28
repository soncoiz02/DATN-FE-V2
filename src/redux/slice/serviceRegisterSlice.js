import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

export const serviceRegisterSlice = createSlice({
  name: 'serviceRegister',
  initialState,
  reducers: {
    getFullList: (state, action) => {
      state.list = action.payload
    },
  },
})

// export const { getFullList } = counterSlice.actions
export default serviceRegisterSlice.reducer
