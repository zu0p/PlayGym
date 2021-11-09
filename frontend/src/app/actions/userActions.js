import { LOGIN_USER, UNSIGNUP_USER, UPDATE_USER, CHECK_PASSWORD, GET_USER, GET_CHILDRED_USER, ADD_CHILD_USER } from './types'
import { request, requestWithAuth } from '../../utils/axios'
import { createAction } from '@reduxjs/toolkit'

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

export function requestCheckPassword(userInfo){
  const returnData = requestWithAuth('post', `/user/checkPw`, userInfo)
  return{
    type: CHECK_PASSWORD,
    payload: returnData
  }
}

export function requestGetUser(userId){
  const returnData = requestWithAuth('get', `/user/search?id=${userId}`)
  return {
    type: GET_USER,
    payload: returnData
  }
}

export function requestGetChildren(userId){
  const returnData = requestWithAuth('get', `/user/sub/${userId}`)
  return {
    type: GET_CHILDRED_USER,
    payload: returnData
  }
}

export function requestAddChild(childInfo){
  const returnData = requestWithAuth('post', `/user/sub/add`, childInfo)
  return {
    type: ADD_CHILD_USER,
    payload: returnData
  }
}


export const requestSignupUser = createAction('SIGNUP_USER', function prepare(userInfo) {
  const returnData = request('post', `/join`, userInfo)

  return { payload: returnData }
}) 

export const requestIdConfirmUser = createAction('IDCONFIRM_USER', function prepare(userInfo) {
  const returnData = request('get', `/check?id=${userInfo.id}`)

  return { payload: returnData }
})

export const requestRandomGameByAge = createAction('RANDOM_GAME', function prepare(gameInfo) {
  const { level } = gameInfo
  const returnData = request('get', `/game/follow?level=${level}`)

  return { payload: returnData }
})