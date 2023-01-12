import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    token: '',
    isLoading: false,
    isAuthenticated: false,
    errorMessage: '',
  },
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.errorMessage = '';
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userFirstName = action.payload.userFirstName;
      state.userLastName = action.payload.userLastName;
      state.userEmail = action.payload.userEmail;
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    }
  },
});

export const { loginPending, loginSuccess, loginFailed } = userSlice.actions;

export default userSlice.reducer;
