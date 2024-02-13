import { createSlice } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
  name: 'logout',
  initialState: { value: { logout: false } },
  reducers: {
    logoutType: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { logoutType } = logoutSlice.actions;

export default logoutSlice.reducer;
