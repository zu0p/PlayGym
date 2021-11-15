import axios from "axios";
import {setInterceptors, setInterceptors1} from "./interceptor";

const DOMAIN = 'https://k5d205.p.ssafy.io/api'
// axios.defaults.withCredentials = true; // for cookie data

export const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
};

const createInstance=()=>{
  const instance = axios.create()
  return setInterceptors(instance)
}
const instanceWithAuth = createInstance()

const createInstance1 = () => {
  const instance = axios.create()
  return setInterceptors1(instance)
}
const instanceWithAuth1 = createInstance1()


export const requestWithAuth = (method, url, data) => {
  return instanceWithAuth({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => {
      if(err.response.status===403){
        alert("로그인정보가 유효하지 않습니다. 다시 로그인 해주세요.")
        window.location = '/'
      }
    });
};

export const requestAuth = (method, url, data) => {
  return instanceWithAuth1({
    method,
    url: DOMAIN + url,
    data,
  })
  // .catch((err) => {
  //   if(err.response.status===403){
  //     console.log(err)
  //     alert("로그인정보가 유효하지 않습니다. 다시 로그인 해주세요.")
  //     window.location = '/'
  //   }
  // });
};