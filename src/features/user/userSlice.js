import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
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
      state.token = action.payload;
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      state.user = {
        firstName: '',
        lastName: '',
        email: '',
      };
    },
    updateUserData: (state, action) => {
      state.isAuthenticated = true,
      state.user.firstName = action.payload.userFirstName;
      state.user.lastName = action.payload.userLastName;
      state.user.email = action.payload.userEmail;
    },
  },
});

export const { loginPending, loginSuccess, loginFailed, logout, updateUserData } = userSlice.actions;

export default userSlice.reducer;
