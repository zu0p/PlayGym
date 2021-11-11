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
    .catch((err) => console.log(err));
};

export const requestAuth = (method, url, data) => {
  return instanceWithAuth1({
    method,
    url: DOMAIN + url,
    data,
  })
};