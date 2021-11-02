import { LOGIN_USER, UNSIGNUP_USER, UPDATE_USER } from './types'
import { request, requestWithAuth } from '../../utils/axios'

export function requestLoginUser(userInfo){  
  const returnData = request('post', '/login', userInfo)
    .catch(err=>{
      return err.response.status    
    })
  
  return {
    type: LOGIN_USER,
    payload: returnData
  }
}

export function requestUnsignupUser(userId){
  const returnData = requestWithAuth('delete', `/user/delete?id=${userId}`)
  return {
    type: UNSIGNUP_USER,
    payload: returnData
  }
}

export function requestUpdateUser(userInfo){
  let id = userInfo.id
  let param = {
    "email" : userInfo.email,
    "password" : userInfo.password,
    "name": userInfo.name,
    "phone" : userInfo.phone
  }
  const returnData = requestWithAuth('put', `/user/update?id=${id}`, param)
  return{
    type: UPDATE_USER,
    payload: returnData
  }
}