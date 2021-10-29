import { LOGIN_USER } from './types'
import { request } from '../../utils/axios'

const USER_URL = ''

export function requestLoginUser(userInfo){
  console.log(userInfo)
  
  const returnData = request('post', USER_URL+'/login', userInfo).then(res=>{console.log(res)})
  return {
    type: LOGIN_USER,
    payload: returnData
  }
}