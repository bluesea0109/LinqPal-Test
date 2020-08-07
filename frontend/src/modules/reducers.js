import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import authReducer from './auth/reducers'
import userReducer from './user/reducers'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
})

export default rootReducer
