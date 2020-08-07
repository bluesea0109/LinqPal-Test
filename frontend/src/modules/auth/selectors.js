export const selectAuthState = (state) => state.auth
export const selectAuthenticated = (state) => !!state.auth.loggedInUser
export const selectLoggedInUser = (state) => state.auth.loggedInUser
