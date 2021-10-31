import { LOGIN_USER, SIGNUP_USER } from './types'
import { request, requestWithAuth } from '../../utils/axios'

const USER_URL = ''

export function requestLoginUser(userInfo){  
  const returnData = request('post', USER_URL+'/login', userInfo)
    
  return {
    type: LOGIN_USER,
    payload: returnData
  }
}

export function requestSignupUser(userInfo) {
  const returnData = request('post', `${USER_URL}/join`, userInfo)

  return {
    type: SIGNUP_USER,
    payload: returnData
  }
}