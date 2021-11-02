import { createReducer } from '@reduxjs/toolkit'
import { LOGIN_USER, UNSIGNUP_USER, UPDATE_USER, CHECK_PASSWORD, GET_USER } from '../actions/types'

const userState = {
  mainUser: {
    id: null,
    userId: '',
    name: '',
    email: '',
    phone: null,
    password: ''
  }
}

const user = createReducer(userState, {
  LOGIN_USER: (state, action) => {
    if(action.payload == 401 || action.payload== 500){
      state = action.payload
    }    
    else{
      // console.log(action.payload.data.result)
      state.mainUser = action.payload.data.result
    }
  },
  UNSIGNUP_USER: (state, action) => {
    console.log(action)
  },
  UPDATE_USER: (state, action)=>{
    console.log(action)
  },
  CHECK_PASSWORD: (state, action)=>{
    console.log(action)
  },
  GET_USER: (state, action) => {
    console.log(action)
  },
  GET_CHILDRED_USER: (state, action) => {
    console.log(action)
  }
})
export default user

// export default function(state=userState, action){
//   switch(action.type){
//     case LOGIN_USER:
//       return {...state, loginSuccess: action.payload}
//     case UNSIGNUP_USER:
//       return {...state, unsignupSuccess: action.payload}
//     default:
//       return state
//   }
// }
