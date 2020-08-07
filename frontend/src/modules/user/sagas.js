import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { notification } from 'antd'

import {
  POST_USER,
  LIST_USER,
  postUserSuccess,
  postUserFail,
  listUserSuccess,
  listUserFail,
} from './actions'
import { getHeaders, getErrorMessage } from 'utils/auth-helpers'

export function* postUserRequestHandler({ payload }) {
  const params = {
    url: `/api/users`,
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(postUserSuccess(res.data))
    notification.open({
      message: 'Success',
      description: 'The information posted successfully!',
    })
  } catch (err) {
    const res = postUserFail(getErrorMessage(err.response))
    yield put(res)
    notification.open({
      message: 'Error Found',
      description: res.payload,
    })
  }
}

export function* listUserRequestHandler({ payload }) {
  const params = {
    url: '/api/users',
    method: 'get',
    headers: getHeaders(),
    params: payload,
  }
  try {
    const res = yield call(axios.request, params)
    yield put(listUserSuccess(res.data))
  } catch (err) {
    const res = listUserFail(getErrorMessage(err.response))
    yield put(res)
    notification.open({
      message: 'Error Found',
      description: res.payload,
    })
  }
}

export default function* userSaga() {
  yield takeLatest(POST_USER, postUserRequestHandler)
  yield takeLatest(LIST_USER, listUserRequestHandler)
}
