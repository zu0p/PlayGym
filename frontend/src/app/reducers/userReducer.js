import { LOGIN_USER } from '../actions/types'

const userState = {
  mainUser: {
    id: '',
    name: '',
    email: '',
    phone: null
  }
}

export default function(state=userState, action){
  switch(action.type){
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload}
    default:
      return state
  }
}