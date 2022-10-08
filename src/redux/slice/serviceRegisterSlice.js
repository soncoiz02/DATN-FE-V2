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
        //github.com/soncoiz02/DATN-FE-V2/pull/16/conflict?name=src%252Froutes%252Findex.jsx&ancestor_oid=af1d0a14aea7c8bb40cc078d66693384a455004d&base_oid=a6edb4e982912d52d62f052dabe26450420faab0&head_oid=78530dd27e98050841c91acb81f35983c5e9357a
        https: state.listFiltered = state.list.filter((item) => item.status === status)
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
