import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: null,
  },
  reducers: {
    emitError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { emitError } = appSlice.actions;

export default appSlice.reducer;
