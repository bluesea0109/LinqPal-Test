import { handleActions } from 'redux-actions'

import { successAction, failAction } from 'utils/state-helpers'

import { POST_USER, LIST_USER } from './actions'

const initialState = {
  users: [],
  user: null,
  page: 1,
  per_page: 10,
  totalSize: 0,
  status: null,
  error: null,
}

export default handleActions(
  {
    [POST_USER]: (state, { type }) => ({
      ...state,
      status: type,
      error: null,
    }),

    [successAction(POST_USER)]: (state, { payload, type }) => ({
      ...state,
      users: [...state.users, payload],
      status: type,
      error: null,
    }),

    [failAction(POST_USER)]: (state, { payload, type }) => ({
      ...state,
      status: type,
      error: payload,
    }),

    [LIST_USER]: (state, { payload, type }) => ({
      ...state,
      users: null,
      user: null,
      page: payload.page,
      per_page: payload.per_page,
      status: type,
      error: null,
    }),
    [successAction(LIST_USER)]: (state, { payload, type }) => ({
      ...state,
      users: payload.results,
      user: null,
      page: payload.currentPage,
      totalSize: payload.totalSize,
      status: type,
      error: null,
    }),
    [failAction(LIST_USER)]: (state, { payload, type }) => ({
      ...state,
      users: null,
      user: null,
      status: type,
      error: payload,
    }),
  },
  initialState,
)
