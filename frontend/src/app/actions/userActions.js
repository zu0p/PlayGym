import { LOGIN_USER } from './types'
import { request } from '../../utils/axios'

const USER_URL = 'api/user'

export function requestLoginUser(userInfo){
  const returnData = request('post', USER_URL+'login', userInfo).then(res=>{console.log(res)})
  return {
    type: LOGIN_USER,
    payload: returnData
  }
}