import { createAction } from 'redux-actions'

import { successAction, failAction } from 'utils/state-helpers'

/**
 * Constants
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

/**
 * Actions
 */

export const loginRequest = createAction(LOGIN)
export const loginRequestSuccess = createAction(successAction(LOGIN))
export const loginRequestFail = createAction(failAction(LOGIN))

export const logoutRequest = createAction(LOGOUT)
