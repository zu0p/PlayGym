import { request, requestWithAuth } from '../../utils/axios'
import { createAction } from '@reduxjs/toolkit'

const USER_URL = ''

export const requestLoginUser = createAction('LOGIN_USER', function prepare(userInfo) {
  const returnData = request('post', USER_URL+'/login', userInfo)

  return { payload: returnData }
}) 

export const requestSignupUser = createAction('SIGNUP_USER', function prepare(userInfo) {
  const returnData = request('post', `${USER_URL}/join`, userInfo)

  return { payload: returnData }
}) 

export const requestIdConfirmUser = createAction('IDCONFIRM_USER', function prepare(userInfo) {
  console.log(userInfo)
  const returnData = request('get', `${USER_URL}/check?id=${userInfo.id}`)

  return { payload: returnData }
})