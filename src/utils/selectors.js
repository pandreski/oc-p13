export const isErrorSelect = (state) => state.user.errorMessage.length;

export const errorMessageSelect = (state) => state.user.errorMessage;

export const isLoadingSelect = (state) => state.user.isLoading;

export const userLoggedInSelect = (state) => state.user.isAuthenticated;

export const userFirstNameSelect = (state) => state.user.user.firstName;

export const userLastNameSelect = (state) => state.user.user.lastName;

export const tokenSelect = (state) => state.user.token;
