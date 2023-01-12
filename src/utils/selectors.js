export const isErrorSelect = (state) => state.user.errorMessage.length;

export const errorMessageSelect = (state) => state.user.errorMessage;

export const isLoading = (state) => state.user.isLoading;

export const userLoggedIn = (state) => state.user.isAuthenticated;

export const getToken = (state) => state.user.token;
