/**
 * Created by n0313111 on 02/08/2017.
 */

import restful, {fetchBackend} from 'restful.standalone.js';
const api = restful('http://localhost:3000/api', fetchBackend(window.fetch));


const CHECK_TOKEN = 'auth/CHECK_TOKEN'
const CHECK_TOKEN_FAILURE = 'auth/CHECK_TOKEN_FAILURE'
const CHECK_TOKEN_SUCCESS = 'auth/CHECK_TOKEN_SUCCESS'

const LOGIN = 'auth/LOGIN'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'

const SHOWED_WELCOME = 'auth/SHOWED_WELCOME'

export const LOGOUT = 'auth/LOGOUT'

var json = window.localStorage.travelScheduleAuth

if(json !== undefined && json !== "undefined") {
    if(json === "[object Object]") {
        var initialState = json ? JSON.parse(JSON.stringify(json)) : {token: null, user: null}
    }
    else
    {
        var initialState = json ? JSON.parse(json) : {token: null, user: null}
    }
}
else
{
    var initialState = {token: null, user: null}
}
export default function authReducer(state = {
    ...initialState,
    checkingToken: false,
    loggingIn: false,
    showWelcome: false
}, action) {
    switch (action.type) {
        case CHECK_TOKEN:
            return {...state, checkingToken: true}
        case CHECK_TOKEN_FAILURE:
        case CHECK_TOKEN_SUCCESS:
            return {...state, checkingToken: false}
        case LOGIN:
            return {...state, loggingIn: true}
        case LOGIN_FAILURE:
            return {...state, loggingIn: false}
        case LOGIN_SUCCESS:
            window.localStorage.travelScheduleAuth = action.payload.body(false)
            return {...state, loggingIn: false, showWelcome: true, ...action.payload.body(false)}
        case SHOWED_WELCOME:
            return {...state, showWelcome: false}
        case LOGOUT:
            delete window.localStorage.travelScheduleAuth
            return {...state, token: null, user: null}
    }
    return state
}

/**
 export const checkToken = () => (dispatch, getState) => {
  dispatch({type: CHECK_TOKEN})
  window.fetch('/api/check-token', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({token: getState().auth.token})
  })
  .then(handleResponse)
  .then(
    ({valid}) => {
      if (!valid) {
        dispatch(logout())
        dispatch(setErrorMessages(['Login expired - please log in again.']))
      }
      dispatch({type: CHECK_TOKEN_SUCCESS})
    },
    (error) => {
      dispatch(setErrorMessages([`Error checking authentication token: ${error.message}`]))
      dispatch({type: CHECK_TOKEN_FAILURE})
    }
  )
}**/

export const checkToken = () => (dispatch, getState) => {
    dispatch({type: CHECK_TOKEN})
    api.all('check-token')
        .post(
            ({token: getState().auth.token}), // Body – automatically JSON
            null,// Param
            null// Header
        )

        .then(
            ({valid}) => {
                if (!valid) {
                    dispatch(logout())
                    dispatch(setErrorMessages(['Login expired - please log in again.']))
                }
                dispatch({type: CHECK_TOKEN_SUCCESS})
            },
            (error) => {
                dispatch(setErrorMessages([`Error checking authentication token: ${error.message}`]))
                dispatch({type: CHECK_TOKEN_FAILURE})
            }
        )
}

/**
 export const login = (username, password) => dispatch => {
  dispatch({type: LOGIN})
  window.fetch('/api/authenticate', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username, password})
  })
    .then(handleResponse)
    .then(
      payload => dispatch({type: LOGIN_SUCCESS, payload}),
      error => {
        dispatch(setErrorMessages([`Error logging in: ${error.message}`]))
        dispatch({type: LOGIN_FAILURE})
      }
    )
}
 **/

export const login = (username, password) => dispatch => {
    dispatch({type: LOGIN})
    api.all('authenticate')
        .post(
            ({username, password}), // Body – automatically JSON
            null, // Params
            {'Content-Type': 'application/json'} // Header
        )

        .then(
            payload => dispatch({type: LOGIN_SUCCESS, payload}),
            error => {
                dispatch(setErrorMessages([`Error logging in: ${error.message}`]))
                dispatch({type: LOGIN_FAILURE})
            }
        )
}


export const logout = () => ({type: LOGOUT})

export const showedWelcome = () => ({type: SHOWED_WELCOME})
