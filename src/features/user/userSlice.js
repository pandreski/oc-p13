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
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    updateEmail: (state, action) => {
      state.user.email = action.payload;
    },
    updateUserData: (state, action) => {
      state.user.firstName = action.payload.userFirstName;
      state.user.lastName = action.payload.userLastName;
    },
  },
});

export const { loginPending, loginSuccess, loginFailed, logout, updateUserData, setAuth, updateEmail } = userSlice.actions;

export default userSlice.reducer;
