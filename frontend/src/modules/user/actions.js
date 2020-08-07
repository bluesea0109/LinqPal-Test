import { createAction } from 'redux-actions'

import { successAction, failAction } from 'utils/state-helpers'

/**
 * Constants
 */

export const POST_USER = 'POST_USER'
export const LIST_USER = 'LIST_USER'

/**
 * Actions
 */

export const postUser = createAction(POST_USER)
export const postUserSuccess = createAction(successAction(POST_USER))
export const postUserFail = createAction(failAction(POST_USER))

export const listUser = createAction(LIST_USER)
export const listUserSuccess = createAction(successAction(LIST_USER))
export const listUserFail = createAction(failAction(LIST_USER))
