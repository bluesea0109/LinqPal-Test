import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { get } from 'lodash'
import { getItem } from 'utils/localStorage'
import { LOGIN } from 'modules/auth/actions'

export const getHeaders = () => {
  const auth = getItem('auth')
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'JWT ' + token
  }

  return headers
}

export const getErrorMessage = (error) => {
  const data = get(error, 'data', null)
  if (data) {
    let message
    for (let key in data) {
      message = data[key].toString()
      message = message.replace('This field', key)
      message = message.replace('this value', key)
    }
    message = message.charAt(0).toUpperCase() + message.slice(1)
    return message
  }
  return ''
}

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: (state) => state.auth.loggedInUser !== null,
  authenticatingSelector: (state) => state.auth.status === LOGIN,
  wrapperDisplayName: 'UserIsAuthenticated',
}

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  allowRedirectBack: false,
  redirectPath: '/login',
})

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: (state) => !state.auth.loggedInUser,
  wrapperDisplayName: 'UserIsNotAuthenticated',
}

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
  allowRedirectBack: false,
})
