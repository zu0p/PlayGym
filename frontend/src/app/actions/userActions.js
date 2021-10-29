import { LOGIN_USER } from './types'
import { request, requestWithAuth } from '../../utils/axios'

const USER_URL = ''

export function requestLoginUser(userInfo){  
  const returnData = request('post', USER_URL+'/login', userInfo)
    
  return {
    type: LOGIN_USER,
    payload: returnData
  }
}