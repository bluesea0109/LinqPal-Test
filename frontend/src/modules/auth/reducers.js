import { handleActions } from 'redux-actions'

import { successAction, failAction } from 'utils/state-helpers'
import { getItem, removeItem } from 'utils/localStorage'

import { LOGIN, LOGOUT } from './actions'

const auth = getItem('auth')

const initialState = {
  loggedInUser: auth ? JSON.parse(auth).user : null,
  status: null,
  error: null,
}

export default handleActions(
  {
    [LOGIN]: (state, { type }) => ({
      ...state,
      loggedInUser: null,
      status: type,
      error: null,
    }),

    [successAction(LOGIN)]: (state, { payload, type }) => ({
      ...state,
      loggedInUser: payload,
      status: type,
      error: null,
    }),

    [failAction(LOGIN)]: (state, { payload, type }) => ({
      ...state,
      loggedInUser: null,
      status: type,
      error: payload,
    }),

    [LOGOUT]: (state, { type }) => {
      return (
        removeItem('auth'),
        {
          ...state,
          loggedInUser: null,
          status: type,
          error: null,
        }
      )
    },
  },
  initialState,
)
