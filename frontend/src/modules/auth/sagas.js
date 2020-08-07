import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { notification } from 'antd'

import { LOGIN, loginRequestSuccess, loginRequestFail } from './actions'

import { getHeaders, getErrorMessage } from 'utils/auth-helpers'
import { setItem } from 'utils/localStorage'

export function* loginRequestHandler({ payload }) {
  const params = {
    url: '/api/auth/signin',
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }
  try {
    const res = yield call(axios.request, params)
    yield call(setItem, 'auth', JSON.stringify(res.data))
    yield put(loginRequestSuccess(res.data.user))
  } catch (err) {
    const res = loginRequestFail(getErrorMessage(err.response))
    yield put(res)
    notification.open({
      message: 'Error Found',
      description: res.payload,
    })
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN, loginRequestHandler)
}
